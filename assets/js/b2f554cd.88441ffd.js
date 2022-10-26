"use strict";(self.webpackChunk_matano_website=self.webpackChunk_matano_website||[]).push([[1477],{30010:e=>{e.exports=JSON.parse('{"blogPosts":[{"id":"/2022/10/26/zeek-cloudtrail-support","metadata":{"permalink":"/blog/2022/10/26/zeek-cloudtrail-support","editUrl":"https://github.com/matanolabs/matano/tree/main/website/blog/2022-10-26-zeek-cloudtrail-support/index.md","source":"@site/blog/2022-10-26-zeek-cloudtrail-support/index.md","title":"Managed CloudTrail and Zeek support","description":"We\'re adding support for the first two managed log sources to Matano: AWS CloudTrail and Zeek. Now you can analyze your AWS events and network traffic in Matano without having to define any schemas or parsers.","date":"2022-10-26T00:00:00.000Z","formattedDate":"October 26, 2022","tags":[],"readingTime":3.32,"hasTruncateMarker":true,"authors":[{"name":"Samrose Ahmed","email":"samrose@matano.dev","imageURL":"https://github.com/Samrose-Ahmed.png","key":"samrose"}],"frontMatter":{"title":"Managed CloudTrail and Zeek support","authors":"samrose","keywords":["cloudtrail","aws","zeek","big data"]},"nextItem":{"title":"Serverless asynchronous Iceberg data ingestion","permalink":"/blog/2022/09/13/ingesting-data-iceberg"}},"content":"import sgImg from \\"./sg.png\\";\\n\\n<head>\\n  <meta property=\\"og:image\\" content={\\"https://matano.dev/\\" + sgImg} />\\n  <meta name=\\"twitter:card\\" content=\\"summary_large_image\\" />\\n  <meta name=\\"twitter:creator\\" content=\\"@AhmedSamrose\\" />\\n</head>\\n\\nWe\'re adding support for the first two managed log sources to Matano: AWS CloudTrail and Zeek. Now you can analyze your AWS events and network traffic in Matano without having to define any schemas or parsers.\\n\\n![](./sg.png)\\n\\n\x3c!-- truncate --\x3e\\n\\n## What\'s new\\n\\nWe want to make analyzing all your data in Matano as easy as possible. Managed log sources in Matano come with predefined parsers, schemas, and configurations that make ingesting logs as easy as a few lines of configuration. Now, we\'re launching managed log source support for two popular log sources: AWS CloudTrail and Zeek.\\n\\nAWS CloudTrail lets you analyze all the API activity in your AWS accounts. Zeek is a popular open source framework for analyzing network traffic metadata that covers many different protocols and generates rich logs for downstream analysis.\\n\\nAs of today, Matano supports ingesting all your AWS CloudTrail data (both control plane and data plane) and the Zeek managed log source handles 43 different Zeek logs.\\n\\n## How it works\\n\\n### CloudTrail\\n\\nLet\'s walk through how to ingest CloudTrail logs into Matano. Assume we have a trail already set up delivering CloudTrail logs to an S3 bucket. We can simply point Matano at that bucket and start ingesting logs, with a simple configuration file:\\n\\n```yml\\n# log_source.yml\\nname: aws_cloudtrail\\n\\nmanaged:\\n  type: \\"AWS_CLOUDTRAIL\\"\\n\\ningest:\\n  s3_source:\\n    bucket_name: \\"my-bucket\\"\\n    key_prefix: \\"my/key/prefix\\"\\n```\\n\\nDeploying Matano with this configuration will create a Matano table named `aws_cloudtrail` that you can query and write realtime detections on.\\n\\nThe schema is fully normalized to ECS so we easily do queries like searching on related ips or checking if an event is a failure, without getting into CloudTrail specific fields.\\n\\nHere\'s an example Athena query where we check for the latest events with an access denied error:\\n\\n```sql\\nselect event.action, event.provider,\\n  aws.cloudtrail.error_code, aws.cloudtrail.error_message,\\n  source.ip\\nfrom matano.aws_cloudtrail\\nwhere ts > current_timestamp - interval \'7\' day\\nand aws.cloudtrail.error_code = \'AccessDenied\'\\n```\\n\\nWe can also write Python detections that will run on realtime on our CloudTrail events. Here is an example that detects a failed attempt to export an EC2 volume:\\n\\n```python\\ndef detect(record):\\n  return (\\n    record.get(\\"event\\", {}).get(\\"provider\\") == \\"ec2.amazonaws.com\\"\\n    and record.get(\\"event\\", {}).get(\\"action\\") == \\"CreateInstanceExportTask\\"\\n    and event.get(\\"outcome\\", {}) == \\"failure\\"\\n  )\\n```\\n\\n### Zeek\\n\\nLet\'s also see how we can ingest Zeek logs into Matano. Say we are ingesting Zeek DNS log files from an S3 bucket. We would create a log source configuration like so:\\n\\n```yml\\n# log_source.yml\\nname: zeek\\n\\nmanaged:\\n  type: \\"ZEEK\\"\\n\\ningest:\\n  s3_source:\\n    bucket_name: \\"my-bucket\\"\\n    key_prefix: \\"my/key/prefix\\"\\n```\\n\\nWe then create a table configuration table to create a Zeek DNS file:\\n\\n```yml\\n# tables/dns.yml\\nname: dns\\n```\\n\\nIf we want to ingest other Zeek logs, its as simple as adding a table file. For example, if we want to also ingest Zeek HTTP logs, we can add a file like so. We can also extend the schema and add additional fields if we need.\\n\\n```yml\\n# tables/http.yml\\nname: http\\n\\nschema:\\n  - name: zeek\\n    type:\\n      type: struct\\n      fields:\\n        - name: custom_field\\n          type: string\\n```\\n\\nOnce we deploy Matano, Apache Iceberg tables will be created for each Zeek log we specify. We can then query the tables using Athena. Here\'s a sample SQL query looking at on Zeek DNS data.\\n\\n```sql\\nSELECT\\n  answer.data as ans,\\n  avg(answer.ttl) as ttl\\nFROM\\n  matano.zeek_dns\\n  cross join unnest(dns.answers) as t(answer)\\nGROUP BY\\n  answer.data\\nLIMIT 5;\\n```\\n\\nWe can also write realtime detections on our Zeek logs. Here\'s a sample detection that detects when a Windows service has been changed or started with svcctl remotely:\\n\\n```python\\nIP_ALLOWLIST = [\\n  \\"229.292.0.0\\",\\n]\\n\\ndef detect(record):\\n  return (\\n    record.deepget(\\"zeek.dce_rpc.endpoint\\") == \\"svcctl\\"\\n    and (\\n        record.deepget(\\"zeek.dce_rpc.operation\\") in (\\n            \\"ChangeServiceConfigW\\",\\n            \\"StartServiceA\\"\\n        )\\n    )\\n    and record.deepget(\\"source.ip\\") not in IP_ALLOWLIST\\n  )\\n```\\n\\n## Getting started\\n\\nYou can start using the CloudTrail and Zeek managed log sources today. Follow the [steps](/docs/getting-started) to get started and take a look at the [CloudTrail](/docs/log-sources/managed-log-sources/cloudtrail) and [Zeek](/docs/log-sources/managed-log-sources/cloudtrail) documentation."},{"id":"/2022/09/13/ingesting-data-iceberg","metadata":{"permalink":"/blog/2022/09/13/ingesting-data-iceberg","editUrl":"https://github.com/matanolabs/matano/tree/main/website/blog/2022-09-13-ingesting-data-iceberg/index.mdx","source":"@site/blog/2022-09-13-ingesting-data-iceberg/index.mdx","title":"Serverless asynchronous Iceberg data ingestion","description":"Matano relies on Apache Iceberg as its main data lake and store. To ingest data into Matano Iceberg tables, we rely on a unique design that keeps the system both realtime and serverless.","date":"2022-09-13T00:00:00.000Z","formattedDate":"September 13, 2022","tags":[],"readingTime":5.84,"hasTruncateMarker":true,"authors":[{"name":"Samrose Ahmed","email":"samrose@matano.dev","imageURL":"https://github.com/Samrose-Ahmed.png","key":"samrose"}],"frontMatter":{"title":"Serverless asynchronous Iceberg data ingestion","authors":"samrose","keywords":["apache-iceberg","iceberg","serverless","big data"]},"prevItem":{"title":"Managed CloudTrail and Zeek support","permalink":"/blog/2022/10/26/zeek-cloudtrail-support"},"nextItem":{"title":"Announcing Matano","permalink":"/blog/2022/08/11/announcing-matano"}},"content":"import coverImg from \\"./cover.png\\";\\n\\n<head>\\n  <meta property=\\"og:image\\" content={\\"https://matano.dev/\\" + coverImg} />\\n  <meta name=\\"twitter:card\\" content=\\"summary_large_image\\" />\\n  <meta name=\\"twitter:creator\\" content=\\"@AhmedSamrose\\" />\\n</head>\\n\\nMatano relies on Apache Iceberg as its main data lake and store. To ingest data into Matano Iceberg tables, we rely on a unique design that keeps the system both realtime and serverless.\\n\\n\x3c!-- truncate --\x3e\\n\\n<figure align=\\"center\\">\\n  <img width=\\"512px\\" src={coverImg} />\\n</figure>\\n\\n## Background\\n\\nApache Iceberg is an open data format for large datasets. It lets you query data stored in object storage from a variety of compute engines. Feel free to learn about it [here](https://iceberg.apache.org).\\n\\nInternally, Iceberg works by maintaining metadata files to track your table\'s data. For example, every time data is inserted or deleted, Iceberg does record keeping and stores files to track these changes. Thus, if you have a system that generates data and want to query the data using an Apache Iceberg table, you need to ensure the files are also appended to Iceberg. In a realtime/streaming scenario, committing Iceberg metadata alongside data is not often desirable or feasible, as it will result in many concurrent commits and many small metadata files. If you are writing data directly using an engine like Apache Flink, for example, then this is handled for you, through some sort of buffering. However, using such an engine may not be possible for a variety of reasons; e.g. you\'re ingesting data produced by an external system or you\'re in an environment not conducive to running an engine like Flink (e.g., in our case, a Lambda function).\\n\\nWe can design a system where we decouple data writing from Iceberg metadata ingestion. This is a good fit for realtime streaming systems. See, for example, [LinkedIn\'s FastIngest system using Gobblin][1]. We additionally needed the system to be completely serverless, and so couldn\'t rely on a host based buffering model.\\n\\n## Design to ingest data into Iceberg\\n\\nTo summarize, we need a system that:\\n\\n1. Lets us write data independent of Iceberg. For example, we can use a managed service like Firehose to write the Parquet data files or write them ourselves from a Lambda function.\\n2. Ingest the data files into Iceberg in _realtime_. Thus, we don\'t want a batch based approach.\\n3. Be completely serverless. We don\'t want a system that e.g. relies on long running compute or an in memory/on disk buffer.\\n\\nThe design works as follows. First, we write data files directly to S3. Next, we configure an S3 event notification on this bucket. The S3 event notification is sent to an SQS queue. We add a Lambda function trigger to this SQS queue. The Lambda function, using the Java Apache Iceberg library, calls Iceberg APIs (namely `appendFiles`) and ingests the files that were written to S3 into Apache Iceberg.\\n\\n![](./arch.png)\\n\\n### Concurrent commits\\n\\nThere\'s several considerations here. First, we need to ensure we are not making too many concurrent commits to an Iceberg table. In short, each time we append files to an Iceberg table, that creates a commit, and you cannot have a high number of concurrent commits to a single table because Iceberg needs to maintain atomicity by locking the table. Therefore, in a streaming scenario, we need to introduce some sort of buffering. As a durable queue, SQS can be used as a buffer for ingesting our files into Iceberg tables. You can set a batch size and window that is both realtime and ensures you aren\'t creating commits too often. In general, there is always a tradeoff with latency of data ingestion but one can experiment to set a satisfactory buffering rate.\\n\\n### Handling duplicate messages\\n\\nIf you\'re an astute observer, you may have noticed that our inclusion of SQS in our design introduced the possibility of duplicate messages, as SQS only guarantees at least once delivery. In this scenario, this would mean that we would accidentally incorrectly ingest the same file twice into Iceberg. We can handle this with a DynamoDB table to track duplicates. Each S3 event notification includes a `sequencer` key that is unique per file. We can use a DynamoDB condition expression before committing each file to Iceberg to ensure we aren\'t processing a duplicate.\\n\\n## Implementation\\n\\nLet\'s dig a bit deeper into a how we\'d actually implement this. These examples are simplified, see a full example with imports [on GitHub][2].\\n\\n```kotlin\\nclass IcebergMetadataWriter {\\n    // In a real world usecase, you can create this dynamically from the data.\\n    val icebergTable: Table = icebergCatalog.loadTable(TableIdentifier.of(Namespace.of(NAMESPACE), TABLE_NAME))\\n    val appendFiles: AppendFiles = icebergTable.newAppend()\\n\\n    // Lambda handler\\n    fun handle(sqsEvent: SQSEvent) {\\n        for (record in sqsEvent.records) {\\n            processRecord(record, tableObjs)\\n        }\\n        appendFiles.commit()\\n    }\\n}\\n```\\n\\nWe have a Lambda handler processing an SQS event. We create a new appendFiles for Iceberg. We then process each record in the event and (remember, we receive multiple files to commit based on our batch size) and append a file for each record and then we commit the entire appendFiles.\\n\\nLet\'s look at the how we process each record:\\n\\n```kotlin\\nfun processRecord(sqsMessage: SQSMessage): Unit {\\n    val record = S3EventNotification.parseJson(sqsMessage.body).records[0]\\n    val s3Bucket = record.s3.bucket.name\\n    val s3Object = record.s3.`object`\\n    val s3ObjectKey = s3Object.key\\n    val s3ObjectSize = s3Object.sizeAsLong\\n    val s3Path = \\"s3://$s3Bucket/$s3ObjectKey\\"\\n\\n    if (checkDuplicate(s3Object.sequencer)) {\\n        println(\\"Found duplicate SQS message for key: ${s3ObjectKey}. Skipping...\\")\\n        return\\n    }\\n\\n    val metrics = readParquetMetrics(s3Path, icebergTable)\\n    val partition = PartitionSpec.builderFor(icebergTable.schema()).day(TIMESTAMP_COLUMN_NAME).build()\\n    val dataFile = DataFiles.builder(partition)\\n            .withPath(s3Path)\\n            .withFileSizeInBytes(s3ObjectSize)\\n            .withFormat(\\"PARQUET\\")\\n            .withMetrics(metrics)\\n            .build()\\n    appendFiles.appendFile(dataFile)\\n}\\n```\\n\\nThere\'s a few things going on here. For each SQS record (which represents an S3 file) we\'re appending a file to the Iceberg table. In addition to the path of the S3 File, we also provide to Iceberg the file size, which was conveniently included in the S3 event notification, as well as metrics, which are used by Iceberg for querying. To retreive the metrics from our Parquet files, we\'ll need to make a network call, but it will read just the footer, where the metrics are stored. Here\'s the implementation:\\n\\n```kotlin\\nfun readParquetMetrics(s3Path: String, table: Table): Metrics {\\n    return ParquetUtil.fileMetrics(fileIO.newInputFile(s3Path), MetricsConfig.forTable(table))\\n}\\n```\\n\\nLastly, we need to implement checking for duplicates. We use a DynamoDB table and do a conditional PutItem to ensure we aren\'t processing a duplicate. Our code looks as follows:\\n\\n```kotlin\\nfun checkDuplicate(sequencer: String): Boolean {\\n    // TTL to expire old DynamoDB items\\n    val expireTime = ((System.currentTimeMillis() / 1000L) + DDB_ITEM_EXPIRE_SECONDS).toString()\\n    val attrs = mapOf(\\n            \\"sequencer\\" to AttributeValue(sequencer),\\n            \\"ttl\\" to AttributeValue().apply { this.setN(expireTime) }\\n    )\\n    val req = PutItemRequest(DUPLICATES_DDB_TABLE_NAME, attrs)\\n            .apply { this.conditionExpression = \\"attribute_not_exists(sequencer)\\" }\\n\\n    try { ddb.putItem(req) }\\n    catch (e: ConditionalCheckFailedException) {\\n        return true\\n    }\\n    return false\\n}\\n```\\n\\n## Conclusion\\n\\nAnd that\'s how we do Iceberg ingestion in Matano. We think its a lightweight and useful pattern for ingesting data into Iceberg tables. Feel free to use and adapt it in your systems. You can also view a real world implementation inside the [Matano GitHub repo][2].\\n\\n<p style={{fontSize:\\"20px\\"}}>\\n\\n_Interested in how we use Iceberg to build the open source security lake platform for AWS? Check out [**Matano on GitHub**](https://github.com/matanolabs/matano) and give us a star._\\n\\n</p>\\n\\n[1]: https://engineering.linkedin.com/blog/2021/fastingest-low-latency-gobblin\\n[2]: https://github.com/matanolabs/matano/blob/main/lib/java/matano/iceberg_metadata/src/main/kotlin/com/matano/iceberg/IcebergMetadataWriter.kt"},{"id":"/2022/08/11/announcing-matano","metadata":{"permalink":"/blog/2022/08/11/announcing-matano","editUrl":"https://github.com/matanolabs/matano/tree/main/website/blog/2022-08-11-announcing-matano.md","source":"@site/blog/2022-08-11-announcing-matano.md","title":"Announcing Matano","description":"I\'m excited to announce Matano, a new open source project that lets you run a security lake platform directly in your AWS account. Using Matano, security teams on AWS can ingest, normalize, query and detect realtime threats on petabytes of security logs directly in S3.","date":"2022-08-11T00:00:00.000Z","formattedDate":"August 11, 2022","tags":[],"readingTime":3.805,"hasTruncateMarker":true,"authors":[{"name":"Samrose Ahmed","email":"samrose@matano.dev","imageURL":"https://github.com/Samrose-Ahmed.png","key":"samrose"}],"frontMatter":{"title":"Announcing Matano","authors":"samrose","image":"/img/cover.png"},"prevItem":{"title":"Serverless asynchronous Iceberg data ingestion","permalink":"/blog/2022/09/13/ingesting-data-iceberg"}},"content":"I\'m excited to announce [Matano](/), a new open source project that lets you run a security lake platform directly in your AWS account. Using Matano, security teams on AWS can ingest, normalize, query and detect realtime threats on petabytes of security logs directly in S3.\\n\\n![](../src/assets/cover.png)\\n\\n\x3c!-- truncate --\x3e\\n\\n**TL;DR: Matano is a high-scale, low-cost, serverless platform deployed to your AWS account that lets you ingest logs from any source, transform and normalize them according to a standard schema such as the Elastic Common Schema, store logs in S3 object storage, query them from an Apache Iceberg data lake, and create realtime detections as code using Python.**\\n\\n## Security meets Big Data\\n\\nThe average organization today deals with a large amount of security data from various cloud sources, such as network traffic logs (Zeek, Suricata, Bro), Firewall logs, CloudTrail, SaaS audit logs and more. Most of the current tools (SIEM) used to work with and analyze this data are a poor fit for data at this scale. For example, some sources of data are high volume enough that it is cost prohibitive to store them in a specialized database like a SIEM. Other tools come with high ops burden and are a pain to maintain and operate.\\n\\nOur backgrounds are in AWS and Big Data, and we think we need a different approach to security data. Big Data has brought an immense amount of powerful tooling, and open software for dealing with large datasets, but little of this is applied to security data. Additionally, the AWS cloud provides powerful cloud native offerings that offer excellent serverless capabilities.\\n\\nMatano combines these two in a project that leverages modern data lake concepts and technologies, such as Apache Iceberg, and combines them with powerful cloud native primitives like Amazon Athena to offer a high scale, low cost, serverless security lake platform.\\n\\n## The security lake platform\\n\\nMatano is a **security lake platform**, a platform with an open cloud data lake storing all an organization\'s security data at its core combined with realtime detections and streaming data analytics on top of the data lake.\\n\\nHere\'s a sample of what you can do with Matano:\\n\\n#### Collect data from all your sources\\n\\nMatano lets you collect log data from sources using [S3](#) or SQS based ingestion.\\n\\n#### Ingest, transform, normalize log data\\n\\nMatano normalizes and transforms your data using the flexible [Vector Remap Language (VRL)](https://vector.dev/docs/reference/vrl/). Matano works with the [Elastic Common Schema](https://www.elastic.co/guide/en/ecs/current/index.html) by default and you can extend the schema.\\n\\n#### Store data in S3 object storage\\n\\nLog data is always stored in S3 object storage, for cost effective, long term, durable storage.\\n\\n#### Apache Iceberg Data lake\\n\\nAll data is ingested into an open Apache Iceberg based data lake, allowing you to query and perform ACID transactions, time travel, and more on all your log data. You can interact with security data using your existing tooling or any software that supports Apache Iceberg.\\n\\n#### Detections as code\\n\\nWrite detections as code using Python to implement realtime alerting on your log data. You can use the full expressiveness and flexibility of Python for your detection engineering instead of relying on limiting rules and configurations.\\n\\nMatano is completely serverless, meaning no ops or maintenance. It\'s cloud-native and simple to deploy, and you can get started in just a few minutes.\\n\\n## Goodbye to lock-in\\n\\nTraditional security tooling often results in data and vendor lock-in, where your data is stored in database or system that don\'t work well with and can\'t easily be queried from other tools. With Matano, all your security data is stored in Apache Iceberg tables and the open Iceberg table format ensures you retain control over your data and can use it with and query it from other tools that support Iceberg like Spark or Flink.\\n\\n## Free & open source software\\n\\nMatano is completely free and open source software (with an [Apache-2.0 license][1]). We\'re built on many other great open source software projects and we believe Matano is best as free software that you can use as you see fit. We aim to foster an open community, supporting all log sources, formats, and technologies without any lock-in (one of our reasons for using an open table format like Apache Iceberg).\\n\\n## Up next\\n\\nMatano is a work in progress. You can install and try out the functionality of Matano today, but we will be working hard on improvements and stabilization in the near future.\\n\\nYou can follow our project [**on GitHub**][2] or join our [community on Discord][3].\\n\\n[1]: https://github.com/matanolabs/matano/blob/main/LICENSE\\n[2]: https://github.com/matanolabs/matano\\n[3]: https://discord.com/invite/YSYfHMbfZQ"}]}')}}]);