# CI/CD Pipeline Setup Guide

## Overview

This Playwright automation project is integrated with GitHub Actions for continuous integration and continuous deployment (CI/CD).

## Workflows

### 1. **Playwright Tests** (`.github/workflows/playwright.yml`)
Main workflow that runs comprehensive test suite across multiple configurations.

**Triggers:**
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop` branches
- Daily schedule at 2:00 AM UTC

**Features:**
- ✅ Tests on Node.js 18.x and 20.x
- ✅ Tests on Chromium, Firefox, and WebKit browsers
- ✅ Automatic artifact upload (test reports, videos)
- ✅ JUnit XML report generation
- ✅ Slack notifications for failures

**Matrix Configuration:**
```
Node.js versions: 18.x, 20.x
Browsers: chromium, firefox, webkit
Total parallel jobs: 6 (2 Node versions × 3 browsers)
```

### 2. **SauceDemo Tests** (`.github/workflows/saucedemo.yml`)
Dedicated workflow for SauceDemo test suite with focused triggers.

**Triggers:**
- Changes to `tests/saucedemo.spec.js`
- Changes to `pages/` or `utils/` directories
- Pull requests

**Features:**
- ✅ Lightweight and fast execution
- ✅ Chromium browser only
- ✅ Detailed HTML test reports
- ✅ PR comments with test status

## GitHub Actions Setup

### Prerequisites

1. **Repository Setup**
   ```bash
   git init
   git remote add origin <your-repo-url>
   ```

2. **Secrets Configuration** (if using Slack notifications)
   - Go to: Settings → Secrets and variables → Actions
   - Add `SLACK_WEBHOOK`: Your Slack webhook URL (optional)

### Environment Variables

No required environment variables. Tests use hardcoded credentials for SauceDemo.

### Artifacts

Tests automatically upload:
- **playwright-report/** - HTML test report
- **test-results/** - Videos and screenshots (on failure)
- **junit.xml** - JUnit format for integrations

Artifacts retention:
- Test reports: 30 days
- Videos/screenshots: 7 days

## Local Testing Before Push

### Run all tests locally
```powershell
npm install
npx playwright install
npm test
```

### Run only SauceDemo tests
```powershell
npm test tests/saucedemo.spec.js
```

### Run with specific browser
```powershell
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Debug mode
```powershell
npx playwright test --debug
```

## CI/CD Best Practices

### 1. Branch Protection Rules
Set up in repository settings:
- Require status checks before merging
- Require PR reviews
- Dismiss stale PR approvals on new commits

### 2. Commit Message Convention
Use conventional commits for better automation:
```
feat: add new login validation test
fix: correct selector for inventory page
ci: update GitHub Actions workflow
test: add edge case scenarios
```

### 3. Pull Request Workflow
1. Create feature branch: `git checkout -b feature/your-feature`
2. Make changes and add/update tests
3. Push to origin: `git push origin feature/your-feature`
4. Create Pull Request
5. Wait for CI/CD to pass
6. Request review and merge

## Troubleshooting

### Tests failing on GitHub but passing locally
1. Check Node.js version mismatch
2. Verify browser installation: `npx playwright install`
3. Check for timezone-dependent tests
4. Review CI logs for exact error

### Slow test execution
- GitHub Actions run in parallel across Node versions and browsers
- Reduce retry count if not needed: `retries: 0` in `playwright.config.js`
- Use `--grep` to run specific tests

### Artifacts not uploading
- Check if tests are actually running
- Verify `playwright-report/` and `test-results/` directories exist
- Check workflow logs in GitHub Actions

## View Test Results

1. **On GitHub:**
   - Go to Actions tab in repository
   - Click workflow run
   - Scroll to "Artifacts" section
   - Download test reports

2. **Local HTML Report:**
   ```powershell
   npm run report
   ```

## Integration with Other Tools

### Slack Notifications
Set `SLACK_WEBHOOK` secret with your Slack webhook URL:
```
https://hooks.slack.com/services/YOUR/WEBHOOK/URL
```

### Email Notifications
Add to workflow:
```yaml
- name: Send email notification
  uses: dawidd6/action-send-mail@v3
  with:
    server_address: smtp.gmail.com
    server_port: 465
    username: ${{ secrets.EMAIL_USERNAME }}
    password: ${{ secrets.EMAIL_PASSWORD }}
    subject: Test Results Report
    to: team@example.com
    from: ci@example.com
    body: Check GitHub Actions for details
```

## Advanced Configuration

### Custom Test Scheduling
Modify cron in `playwright.yml`:
```yaml
schedule:
  - cron: '0 */6 * * *'  # Every 6 hours
  - cron: '0 9 * * 1-5'  # Weekdays at 9 AM
```

### Skip CI/CD
Add to commit message to skip workflows:
```
[skip ci] documentation update
```

### Run only specific test file
Modify workflow to filter by test path:
```yaml
- name: Run specific tests
  run: npm test tests/saucedemo.spec.js
```

## Performance Tips

1. **Use `npm ci` instead of `npm install`**
   - Faster and more reliable in CI
   - Respects lock file versions

2. **Cache dependencies**
   ```yaml
   - uses: actions/setup-node@v4
     with:
       cache: 'npm'
   ```

3. **Parallel execution**
   - Tests run in parallel by default
   - Configure workers: `workers: 4` in config

4. **Fail fast**
   - Set `fail-fast: true` to stop on first failure
   - Currently `fail-fast: false` to get full results

## Next Steps

1. ✅ Initialize git repository
2. ✅ Push code to GitHub
3. ✅ Enable GitHub Actions (usually automatic)
4. ✅ Set up branch protection rules
5. ✅ Configure Slack webhooks (optional)
6. ✅ Monitor test results in Actions tab

## Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Playwright CI/CD Guide](https://playwright.dev/docs/ci)
- [GitHub Actions Marketplace](https://github.com/marketplace)
