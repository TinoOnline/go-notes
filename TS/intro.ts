let User = { name: <string>"Tinotenda", age: <number>10 };

User.age = 100.5;

console.log("Tino", User.age);
console.log(User.name);

function myErrorMessage(amount: number = 100): string {
  return `This is the output ${amount}`;
}

myErrorMessage(1000);

// function handleUserLogin({ node, age }): { eligible: boolean } {
//   console.log(node, age)
//     return { eligible: true };
// }

const x = { name: "T", age: 0, region: "outside" };
// handleUserLogin(x);

type User = {
  readonly _id: string;
  name: string;
  surname: string;
  isActive: boolean;
  creditCardDetail?: string
};

type myString = string;

type cardNumber = {
    card_number: string
}

type cardDate = {
    card_date: string 
}

type cardDetails = cardNumber & cardDate & {
    ccv: number
}

function createUser(user: User): User {
  return user;
}

let completeUser: User = {
  _id: "uo",
  name: "",
  surname: "",
  isActive: true,
};

createUser(completeUser);


const superHero: User[] = []
const herePower: number[] = []
const heroWeaknessColor: number[][] = [[]]
superHero.push(completeUser)

// Unions

let score: number | string = 47 

score = 44
score = "55"

type generalUser = {
    name: string 
    id: string
}

type adminUser = {
    name: string
    adminID: number
}

let baseUser: generalUser | adminUser ={ name:"", id:""}

baseUser = {
    name:"",
    adminID:44
}

const data: (number | string)[] = [1]


// tuple

type tUser = [string, number, boolean]

const user: tUser = ["string", 121, true]

let rgb: readonly [number, number, number] = [255, 201, 124]

user[0] = ""

// enum 

const enum SeatChoice{
    AISLE = 100,
    MIDDLE,
    WINDOW ,
    MIDDLE2 
}

const seat = SeatChoice.AISLE

interface car {
    type: string, 
    model: string, 
    price: number 
    method: ()=> string
}

const ford: car = {model: "Model T",type:"SUV", price: 100, method: ()=> "String" }

interface car {
    country? : string
}

interface manufacture extends car {
    volume: number 
}

// const tesla: manufacture = {...}