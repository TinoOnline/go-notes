# Git

_Tinotenda Kurimwi 05/08/2024_

- Use `git commit --amend` lets you take the most recent commit and add new staged changes to it
    -  `git commit -amend -m` to modify the message
    -  `git commit -amend <filename>`
    - `...  --no-edit` for no commit message
- Use `git bisect` to use binary search to find the commit that introduced a bug
    - git bisect start, git bisect good, git bisect bad <commit-hash>

 - `git fetch` command goes out to your remote project and pulls down all the data from that remote project that you don’t have yet.
    - this will load any new branches that exist in the remote repository
    - it only downloads the changes 

- Use the --soft option to roll back to a previous commit, while preserving file changes in the working directory and staging area.
`git reset --soft HEAD~1` HEAD~1 alias. This alias stands in for the ID of the previous commit

- un-stage a single file/files/directories - `git restore --staged <file.html>` 

- Tags:
    - lightweight tag
        - `git tag <tag_name>` simply a name (pointer) for a specific commit
    - annotated tag 
        - `git tag -a <tag_name> -m "Tag message"` stores additional metadata like the tagger’s name, email, date, and a message

- run `git stash` to save your changes and then use `git stash apply` or `git stash pop` to bring back changes.