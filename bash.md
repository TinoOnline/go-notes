# Bash 

***Tinotenda Kurimwi 09-08-2024***
Bash are the scripts that execute on the OS directly on linux

if the character is `#` this is the root user - all permissions
else if `$` then it is a custom user 

- `whoami` - gets the user for the current terminal session
- `!2` - will execute the command two steps up
- `echo` - prints to the console at the moment
- `echo $0"
- `history` prints all the previous commands that were run

## apt (advanced package tool)

package manager for linux 

- `apt list` lists all the packages
- `apt update` updates the local list of packages from the package database, from which you can install locally
- `apt remove <package>` 

## General

- `pwd` print working directory
- `ls -1` will print single column
- `ls -l` long list - more details
- `ls <path>` / - absolute path, without /relative path
- `cd ~` tilde, goes to the home directory not root
- `mv <file/path> <file/path>` renames files/paths or moves files to a directory 
- `rm -r <folder>` remove recursively, including all the files
- `ctrl w` to remove currend word typed
- `cat <path to file>` concatine 
- `less` for viewing large files (needs to be installed)
- `head -n 5 <path to file>` first 5 lines 
- `tail -n 5 <path to file>` last five lines
- `cat <file1> > <file2>` redirection operator away from standard output - console
- `>` redirects to anywhere, redirects the output of a command to a file
- `>>` appends the file 
- `|` output of one command passed as input to another, for chaining commands together.
- `<` takes input from a file vs keyboard
- `sort < unsorted_list.txt > sorted_list.txt`
- `&&`  run the next command only if the previous one succeeds.
- `||`  run the next command only if the previous one fails.
- `echo "Today is $(date)"` like javascript


In Bash script 

```
if test "$#" -ne 3; then
    echo "USAGE: HOST PORT USER"
    echo "Password can either be specified as an environment variable '\$PASSWORD' or through stdin"
    exit 1
fi
```
- `$#` represents the number of arguments passed
- `test`: test command evaluates expression and returns either true (exit code 0) or false (non-zero exit code)
- `-ne`: stands for "not equal".