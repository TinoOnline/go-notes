# Go Programming Language

_Tinotenda Kurimwi 25-07-2024_

- A package is a collection of source files in the same directory that are compiled together.
- A module is a collection of related Go packages that are released together. A Go repository typically contains only one module

  - when specifying the module it doesn't matter where the package is yet, you can specify it afterwards during the import.
  - you can have one mod.go for the module and then in subdirectories you can have packages

- https://gobridge.org/
- https://go.dev/play/

<https://www.youtube.com/watch?v=YS4e4q9oBaU>
@23:18 - going to need to add path to terminal for golang libraries

## 1. General

- strong statically typed
  - key feature: garbage collection
  - built-in concurrency
  - standalone binaries ()

**#best-practice: simplicity is the key to build good software**

## 2. Synatx

- Go does not require semicolons at the ends of statements or declarations, except where two or more appear on the same line.

## 3. Folder Structure

src - code will sit
bin - directory is used for compiled binaries
pkg - modules we are using are compiled as intermediate binaries to be used by our application

### Understanding Importing Packages

- Online
  - need to mirror where application is going to be in the source control
  - i.e. src -> github.com -> TinoOnline - appname - main.go
  - the mod.go can have any name as package
  - the individual folder names should reflect the package the contained files belong to. 
- Local (https://go.dev/doc/tutorial/call-module-code)
  - ```
    <chapter1>/
      |-- lissajous/
          |-- go.mod/ package example.com/lissajous
          |-- lissajous.go/ func Hello
      |-- server/
          |-- go.mod/
          |-- go.sum/
          |-- main.go/ func main
    ```
    - first had to map the module to the local file path: `go mod edit -replace example.com/lissajous=../lissajous`
    - then ran go get example.com/lissajous, for some reason tidy didn't work
    - then you can run tidy
    - when I import, I import `example.com/lissajous`, then lissajous.Hello

## 4. Important notes

- a function whose name starts with a capital letter can be called by a function not in the same package. e.g. `func Hello (){}` i.e. exported name
  - preserving backward compatibility
- code executed as an application must be in a `main package`, `main` mustn't be in capital letters
- changing function's signature is changing the input and output parameters that would break the code. Best to create a new function
- Closing Resources is Important
  - Memory Management: unreleased resor. continue to consume system resources, leading to memory leaks and degraded performance.
  - Resource Limits: Operating systems impose limits on the number of open files, network connections, and other resources. 
  - Good Practice

## 5. Common packages used and types

### commands

- `go mod init example.com/hello`
- `go mod tidy` adds missing module requirements for imported packages and removes requirements on modules that aren't used anymore
- `go mod edit -replace example.com/greetings=../greetings`
- `go test`
- `go build` command compiles the packages, along with their dependencies, but it doesn't install the results.
- `go install` command compiles and installs the packages.
- `go list` to discover the install path
  - `go list -f '{{.Target}}'`

### packages

- fmt
  - `Sprint/f/ln` Returns a formatted string. `Print/f/ln`: Print to standard output (console). `Fprint/f/ln`: Print to a specified writer.
  - *Verbs:* `%T` prints the variable's type, `%v` prints the value of *any* type, `%q` prints string value in quotes, `%s` prints the string, `%d` formats integer using decimal notation, `%c` rune unicode, `%t` boolean, `%f ,%g, %e` floating point, `%h, o%, b%` hex, octal, binary
  - `.Printf("%8T")` the 8 will creating spacing to indent out 
  - `.Printf("%8T %[1]")` reuse whatever parameter one was similar to sql
  - #Best practice to print the error to `fmt.Fprint(os.Stderr, "no values")`
  
- log
  - `.Fatal()`, `.SetPrefix()`, `log.SetFlags()`
- errors
  - `.New()`
- io/ioutil
  - `data, err := ioutil.ReadFile(filename)` ReadFile returns a byte slice that must be converted into a string

### types and variables

- `string`, `error`, `nil`, `map`, `const`
  - basic types
    - bool (zero value = `false`)
    - string (zero value = `""`)
    - int int8 int16 int32 int64 (zero value = `0`)
    - uint uint8 uint16 uint32 uint64 uintptr (zero value = `0`)
    - byte // alias for uint8 - ASCII
    - rune // alias for int32 // represents a UNICODE code point (a character)
    - float32 float64 (zero value = `0`)
    - complex64 complex128
- *bool is not equal to 0 or 1, you can need to check this* 
- `var c, python, java bool` can be declared at the package level and function level
- `var c, python, java = true, false, "no!"` type can be inferred from the value passed or `c, python, java := true, false, "no!"`
- `var arr = map[string]string{"This":"is javscript"}`
- `:=` construct is not available outside functions
- `const` cannot use `:=`
  - must be a numbers (int,unit,float), string, or boolean (const are completely immutable)
- type conversions (type cast)
  - `flaot()`, `int()`, `unit()`

### string 
- strings are immutable (they are descriptors)
    - if no one is using that descriptor go will garbage collect it
- #best practice `strings.Join([]string," ")` is more efficient (faster) than `" " + stringSlice[i]`
- all strings are unicode and not ASCII (english only characters)
- ! as a result the length of a string is the byte count, and it will spill over from the rune count. `len(string)`
- string +=  "some string" 

#### slice
 
- `slice` is like an array := `[] <type> {.....}`
- slice is like a descriptor
- `a = b` means that b just points to a
- `a := b` means they share the same storage space 
  - ommitting the size tells go the array can dynamically change
  - `index,value := range([])` OR `_,value := range([])`
- indexing [1:5] [m:n]: [include....exclude) i.e half-opens
- you cannot use equal operator
- `copy(a,b)` this will make a new copy but take the smallest

### array (not slice)
- `[3]int` is distinct from `[3]int{}`, when you specify the size
- you can use equal operator
- values a copies over and not pointed to/from

### struct

- `struct` is a collection of values called fields.
- accessed using dot notation Vertex.Y
- ```
  type Vertex struct {
  	X int
  	Y int
  }
  ```
- ```
  subtests := []struct {
		items  []string
		result string
	}{
		{
			items:  []string{},
			result: "The Name is John!",
		},

		{
			items:  []string{"Hager", "Rachel", "Esau"},
			result: "The Name is Hager, Rachel, Esau!",
		},
	}
  ```

### pointers

- you pass a pointer to the float the and the function will put the value into the variable, e.g. &val `fmt.Fscanln(os.Stdin, &val)`

## 6. conditional statements

- you can declare a varible in the if statement which's scope is limited to the variable and its children

## 7. Maps in go

- If key doesn’t exist, we get the value type’s zero value. `j := m["root"] // j == 0`
- like string and slice, it's a descriptor `m = p` then they point to each other 
- `m["root"]++` same as `m["root"] = m["root"]+ 1`
- `len(map)`, `delete(map, key)`
- looping a map `for key, value := range m {....}`
- `value := m["route"]` - to only get the vale without the key
- `value, ok := m["route"]` - ok tells you if the key was there or not
- `m = map[string]int{}` same as `m = make(map[string]int)` but this is a nil map i.e. not initialised: `var m map[string]int`
- !!! `map` is a *reference* to the data structure created by `make`, no need to return!
- ``` 
      func main(){ mapreference := make(map[string]string) }
      func other (mapreference map[string]string){ //changes to map here will propegraip up}
  ```


## 8. Testing

- test functions take a pointer to the testing package's testing.T type as a parameter. You use this parameter's methods for reporting and logging from your test.
- `go test` or `go test -v`

```
func TestName(t \*testing.T) {
if ..... {
t.Fatalf(`....`, ....)
}
}

```

## 10. functions

- combinining input types naming: `func add(x, y int)`
- A return statement without arguments returns the named return values. This is known as a `"naked" return`.
- ```
  func split(sum int) (x, y int) {
  	x = sum * 4 / 9
  	y = sum - x
  	return
  }
  ```

## 11. For Loops

- go only has one looping constructor (for loop)
- init. and post statements are optional:
    - essentially becomes a while loop
    - ```
        for ; sum < 1000; {
            sum += sum
        }
    ```

## 12. concurrency

concurrency - execution of multiple tasks at the same time.

- threads and locks?
- issues like race conditions and deadlocks?
-  race condition bug: if two concurrent requests (http) try to update a variable at the same time, it might not be incremented consistently
  - therefore we use: mu.lock() and mu.unlock()

*Concurrency focuses on managing multiple tasks at once, not necessarily implying that they're running simultaneously. Parallelism refers to the simultaneous execution of multiple tasks or distributing different parts of a specific task amongst different processors.*