#!/usr/bin/env node
// Prints `export NAME='value'` lines for the Apify Actor tokens found in the secrets map,
// so a single step can load just those into its own shell. This replaces exporting every
// repo secret to the whole job: anything that runs outside the step that eval's this output
// (npm installs and their postinstall scripts, vitest and the test import graph) never sees
// the Actor tokens.
//
// The token names are declared per Actor as `tokenEnvVar` in apify-test-tools.config.json and
// are therefore not known when the workflow is written, which is why they are matched by prefix
// rather than listed. Override the prefix with APIFY_TOKEN_PREFIX if a repo uses another one.
//
// checkout-restore-dependencies stages this file at $RUNNER_TEMP/apify-token-env.mjs. Usage:
//
//     - name: Build
//       env:
//           ALL_SECRETS: ${{ toJSON(secrets) }}
//       run: |
//           eval "$(node "$RUNNER_TEMP/apify-token-env.mjs")"
//           unset ALL_SECRETS
//           npx apify-test-tools build ...
//
// Values go to stdout (consumed by eval, never logged); diagnostics go to stderr and name only
// the secrets, never their values.

const prefix = process.env.APIFY_TOKEN_PREFIX || 'APIFY_TOKEN';
const raw = process.env.ALL_SECRETS;

if (!raw) {
    console.error('ALL_SECRETS is not set. Add `ALL_SECRETS: ${{ toJSON(secrets) }}` to the step env.');
    process.exit(1);
}

let secrets;
try {
    secrets = JSON.parse(raw);
} catch (error) {
    console.error(`ALL_SECRETS is not valid JSON: ${error.message}`);
    process.exit(1);
}

// POSIX single-quote escaping: close the quote, add an escaped quote, reopen. Safe for any
// byte except NUL, unlike double quotes, which would still expand $ and backticks.
const shellQuote = (value) => `'${String(value).replaceAll("'", `'\\''`)}'`;

const names = Object.keys(secrets)
    .filter((name) => name.startsWith(prefix))
    .sort();

for (const name of names) {
    console.log(`export ${name}=${shellQuote(secrets[name])}`);
}

console.error(`Exporting ${names.length} secret(s) matching "${prefix}*": ${names.join(', ') || '(none found)'}`);
