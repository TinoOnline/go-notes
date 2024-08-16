# Git

_Tinotenda Kurimwi 05/08/2024_

- Use `git commit --amend` lets you take the most recent commit and add new staged changes to it
    -  `git commit -amend -m` to modify the message
    -  `git commit -amend <filename>`
    - `...  --no-edit` for no commit message
- Use `git bisect` to use binary search to find the commit that introduced a bug
    - git bisect start, git bisect good, git bisect bad <commit-hash>


- Use the --soft option to roll back to a previous commit, while preserving file changes in the working directory and staging area.
`git reset --soft HEAD~1` HEAD~1 alias. This alias stands in for the ID of the previous commit

- un-stage a single file/files/directories - `git restore --staged <file.html>` 