# Go Programming Language

_Tinotenda Kurimwi 25-07-2024_

- A package is a collection of source files in the same directory that are compiled together.
- A module is a collection of related Go packages that are released together. A Go repository typically contains only one module

  - when specifying the module it doesn't matter where the package is yet, you can specify it afterwards during the import.
  - you can have one mod.go for the module and then in subdirectories you can have packages

- [Go Bridge](https://gobridge.org/)
- [Go Playground](https://go.dev/play/)

[Initial Tutorial](https://www.youtube.com/watch?v=YS4e4q9oBaU)
@23:18 - going to need to add path to terminal for golang libraries

[go - matt slides](https://github.com/matt4biz/go-class-slides/blob/trunk/xmas-2020/README.md)

## 1. General

- strong statically typed
  - key feature: garbage collection
  - built-in concurrency
  - standalone binaries ()

**#best-practice: simplicity is the key to build good software**
**#best-practice: always check the error and handle them, all security problems are bugs and all bugs are security problems**

- in go everything is passed by value you pass an int, a descriptor, you are copying something over even if sometimes it's not the value itself but the descriptor as a value

## 2. Synatx

- Go does not require semicolons at the ends of statements or declarations, except where two or more appear on the same line.

## 3. Folder Structure

~~src - code will sit~~
~~bin - directory is used for compiled binaries~~
~~pkg - modules we are using are compiled as intermediate binaries to be used by our application~~

### Understanding Importing Packages

- Online
  - need to mirror where application is going to be in the source control
  - i.e. src -> github.com -> TinoOnline - appname - main.go
  - the mod.go can have any name as package
  - the individual folder names should reflect the package the contained files belong to. 
- [Local Implementation](https://go.dev/doc/tutorial/call-module-code)
    ```
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
- changing function's signature is changing the input and output parameters that would break the code. #best-practice to create a new function
- Closing Resources is Important
  - Memory Management: unreleased resources continue to consume system resources, leading to memory leaks and degraded performance.
  - Resource Limits: Operating systems impose limits on the number of open files, network connections, and other resources. 
  - Good Practice

## 5. Common packages used and types

### commands

- `go mod init example.com/hello`
- `go mod tidy` adds missing module requirements for imported packages and removes requirements on modules that aren't used anymore
- `go mod edit -replace example.com/greetings=../greetings`
- `go test`
- `go build` command compiles the packages, along with their dependencies, but it doesn't install the results.
  - `go build -o main .` build and output main in current directory 
- `go install` command compiles and installs the packages.
- `go list` to discover the install path
  - `go list -f '{{.Target}}'`

### packages

- fmt
  - `Sprint/f/ln` Returns a formatted string. `Print/f/ln`: Print to standard output (console). `Fprint/f/ln`: Print to a specified writer.
  - *Verbs:* `%T` prints the variable's type, `%v` prints the value of *any* type, `%+v` for struct, `%q` prints string value in quotes, `%s` prints the string, `%d` formats integer using decimal notation, `%c` rune unicode, `%t` boolean, `%f ,%g, %e` floating point,`%.3f ` formats to 3 decimal places, `%h, o%, b%` hex, octal, binary, `%p` print a pointer (the address within a variable)
  - `.Printf("%8T")` the 8 will creating spacing to indent out 
  - `.Printf("%8T %[1]")` reuse whatever parameter one was similar to sql
  - #best-practice to print the error to `fmt.Fprint(os.Stderr, "no values")`
  
- log
  - `.Fatal()`, `.SetPrefix()`, `log.SetFlags()`
- errors
  - `.New(<string>)`
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
- *bool is not equal to 0 or 1, you can need to check this explicitly* 
- `var c, python, java bool` can be declared at the package level and function level
- `var c, python, java = true, false, "no!"` type can be inferred from the value passed or `c, python, java := true, false, "no!"`
- `var arr = map[string]string{"This":"is javascript"}`
- `:=` construct is not available outside functions
- `const` cannot use `:=`
  - must be a numbers (int,unit,float), string, or boolean (const are completely immutable)
- type conversions (type cast)
  - `float()`, `int()`, `unit()`
- int is not a descriptor, therefore when passing around pointers, we use & and *

### string 
- strings are immutable (they are descriptors)
    - if no one is using that descriptor go will garbage collect it
- #best practice `strings.Join([]string," ")` is more efficient (faster) than `" " + stringSlice[i]`
- all strings are unicode and not ASCII (english only characters)
- *!* as a result the length of a string is the byte count [12 34 63 73 28], and it will spill over from the rune count. `len(string)`
- string +=  "some string" 

### slice
 
- `slice` is like an array := `[] <type> {.....}`
- slice is a descriptor, passed by reference
- `a = b` means that b just points to a
- `a := b` means they share the same storage space *!* changing a will change b
  - omitting the size tells go the array can dynamically change
  - `index,value := range([])` OR `_,value := range([])`
- indexing [1:5] [m:n]: [include....exclude) i.e half-opens
  - capacity is determined by previous slice
- indexing len & capacity ->  [i,j,k], len = j-1, capacity k-i
- you cannot use equal operator
- `copy(a,b)` this will make a new copy but take the smallest
- make 
  - v := make([]int,0,5), zero represents the length, and 5 the capacity 
    - only appends after the zeros
  - v := make([]int,5), capacity of 5, adds the zero values to the spaces
    - empty you can append
- check empty: `len(slice) == 0`

- looping 
  ```
    items := [][]byte{{1,2},{3,4}}
    for _,item := range items{ // item here is actually a reference that's being provided (slices return references)
      a = append(a, item[:])  //therefore the value all the items will be the end value
    }
  ```


### array (not slice)

- `[3]int` is distinct from `[3]int{}`, when you specify the size
- array: `a:= [...]int{1,2,3}` but `b:= a[0:1]` is a slice
- you can use equal operator
- values a copies over and not pointed to/from

### struct

- `struct` is a collection of values called fields.
- accessed using dot notation Vertex.Y
  ```
  type Vertex struct {
  	X int
  	Y int
  }
  ```
  ```
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
- can be initialised
- `item := StructType{Key:"Value"}`, if you don't do key value pair you need to initialise all the values
- `var item StructType`
- json notation: `json:"data"`
- emitting empty: `json:"data,omitempty"`

### pointers

- you pass a pointer to the float the and the function will put the value into the variable, e.g. &val `fmt.Fscanln(os.Stdin, &val)`
- expecting a pointer `*`, e.g.`func something(m1 *map[int]int)`
- pointers need to be dereferenced to work with them. `func....{ (*m1)[0] := ...}`

## 6. conditional statements

- you can declare a variable in the if statement which's scope is limited to the variable and its children

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
      func other (mapreference map[string]string){ //changes to map here will propagate up}
  ```
- you can't take the value of a map and perform operations on it, even if the value is a struct
  - m["key"]++ ✅
  - m["key"].Something 🛑 , if m["key"] is a struct, but if it's just a pointer ✅
- you also cannot take the reference of a value
  ```
  company := make(map[string]*Employee)
  type Employee struct {
    Name   string
    Number int
    Boss   *Employee
    Hired  time.Time
  }
  b := Employee{"Boss", 2, &company["Bob"]🛑 , time.Now()}
  would work if was just a pointer then: ....,company["Bob"]✅ ,......
  ```
  - naming types a1 of album1 struct, and a2 of album2 struct makes them incompatible, you can't assign one to the other
    - but we can convert them a1 = album1(a2)
  

## 8. Testing

- test functions take a pointer to the testing package's testing.T type as a parameter. You use this parameter's methods for reporting and logging from your test.
- `go test` or `go test -v`

  ```
  func TestName(t \*testing.T) {
  if ..... {
  t.Fatalf(`....`, ....)
  }}
  ```

## 10. functions

- combining input types naming: `func add(x, y int)`
- A return statement without arguments returns the named return values. This is known as a `"naked" return`.
  ```
    func split(sum int) (x, y int) {
      x = sum * 4 / 9
      y = sum - x
      return
    }
  ```
- immediately executable functions `func(){}()`

### Deferred Statement
 - making sure something gets done [files, http, mutex...]
 - defer takes a function call, defer happens when and only when the function exists
 - last deferred will be called before the first
 - *!* defer captures the state at that the time it's called although executes at the end
  - so if defer changes variables then they will get changed at the end
  ```  a =0
      func defer(...) a int{
        defer func(){a++}()
        a = 1
        return 
      }
      output a = 2
  ```

### closures

- function A that returns a function B but the variables were created in function A, so it's got this hanging environment (heap) of variable **pointers**, they don't get reset as long as function B exists (they are not being re-declared)
  ```
    func fib() func() int {
      a, b := 0, 1
      return func() int {
        a, b = b, a+b
        return b
      }
    }
  ```

- closure captures
- i := i // closure capture , recreates the variable reference, if clause is removed the reference will stay the same at the end the printout will all be the same
  ```
    s := make([]func(),4)
    for i:= 0; i < 4; i++ {
      i2 := i // closure capture
      s[i] = func() {
      fmt. Printf("8d @ Sp\n", 12, &i2)
      }
      for i:= 0; 1 < 4; i++ {
        s[i]()
      }
    }
  ```

### Scope VS lifetime
- go performs escape analysis, a function declared variable can persist outside the scope `func() *int{ var b int..... return &b}`, this pointer is going to live as long as someone is always using it.

### Nested Functions:

- Nested functions cannot have named return values, as this is a feature only available to top-level (non-nested) functions in Go.
- Methods (functions with a receiver) cannot be nested inside other functions. Methods must be declared at the package level.


## 11. For Loops

- go only has one looping constructor (for loop)
- you can use the continue statement to make the next iteration start early
- init. and post statements are optional:
    - essentially becomes a while loop, you can break to terminate
    ```
        for ; sum < 1000; {
            sum += sum
        }
    ```

## 12. concurrency

concurrency - execution of multiple tasks at the same time.
*Concurrency focuses on managing multiple tasks at once, not necessarily implying that they're running simultaneously. Parallelism refers to the simultaneous execution of multiple tasks or distributing different parts of a specific task amongst different processors.*

- the best approach to concurrency is don't share anything (copy don't reference)
- threads and locks?
- issues like race conditions and deadlocks?
-  race condition bug: if two concurrent requests (http) try to update a variable at the same time, it might not be incremented consistently
  - therefore we use: mu.lock() and mu.unlock()
  - when working with race condition we need to make our read,process,write we need our process atomic
  - performed atomically—meaning they are executed as a single, indivisible step. This helps prevent race conditions, where multiple goroutines might try to access and modify the same variable simultaneously.

Important terms:
- "Execution happens in some non-deterministic order"
- "Undefined out-of-order execution"
- "Non-sequential execution"
- "Parts of a program execute out-of-order or in partial order"
  - partial order some things are ordered and some aren't

- `func get(url, ch chan<- result)` the <- allows us to write to the chanel but not read from it

- select statement: used to select either of the two go routines

```
loop:
  for {
    select{
      case <-chan1:

      case <-chan2:
        break loop
      
      default:
        if nothing else is ready the default is always ready, don't put default into a loop

    }
  }
```

- `time.After(seconds)` sends a signal when time is up such that we don't wait forever for a channel to respond

### Context package
  - tying together a bunch of operations such that they all get cancelled together 
  - explicit - make a call 
  - implicit - I have a timeout or deadline

  Done channel 

  Context - immutable
      ^
   Context - immutable
      ^
    Contect - immutable


`ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)`

or you can use `context.WithDeadline` setting a fixed time

`defer cancel`

`req, err := http.NewRequestWithContext(ctx, http.MethodGet, url, nil)` //this will cause the request to timeout of a response is not provided within the given timeframe

`resp, err := http.DefaultClient.Do(req)` //this rakes in the req with context and not just the url



## 13. References

- if you start using references stick to it such that there's no break in the chain and it doesn't update up the ladder

## 14. Other

- `os.WriteFile(fileName, jsonData, 0644)` [File Permissions](https://www.multacom.com/faq/password_protection/file_permissions.htm#:~:text=777%20%2D%20all%20can%20read%2Fwrite,group%2Fothers%20can%20read%20only.)
  - 777 - all can read/write/execute (full access).
  - 755 - owner can read/write/execute, group/others can read/execute.
  - 644 - owner can read/write, group/others can read only.

  ## 15. OOP
  - object oriented programming 
    - abstraction - take away the underlying complexity that's going on under the hood
    - encapsulation - creating a contained code block that hides it's internal works
    - polymorphism - something that takes on many shapes

  ### Methods Interfaces 
  [Re-watch this video](https://www.youtube.com/watch?v=W3ZWbhQF6wg&list=PLoILbKo9rG3skRCj37Kn5Zj803hhiuRK6&index=18)
  ```
  type Name struct...
  type Name int

  func (n Name) doSomething1() float64 {}
  func (n *NameOther) doSomething1() float64 {} to change the main variable

  type name interface{
    doSomething1() float64
  }
  ```

  ```
  type Distancer interface {
    Distance() float64
  }

  func PrintDistance(d Distancer) {
    print(d.Distance(), "\n")
  }
  ```