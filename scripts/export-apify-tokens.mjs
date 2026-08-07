#!/usr/bin/env node
// Exports the Apify Actor tokens from the secrets map as environment variables for the rest of
// the job. Invoked by .github/actions/export-apify-tokens, not directly from a workflow.
//
// The tokens are matched by prefix rather than listed because each Actor names its own via
// `tokenEnvVar` in apify-test-tools.config.json, which the workflow can't know. Everything else in
// the secrets map (npm, Slack, GitHub, anything else the repo holds) is left out.
//
// Run this after dependencies are installed. That is the point of it: `npm ci` and its postinstall
// scripts execute before this step and so never see the Actor tokens, which can modify and delete
// Actors on the platform.

import fs from 'node:fs';

const { ALL_SECRETS, GITHUB_ENV } = process.env;
const prefix = process.env.APIFY_TOKEN_PREFIX || 'APIFY_TOKEN';

if (!ALL_SECRETS) {
    console.error('ALL_SECRETS is not set. Pass `secrets: ${{ toJSON(secrets) }}` to the action.');
    process.exit(1);
}

if (!GITHUB_ENV) {
    console.error('GITHUB_ENV is not set. This script only runs inside a GitHub Actions step.');
    process.exit(1);
}

let secrets;
try {
    secrets = JSON.parse(ALL_SECRETS);
} catch (error) {
    console.error(`ALL_SECRETS is not valid JSON: ${error.message}`);
    process.exit(1);
}

const names = Object.keys(secrets)
    .filter((name) => name.startsWith(prefix))
    .sort();

// Heredoc form, so a value containing newlines can't inject extra entries into the env file.
// The delimiter is fixed but checked against every value below.
const DELIMITER = '__APIFY_TOKEN_EOF__';

const lines = names.map((name) => {
    const value = String(secrets[name]);
    if (value.includes(DELIMITER)) {
        console.error(`Secret ${name} contains the delimiter ${DELIMITER} and cannot be exported.`);
        process.exit(1);
    }
    return `${name}<<${DELIMITER}\n${value}\n${DELIMITER}\n`;
});

fs.appendFileSync(GITHUB_ENV, lines.join(''));

// Names only. The values are secrets and must never be printed, even though the runner masks
// registered secrets in logs.
console.log(`Exported ${names.length} secret(s) matching "${prefix}*": ${names.join(', ') || '(none found)'}`);
