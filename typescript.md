# Typescript

- structurally typed system, concerned only with the structure


- Types:
    - number 
    - string 
    - boolean 
    - null 
    - undefined 
    - void 
    - object 
      - *type object ={ `readonly _id`, ....}*
        - add it in front of a variable inside an object
    - array 
        - `string[]`
        - alternative `const heroWeakness: Array<number> = []`
        - double array: `const heroWeaknessColor: number[][] = [[]]`
        - readOnlyArray: `ReadOnlyArray<number>`
    - tuples 
    - never 
      - this is recommended than void as it indicates that the function will terminate or stop execution
    - unknown
    - ...
    - &
      - allows you to join types together to make a new type the & {} is not best practice
      - ```
        type cardDetails = cardNumber & cardDate & {
            ccv: number
        }
        ```
    - | Union
      - id: number | string
      - Narrowing (if this type do 1 else 2) , then performing specific logic
      - `const data: (number | string)[] = [1]` then you can have either an complete number array or string array not mised
    - tuple 
      - `type tUser = [string, number, boolean]` restricting by order of the data
    - enum
      - if you specify the first value the other are auto incremented, string need to be explicitly entered
      - use the `const enum ...`, in order for the TS compiler to only compile the minimum necessary code
      - ```
        enum SeatChoice{
          AISLE = 100,
          MIDDLE = 12,
          WINDOW = "String",
          MIDDLE2 = "A"
        }
      ```


- functions which return: Promise<number>
- optional parameters: ?
- Anonymous Functions types are inferred

## Union Types:

## Type Aliases Definition 

the underlying types are still the same, they aren't distinct
a type cannot be re-opened to add new properties.

`type ID = number | string;`
```
type Point = {
  x: number;
  y: number;
};
```

- Extending 

type Bear = Animal & { 
  honey: boolean;
}

## Interfaces 
an interface which is always extendable

```
interface Point {
  readonly x: number;
  y?: number;
}
```

- functions, the one below describes how the function should return a string, the example below shows how it can be defined in two ways
```
interface car {
    country: ()=> string,
    continent(): string,
    engineType(power: number, cylinders: string): string
}
```
- Extending:
```
interface Bear extends Animal {
  honey: boolean;
}
```
or redefining the name and adding more properties will extended the interface 
```
interface Bear {
  honey: boolean;
}
```

## type assertion

`const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;`
`const myCanvas = <HTMLCanvasElement>document.getElementById("main_canvas");`

if type is too conservative: `const a = expr as any as T;`

## Literal types 

`function printText(s: string, alignment: "left" | "right" | "center")`


 - `declare function handleRequest(url: string, method: "GET" | "POST"): void;` which requires that method is a literal GET or POST
  - `const req = { url: "https://example.com", method: "GET" } as const;` the types are then treated as literal types which will work with
  - const req = { url: "https://example.com", method: "GET" as "GET" };
  - handleRequest(req.url, req.method as "GET");

## Null or undefined

- With strictNullChecks on, when a value is null or undefined, you will need to test for those values before using methods or properties on that value.
- Writing ! after any expression is effectively a type assertion that the value isn’t null or undefined
  - this doesn’t change the runtime behavior of your code, so it’s important to only use ! when you know that the value can’t be null or undefined
```
function liveDangerously(x?: number | null) {
  // No error
  console.log(x!.toFixed());
}
```

## Functions

- best practice to annotate the output of a function even if it's anonymous functions
- best practice explicitly indicate that it returns void in the function
```
const something = stringArray.map((value):string =>{
  return "some string"
})
```


## Classes

- private can be used for methods inside class
- protected means it be accessed by the class that inherits it

```
class User{
    email: string //these variables need to be pre-declared with types to avoid type errors
    private name: string // private cannot be used outside the class
    #surname: string //this also makes the variable private
    city: string = "" //when a variable is declared it needs to be initialised here or in constructor
    constructor(email: string, name: string){
        this.email = email; //once pre-declared they can be used
        this.name = name
    }
}
```

### constructor  

```
    #city: string = ""
    //if you specify public and private in the parameters section you don't need to initialise with this. ....
    constructor(public email: string, public name: string, private userId: string){
    }
```

### getters and setters 

```
    get countCount():number{ //this must have a return type since it's returning some value
        return this._courseCount
    }
```
```
    set setCourseCount(courseNum :number){ //this cannot have a return type since it's setting some value, you cannot sed void return
        if (courseNum <= 1){
            this._courseCount++
        }
    }
```

### classes with interfaces
- implements 
```
interface TakePhoto{
    cameraMode: string
    filter: string
    burst: number
}

interface Story{
    createStory(): void
}

class Instagram implements TakePhoto, Story {
    constructor(public cameraMode: string,
        public filter: string,
        public burst: number){

    }

    createStory(): void {
        
    }
}
```

## Abstract Class 
- can only be used by another class that inherits it, but cannot be used to Instantiate a new object
- they are very similar to interfaces

```
abstract class TakePhoto_2{
    constructor(
        public cameraMode: string,
        public filter: string
    ){

    }

    abstract getSepia(): void //this forces the inheriting class to implement this method with this signature
}

class Instagram_2 extends TakePhoto_2 {
    constructor(public cameraMode: string,
        public filter: string,
        public burst :string
    ){
        super(cameraMode, filter) //super word is very important and passing along the necessary parameters 
    }

    getSepia(){
        console.log()
    }
    
}
```

## Generics 


```
function identity<Type>(val:Type): Type{
    return val
}

function identityTwo<T>(val:T): T{
    return val
}

function identityThree<T>(val:T[]): T{
    return val[0]
}

const identityFour = <T>(val: T[]):T =>{
    return val[0]
}

interface vehicle{
    make:string, 
    model:string
}

function someFunction<T extends vehicle>(U:T): T{
    return U
}

someFunction({make: "toyota", model:""})
```

```
interface Quiz{
type: string,
subject: string
}

interface Course{
name: string,
author: string,
subject: string
}

class Sellable<T>{
  public cart: T[] = []
  addToCart(product: T){
  this.cart.push(product)
  }
}
```

## Narrowing

```
function isAdmin(account: User | Admin){
    if( "isAdmin" in account) console.log(account.isAdmin)

}
```

// for anything that can be created with the `new` keyword use `instanceof`

```
function logValue(x: Date | string){
    if(x instanceof Date){

    } else if (typeof x === "string"){

    }
}
```


```
type Fish = {swim: ()=> void}
type Bird = {fly: ()=> void}

function isFish(pet: Fish | Bird):pet is Fish{
    return (pet as Fish).swim != undefined
}

function getFood(pet: Fish | Bird){
    if(isFish(pet)){
        pet
        return "fish food"
    }else{
        pet
        return "bird Food"
    }
}
```

```
function getArea(shape: Shape){
    switch(shape.kind){
        case "circle":
            return
        case "square":
            return
        default:
            const _defaultforshape: never = shape //this is used to catch any additional types that might have been added and alert that they 
            // aren't ben captured and need to be handled correctly
            return _defaultforshape
    }
}
```