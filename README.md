You should only commit to this repo locally because we rely on pre-commit hook

## Run locally to test
1. Choose if you want to emulate PR or push to master workflow.
2. Copy appropriate example from `./example-github-events` to `INPUT.json`
3. To mimic actual PR or push you care about, you should update the input
    - PR: Update `pull_request.head.ref` (source branch of the PR), `repository.full_name`, `pull_request.base.sha`, `pull_request.head.sha`
    - push: Update `ref`, `repository.full_name`
4. Start the Actor with `TESTER_APIFY_TOKEN=<TOKEN> APIFY_TOKEN_${username}=<TOKEN> apify run -p` (possibly other apify users as well)

## Testing real Actor
Do anything to https://github.com/apify-projects/store-testing-repo-for-github
