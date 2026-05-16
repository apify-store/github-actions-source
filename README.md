## Base GitHub Action workflows
These workflows are called by the individual workflows in each repository. They are stored here to avoid code duplication and to make it easier to maintain. Ideally, the individual workflows should only call these base workflows and not contain any logic themselves.

### Caution
These workflows are used based on branch code, there is no deployment. So once you merge the code, it will be running in production.

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

### Caller trigger requirements
For the CHANGELOG.md enforcement in `pr-build-test` to auto-re-evaluate when a dev edits the PR title or adds the `internal` label (so they don't have to push an empty commit or click "Re-run failed jobs"), the caller workflow in each repo must subscribe to the relevant `pull_request` event types:

```yaml
on:
    pull_request:
        types: [opened, synchronize, reopened, labeled, unlabeled, edited]
```

A manual "Re-run failed jobs" also works because the check fetches PR title/labels fresh at runtime - but the auto-retrigger is the smoother UX.

### Possible TODOs
- Install latest apify-test-tools automatically in this workflow
- Merge repo with apify-test-tools