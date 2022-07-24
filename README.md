# weekly-issue-action

This action can be used to create consistent GitHub issues on a schedule. Great for standardizing project management,
scrum ceremonies, and other recurring tasks.

> **warning**
> This is a work in progress.

## Usage

```yaml
- uses: garnertb/weekly-issue-action@v1
  with:
    assignees: ''
    body: ''
    close-previous: ''

    # Date string used to add the date to the title of the issue
    # eg: Weekly sync meeting for week of July, 4, 2014.
    # Default: `this friday`
    date_string: ''
    
    labels: ''
    linked-comments: ''
    linked-comments-new-issue-text: ''
    linked-comments-previous-issue-text: ''
    milestone: ''
    pinned: ''
    project: ''
    rotate-assignees: ''
    
    # Title of the issue that is being created
    # Defaults ot "
    title: ''

    # Personal access token (PAT) used to fetch team members. 
    # Note the PAT must be entitled to at least `read:org` scope.
    # Default: ${{ github.token }}
    token: ''
```

## Permissions

The GitHub [token][token docs] needs to have `repo` permissions to create new issues.

## Scenerios

### Weekly Issue

#### Create a weekly issue for a Friday meeting

```yaml
- id: create-issue
  uses: garnertb/weekly-issue-icon@v1
  with:
    # "This friday" gets passed to the gnu date command and the returned date 
    # is accessible through the step output.
    date-string: "this friday"
    title: Weekly sync for ${{ steps.date.outputs.date  }}
    body: |- 
      ## Weekly Sync

      <!-- Items actively working or blocked -->
      ### In Progress

      ### PRs Needing Review
      <!-- Outstanding PRS -->

      ### Security
      <!-- Security-related Issues/PRS -->

      ### Expenses
      <!-- Image from AWS Cost Explorer -->

      ### Deployments
    token: ${{ secrets.GITHUB_TOKEN }}
```

In this example, the action will create an issue titled "Weekly sync for for week of [the date of Friday in MM/DD/YYYY]".


[token docs]: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token