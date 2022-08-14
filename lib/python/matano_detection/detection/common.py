import os
import base64
import json, time
import importlib
import boto3
import jsonlines
from uuid import uuid4
from io import BytesIO
from datetime import datetime, timezone

s3 = boto3.resource("s3")

DETECTION_CONFIGS = {
    "my_source": [
        { 
            "name": "my_detection",
            "import_path": "my_detection.detect" 
        }
    ]
}

LOADED_MODULES = False
def handler(event, context):
    global LOADED_MODULES
    if not LOADED_MODULES:
        for detection_configs in DETECTION_CONFIGS.values():
            for detection_config in detection_configs:
                detection_config["module"] = importlib.import_module(".", detection_config["import_path"])
        LOADED_MODULES = True

    alert_responses = []
    for record in get_records(event):
        for response in run_detections(record):
            alert_responses.append(response)

    process_responses(alert_responses)

# {bucket: ddd, key: ""}
def get_records(event):
    # Actually batch size: 1 currrently
    for sqs_record in event['Records']:
        sqs_record_body = json.loads(sqs_record['body'])
        s3_bucket, s3_key = sqs_record_body["bucket"], sqs_record_body["key"]

        st = time.time()
        print(f"START: Downloading from s3://{s3_bucket}/{s3_key}")
        obj_body = s3.Object(s3_bucket, s3_key).get()["Body"].read()
        print(f"END: Downloading from s3://{s3_bucket}/{s3_key}")
        print("Time taken: ", time.time() - st)
        for line in obj_body.splitlines():
            yield json.loads(line)

def run_detections(record):
    log_source = record["log_source"]
    configs = DETECTION_CONFIGS[log_source]
    for detection_config in configs:
        detection_name, detection_module = detection_config['name'], detection_config["module"]
        # print(f"Running detection: {detection_name} for log_source: {log_source}")

        alert_title = log_source
        alert_response = detection_module.detect(record["data"])

        yield {
            "alert": alert_response,
            "title": alert_title,
            "detection": detection_name,
            "log_source": log_source,
        }

def process_responses(alert_responses):
    alerts_upload_obj = BytesIO()
    json_writer = jsonlines.Writer(alerts_upload_obj)

    for idx, response in enumerate(alert_responses):
        if not response["alert"]:
            continue
        alert_obj = {
            "id": str(uuid4()),
            "title": response["title"],
            "detection": response["detection"],
            "log_source": response["log_source"],
            "time": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%S.%fZ"),
            # "record_reference": base64.b64encode(
            #     f"{topic}#{partition}#{offset}".encode("utf-8")
            # ).decode("utf-8"),
        }
        # json_writer.write(alert_obj)