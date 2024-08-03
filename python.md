# Python Notes and Lessons

# String Manipulation

- one key point is that a string is an iterable and you can perform some maths on it i.e. `print("meow" * 3)`
- `print(student, students[student], sep=", ")` separate tge printed results
- `.lower()`, `.repalce()`, `.startswith()`, `.split()`, `islower`, `.capitalise`
- `answer = answer.strip()` remove white spaces from either side of the string
- `(before, word, after) = rpartition('.')` right search: returns tupple with (text before, identifier, text after)

# Lists

## List Comprehensions

- `squares = list(map(lambda x: x**2, range(10)))`
- `squares = [x**2 for x in range(10)]`

```
[(x, y) for x in [1,2,3] for y in [3,1,4] if x != y]
[(1, 3), (1, 4), (2, 3), (2, 1), (2, 4), (3, 1), (3, 4)]
```

```
vec = [[1,2,3], [4,5,6], [7,8,9]]
[num for elem in vec for num in elem]
```

### Chaining conditions in python:

```
  if 90 <= score <= 100:
      print("Grade: A")
```

Python best practice according to hover is easier code readability and maintanance, i.e. simpler structure of code that is easier to follow:

```
if score >= 90:
    print("Grade: A")

    VS

  if 90 <= score <= 100:
      print("Grade: A")
```

### Conditional Statement Case in python

```
  match name:
      case "Harry" | "Hermione" | "Ron":
          print("Gryffindor")
      case "Draco":
          print("Slytherin")
      case _:
          print("Who?")
```

- if a variable does not have any significance in our code, we can represent the variable as an underscore `_`

## Loops

- using range `for _ in range(3):`
- `continue` and `break`

```
i = 0
while i < 3:
    print("meow")
    i += 1
```

- neat implementation of continuos user input prompt

```
while True:
    n = int(input("What's n? "))
    if n < 0:
        continue
    else:
        break
```

## Interesting

- you can use `...` to indicate that the function still needs to be impleneted without python crashing, it serves as a placeholder

```
def is_valid(s):
    ...
```

## Python regular expression

common : `match`, `fullmatch`
characters specifc:

- `[]`, `()`, `{}`,
- `^` match start of string
- `[^...]` match what is not in the brackets
- `$` match end of string

- 1. Regular expressions use backslashes for special forms, conflicting with Python's string literals, requiring doubling (e.g., '\\\\' for a literal backslash).

2. Use Python’s raw string notation (prefix with 'r') for regular expressions to treat backslashes literally, avoiding conflicts.
