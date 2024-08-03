# Go Programming Language - it's about to get real

- A package is a collection of source files in the same directory that are compiled together.
- A module is a collection of related Go packages that are released together. A Go repository typically contains only one module

  - when specifying the module it doesn't matter where the package is yet, you can specify it afterwards during the import.
  - you can have one mod.go for the module and then in subdirectories you can have packages

- https://gobridge.org/
- https://go.dev/play/

https://www.youtube.com/watch?v=YS4e4q9oBaU
@23:18 - going to need to add path to terminal for golang libraries

## General

- strong statically typed
  - key feature: garbage collection
  - built-in concurrency
  - standalone binaries ()

## Folder Structure

src - code will sit
bin - directory is used for compiled binaries
pkg - modules we are using are compiled as intermediate binaies to be used by our application

- need to mirror where application is going to be in the sorce control
- i.e. src -> github.com -> TinoOnline - appname - main.go

## Important notes

- a function whose name starts with a capital letter can be called by a function not in the same package. e.g. `func Hello (){}` i.e. exported name
  - preserving backward compatibility
- code executed as an application must be in a `main package`, `main` musn't be in capital letters
- changing function's signature is changing the input and output paramters that would break the code. Best to create a new function

## Common packages used and types

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
  - `.Println()` prints to console, `.Sprintf()` returns formated string, `%T` prints the variab;e's type, `%v` prints the value (numerical), `%q` prints string value
- log
  - `.Fatal()`, `.SetPrefix()`, `log.SetFlags()`
- errors
  - `.New()`

### types and variables

- `string`, `error`, `nil`, `map`, `const`
  - basic types
    - bool (zero value = `false`)
    - string (zero value = `""`)
    - int int8 int16 int32 int64 (zero value = `0`)
    - uint uint8 uint16 uint32 uint64 uintptr (zero value = `0`)
    - byte // alias for uint8
    - rune // alias for int32 // represents a Unicode code point
    - float32 float64 (zero value = `0`)
    - complex64 complex128
- `slice` an array := `[] <type> {.....}`
  - ommitting the size tells go the array can dynamically change
  - `index,value := range([])`
- `struct` is a collection of fields.
- ```
  type Vertex struct {
  	X int
  	Y int
  }
  ```
- `var c, python, java bool` can be declared at the package level and function level
- `var c, python, java = true, false, "no!"` type can be inferred from the value passed or `c, python, java := true, false, "no!"`
- `var arr = map[string]string{"This":"is javscript"}`
- `:= `construct is not available outside functions
- `const` cannot use `:=`
- type conversions
  - `flaot()`, `int()`, `unit()`

## Maps in go

- If key doesn’t exist, we get the value type’s zero value. `j := m["root"] // j == 0`
- `len(map)`, `delete(map, key) `
- looping a map `for key, value := range m {....}`
- `_, value := m["route"]` - to only get the vale without the key
- `m = map[string]int{}` same as `m = make(map[string]int)` but this is a nil map i.e. not initialised: `var m map[string]int`

## Testing

- test functions take a pointer to the testing package's testing.T type as a parameter. You use this parameter's methods for reporting and logging from your test.
- `go test` or `go test -v`

```

func TestName(t \*testing.T) {
if ..... {
t.Fatalf(`....`, ....)
}
}

```

## functions

- combinining input types naming: `func add(x, y int)`
- A return statement without arguments returns the named return values. This is known as a `"naked" return`.
- ```
  func split(sum int) (x, y int) {
  	x = sum * 4 / 9
  	y = sum - x
  	return
  }
  ```
