#!/usr/bin/env node
// Runs a command with only the Apify Actor tokens in its environment.
//
//     node scripts/run-with-apify-tokens.mjs npx apify-test-tools build --target-branch ...
//
// The step passes the whole secrets map as ALL_SECRETS. This picks out the APIFY_TOKEN* entries,
// hands them to the child, and drops ALL_SECRETS itself, so the secrets blob never reaches npx or
// anything under node_modules. Nothing is written to $GITHUB_ENV, so the tokens stay inside this
// one step instead of leaking into later steps of the job.
//
// The tokens are matched by prefix rather than listed because each Actor names its own via
// `tokenEnvVar` in apify-test-tools.config.json, which the workflow can't know. Set
// APIFY_TOKEN_PREFIX to match a different convention.
//
// The command runs without a shell, so branch names and other interpolated arguments are passed
// through as literal argv entries.

import { spawnSync } from 'node:child_process';

const [command, ...args] = process.argv.slice(2);

if (!command) {
    console.error('Usage: run-with-apify-tokens.mjs <command> [args...]');
    process.exit(1);
}

const { ALL_SECRETS, ...baseEnv } = process.env;

if (!ALL_SECRETS) {
    console.error('ALL_SECRETS is not set. Add `ALL_SECRETS: ${{ toJSON(secrets) }}` to the step env.');
    process.exit(1);
}

let secrets;
try {
    secrets = JSON.parse(ALL_SECRETS);
} catch (error) {
    console.error(`ALL_SECRETS is not valid JSON: ${error.message}`);
    process.exit(1);
}

const prefix = process.env.APIFY_TOKEN_PREFIX || 'APIFY_TOKEN';
const tokenNames = Object.keys(secrets)
    .filter((name) => name.startsWith(prefix))
    .sort();

// Names only. The values are secrets and must never be printed, even though the runner masks
// registered secrets in logs.
console.error(`Passing ${tokenNames.length} secret(s) matching "${prefix}*" to \`${command}\`: ${tokenNames.join(', ') || '(none found)'}`);

const env = { ...baseEnv };
for (const name of tokenNames) {
    env[name] = secrets[name];
}

const result = spawnSync(command, args, { stdio: 'inherit', env });

if (result.error) {
    console.error(`Failed to run \`${command}\`: ${result.error.message}`);
    process.exit(1);
}

// Preserve the child's exit code so the step fails exactly when the command does. A child killed
// by a signal reports a null status, which would otherwise be read as success.
process.exit(result.status ?? 1);
