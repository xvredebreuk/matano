import { Command, Flags } from "@oclif/core";
import { prompt } from "enquirer";
import execa from "execa";

import ora from "ora";
import * as fs from "fs";
import path from "path";
import * as YAML from 'yaml';
import { PROJ_ROOT_DIR, } from "..";
import { readConfig } from "../util";

export default class Deploy extends Command {
  static description = "Deploys matano.";

  static examples = [
    "matano deploy --profile prod --region eu-central-1 --account 12345678901",
  ];

  static flags = {
    profile: Flags.string({
      char: "p",
      description: "AWS Profile to use for credentials.",
    }),
    account: Flags.string({
      char: "a",
      description: "AWS Account to deploy to.",
      required: true,
    }),
    region: Flags.string({
      char: "r",
      description: "AWS Region to deploy to.",
      required: true,
    }),
    "user-directory": Flags.string({
      required: false,
      description: "Matano user directory to use."
    }),
  };

  async run(): Promise<void> {
    const { args, flags } = await this.parse(Deploy);

    const {
      profile: awsProfile,
      region: awsRegion,
      account: awsAccountId,
    } = flags;

    const defaultUserDir = path.join(process.cwd(), ".matano");
    if (!fs.existsSync(defaultUserDir) && !flags["user-directory"]) {
      this.error("No Matano user directory found.", { suggestions: ["Specify a directory using `--user-directory`.",], });
    }

    const spinner = ora("Deploying Matano...").start();

    const cdkArgs = ["deploy", "*", "--require-approval", "never"];
    if (awsProfile) {
      cdkArgs.push("--profile", awsProfile);
    }

    const matanoUserDirectory = path.resolve(flags["user-directory"]!!) ?? defaultUserDir;
    const matanoConf = readConfig(matanoUserDirectory, "matano.config.yml");
    const matanoContext = fs.readFileSync(path.resolve(matanoUserDirectory, "matano.context.json"), "utf8");

    const cdkContext: Record<string, any> = {
      matanoUserDirectory,
      matanoAwsAccountId: awsAccountId,
      matanoAwsRegion: awsRegion,
      matanoContext,
    };

    for (const [key, value] of Object.entries(cdkContext)) {
      cdkArgs.push(`--context`, `${key}=${value}`);
    }

    this.log(path.resolve(PROJ_ROOT_DIR, "infra"))
    this.log(path.resolve(PROJ_ROOT_DIR, "infra", "node_modules/.bin/cdk"))
    const subprocess = execa(path.resolve(PROJ_ROOT_DIR, "infra", "node_modules/.bin/cdk"), cdkArgs, {
      cwd: path.resolve(PROJ_ROOT_DIR, "infra"),
      env: {
        MATANO_CDK_ACCOUNT: awsAccountId,
        MATANO_CDK_REGION: awsRegion,
      },
    });

    subprocess.stdout?.pipe(process.stdout);
    subprocess.stderr?.pipe(process.stdout);

    await subprocess;
    spinner.succeed("Successfully deployed.");
  }
}