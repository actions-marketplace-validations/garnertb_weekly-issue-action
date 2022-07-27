# weekly-issue-action

This action can be used to create consistent GitHub issues on a schedule. Great for standardizing project management,
scrum ceremonies, and other recurring tasks.

## Usage

```yaml
- uses: garnertb/weekly-issue-action@v1
  with: 
  
    # Assignees for the issue 
    # Required: false
    - assignees: '' 
    
    # Project column name to add issue to, e.g. To Do.
    # Required if "project" is set. 
    # Required: false
    # Default: "Weekly sync issue" 
    - body: ''
    
    # Whether to close the previous weekly issue when creating new one 
    # Required: false
    - close-previous: ''
    
    # Date string used to add the date to the title of the issue 
    # Required: false
    # Default: "this friday" 
    - date-string: ''
    
    # The format passed to the date command 
    # Required: false
    # Default: "%m/%d/%Y" 
    - date-string-format: ''
    
    # Required: false
    # Default: "Weekly issue for week of " 
    - title: ''
    
    # Comma delimited list of existing issue labels to be applied to new issue, e.g. "bug, ci". 
    # Required: false
    # Default: "weekly-sync" 
    - labels: ''
    
    # Whether to link to the previous weekly issue when creating a new one 
    # Required: 
    # Default: "true" 
    - linked-comments: ''
    
    # Text of the comment on the previous issue that links to the new issue.
    # Requires "linked-comments, labels". 
    # Required: false
    # Default: "Next in series: #{{ newIssueNumber }}" 
    - linked-comments-previous-issue-text: ''
    
    # Text of the comment on the new issue that links to the previous issue.
    # Requires "linked-comments, labels". 
    # Required: false
    # Default: "Previous in series: #{{ previousIssueNumber }}" 
    - linked-comments-new-issue-text: ''
    
    # Milestone number (not ID or name) to add issue to, e.g. 2. 
    # Required: false
    - milestone: ''
    
    # Project number (not ID or name) to add issue to, e.g. 2. 
    # Required: false
    - project: ''
    
    # Whether the issue should be pinned. 
    # Required: false
    # Default: "true" 
    - pinned: ''

    # Boolean whether to round robin the provided assignees, e.g. for first responder duties.
    # Requires "labels", "assignees".
    # default: 'false'
    # Required: false
    - rotate-assignees: ''

    # GitHub token 
    # Required: false
    # Default: "${{ github.token }}" 
    - token: ''
    
    # Project type the "project" number corresponds to, e.g. user, organization, or repository project. 
    # Organization and user projects require a GitHub App installation access token, OAuth token, or Personal Access Token.
    # Read more here: https://docs.github.com/en/github/managing-your-work-on-github/about-project-boards. 
    # Required: false
    # Default: "repository" 
    - project-type: ''
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

In this example, the action will create an issue titled "Weekly sync for for week of [the date of Friday in MM/DD/YYYY]".  See output 👇. 

Produces: 
<img width="1137" alt="Screen Shot 2022-07-27 at 13 48 39" src="https://user-images.githubusercontent.com/1141646/181359527-a600598c-603f-4c27-aa2c-2ddd2ebd2057.png">

[token docs]: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token
  