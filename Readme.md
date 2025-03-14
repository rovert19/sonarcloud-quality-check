# Sonarcloud Quality Check action

This retrieve the status and reasons of failure of code analysis of repository in SonarCloud

## Inputs

### `sonar-project-key`

**Required** The project id of repository in SonarCloud.

### `sonar-token`

**Required** The token API of your SonarCloud account.

### `branch` 

**Required** The name of branch where will execute code analysis.

## Outputs

### `project-status`

Project quality gate status.

## Example usage

```yaml
uses: actions/sonarcloud-quality-check@1.1v
with:
  sonar-project-key: 'PROJECT ID'
  sonar-token: 'SONAR API TOKEN'
  branch: 'main'
```
