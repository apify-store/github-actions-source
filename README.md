## Base GitHub Action workflows
These workflows are called by the individual workflows in each repository. They are stored here to avoid code duplication and to make it easier to maintain. Ideally, the individual workflows should only call these base workflows and not contain any logic themselves.

### Usage
- **platform-tests**: [Notion Guide](https://www.notion.so/apify/E2E-Actor-platform-tests-setup-332f39950a228038ac41e62eb9d41888) by @Patai5
- **pr-build-test**: Just trigger on *pull_request* to master and forget about it
- **claude**: [Notion Guide](https://www.notion.so/apify/Claude-action-setup-36bf39950a2280f9b88fe33bc39d6f24) by @JuanGalilea

### Secrets
Callers still pass `secrets: inherit`. The workflows no longer convert every inherited secret into
job-wide environment variables, so a secret is only visible to the step that needs it:

| Secret | Reaches |
| --- | --- |
| `NPM_TOKEN` | dependency install steps only, as both `NPM_TOKEN` and `NODE_AUTH_TOKEN`. Use a read-only token: npm granular tokens can be read-only, classic automation tokens can publish. |
| `APIFY_TOKEN_*` | the `build`, `release`, and `delete-old-builds` steps only |
| `TESTER_APIFY_TOKEN` | the vitest step only |
| `SLACK_TOKEN_TESTS_BOT` / `SLACK_TOKEN_RELEASES_BOT` | the reporting and release steps only |

The Actor tokens are the one set that cannot be listed in the workflow, because each Actor names its
own token via `tokenEnvVar` in `apify-test-tools.config.json`. Those steps take `${{ toJSON(secrets) }}`
and run `.github/actions/checkout-restore-dependencies/apify-token-env.mjs`, which emits shell
`export` lines for the `APIFY_TOKEN*` entries only. The step drops the full secrets blob before
calling `npx`, so nothing under `node_modules` ever sees it. Set `APIFY_TOKEN_PREFIX` on the step to
match a different naming convention.

The `unitTest` job runs static checks and needs `NPM_TOKEN` only. No job runs `npm ci` with Apify or
Slack credentials in scope, so a postinstall script in the dependency tree cannot read them.

### Caution
These workflows are used based on branch code, there is no deployment. So once you merge the code, it will be running in production.

Because of that, the `uses:` refs below point at `@master`. To test a change to the composite action
or to `apify-token-env.mjs`, temporarily repoint those refs at your branch in every workflow, and
change them back before merging.

### Testing
- You can make arbitrary PRs and merges to https://github.com/apify-store/testing-repo-for-github-actions to see how it triggers the workflows. This testing repo has real attached Actors and tests. 
- Make sure the shell code actually works as intended on your laptop (sometimes people don't even do that :) ). 
- After you merge, observe the workflow on real project before moving on.

### Apify test tools
These workflows depend on https://github.com/apify-projects/apify-test-tools. This includes packages that exposes both CLI used in these workflows and JavaScript library used in each repo to write tests.

### Workflows
- platform-tests - Scheduled (daily, hourly) tests on latest builds
- pr-build-test - On PR updates, builds 0.99 versions and tests on them.
- push-build-latest - This releases master branch to latest Actor version. This almost always happens after PR is merged (since we forbid direct push)
- claude - This makes claude being able to respond on github, this has several different triggers its capable to work with.

### Possible TODOs
- Install latest apify-test-tools automatically in this workflow
- Merge repo with apify-test-tools
