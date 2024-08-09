# Git

_Tinotenda Kurimwi 05/08/2024_

- Use `git commit --amend` to modify the most recent commit
- Use `git bisect` to use binary search to find the commit that introduced a bug
    - git bisect start, git bisect good, git bisect bad <commit-hash>


- Use the --soft option to roll back to a previous commit, while preserving file changes in the working directory and staging area.
`git reset --soft HEAD~1` HEAD~1 alias. This alias stands in for the ID of the previous commit