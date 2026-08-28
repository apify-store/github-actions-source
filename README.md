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
| the Actor tokens named by `tokenEnvVar` in `apify-test-tools.config.json` | the `build`, `release`, and `delete-old-builds` steps only |
| `TESTER_APIFY_TOKEN` | the vitest step only |
| `SLACK_TOKEN_TESTS_BOT` / `SLACK_TOKEN_RELEASES_BOT` | the reporting and release steps only |

The Actor tokens are the one set that cannot be listed in the workflow, because each Actor names its
own token via `tokenEnvVar` in `apify-test-tools.config.json`. Those steps pass
`${{ toJSON(secrets) }}` as `ALL_SECRETS` and run the command through `scripts/run-with-apify-tokens.mjs`,
which reads that same config file to decide which secrets to pass on:

```yaml
- name: Build
  env:
      ALL_SECRETS: ${{ toJSON(secrets) }}
  run: |
      node "${{ steps.setup.outputs.scripts-path }}/run-with-apify-tokens.mjs" \
        npx apify-test-tools build --target-branch ...
```

The wrapper passes only the tokens the config declares and drops `ALL_SECRETS`, so neither `npx` nor
anything under `node_modules` sees the blob. Nothing is written to `$GITHUB_ENV`, so the tokens stay
inside that one command rather than leaking into later steps. Reading the same file `apify-test-tools`
reads means the two can't drift, and a secret that merely looks like an Actor token is not passed
just because of its name.

A token the config declares but the repo hasn't set is a warning, not a failure: a repo can carry an
Actor whose token isn't configured and still build fine as long as that Actor never changes, and
`apify-test-tools` raises a precise error naming the Actor at the point it actually needs the token.

`scripts-path` comes from the setup action (give the step `id: setup`) and points at this repo's
`scripts/` directory inside the runner's action checkout, so workflows can run these helpers without
checking this repo out again. The caller's workspace holds the caller's repo, not this one.

Two tidier-looking alternatives don't work, so don't reach for them:

- **Exporting to `$GITHUB_ENV`** would let the steps call `npx` directly with no wrapper, but
  `$GITHUB_ENV` applies to every later step in the job. In `pr-build-test` the vitest step runs after
  the build, so it would inherit Actor tokens it has no use for.
- **Returning the tokens as a step output** would be scoped correctly, but the runner refuses to set
  an output whose value contains a registered secret. It logs `Skip output <name> since it may
  contain secret` and leaves the output empty, so anything reading it downstream gets nothing.

The `unitTest` job runs static checks and needs `NPM_TOKEN` only. No job runs `npm ci` with Apify or
Slack credentials in scope, so a postinstall script in the dependency tree cannot read them.

### Caution
These workflows are used based on branch code, there is no deployment. So once you merge the code, it will be running in production.

Because of that, the `uses:` refs below point at `@master`. To test a change to the composite action
or to `scripts/run-with-apify-tokens.mjs`, temporarily repoint those refs at your branch in every workflow, and
change them back before merging.

### Testing
- You can make arbitrary PRs and merges to https://github.com/apify-store/testing-repo-for-github-actions to see how it triggers the workflows. This testing repo has real attached Actors and tests. 
- Make sure the shell code actually works as intended on your laptop (sometimes people don't even do that :) ). 
- After you merge, observe the workflow on real project before moving on.

### Apify test tools
These workflows depend on https://github.com/apify-projects/apify-test-tools. This includes packages that exposes both CLI used in these workflows and JavaScript library used in each repo to write tests.

### Workflows
- platform-tests - Scheduled (daily, hourly) tests on latest builds
- pr-build-test - On PR updates, builds 0.99 versions and tests on them. Also enforces that every PR updates `./CHANGELOG.md` unless the PR title starts with `chore`, `refactor`, `test`, `ci`, `build`, or `docs` (case-insensitive), or the PR carries the `internal` label.
- push-build-latest - This releases master branch to latest Actor version. This almost always happens after PR is merged (since we forbid direct push)
- claude - This makes claude being able to respond on github, this has several different triggers its capable to work with.

### Possible TODOs
- Install latest apify-test-tools automatically in this workflow
- Merge repo with apify-test-tools
