# weekly-issue-action

Action that creates consistent Issues on different dates.

## Usage

```yaml
- uses: garnertb/weekly-issue-action@v1
  with:
  
    # Date string used to add the date to the title of the issue
    # eg: Weekly sync meeting for week of July, 4, 2014.
    # Default: `this friday`
    date_string: ''


    # Personal access token (PAT) used to fetch team members. 
    # Note the PAT must be entitled to at least `read:org` scope.
    # Default: ${{ github.token }}
    token: ''
```

## Permissions

The GitHub [token][token docs] needs to have `read:org` permissions to read organizational team members.

## Scenerios

### Weekly Issue

#### Create a weekly issue

```yaml
- id: create-issue
  uses: garnertb/weekly-issue-icon@v1
  with:
    token: ${{ secrets.GITHUB_TOKEN }}
```


Use this action to set assignees for a new issue with [issue-bot](https://github.com/imjohnbo/issue-bot).

```yaml
- id: get-members
  uses: garnertb/get-team-members@v1
  with:
    org: garnertb-io
    team_slug: ops
    role: maintainer
    token: ${{ secrets.GITHUB_TOKEN }}

- name: Create new issue
  uses: imjohnbo/issue-bot@v3
  with:
    assignees: ${{ steps.get-members.outputs.members }}
    title: Hello, world
    body: |-
      :wave: Hi, {{#each assignees}}@{{this}}{{#unless @last}}, {{/unless}}{{/each}}!
```

[token docs]: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token