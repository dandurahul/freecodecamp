function Person(name, age) {
  this.name = name;
  this.age = age;
}

const personInstance= new Person("Rahul",9)
console.log("Instance of Data",personInstance instanceof Person)

// Adding a method to the prototype
Person.prototype.greet = function () {
  console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
};

const john = new Person("John", 30);
john.greet(); // Output: Hello, my name is John and I am 30 years old.

//object literal or object initializer
let object = {
  name: "RahulDandu",
  address: "Mydukur",
  city: "Kadapa",
};

//giveing  empty curly brases  to the Object
const object1 = {};

object1.name = "curly brases object is being initialised";
object1.city = " i am from the city of mexico";
object1.motherTonque =
  "Rahul Dandu can able to speak two languages perfectly those are English and Telugu ";

Object.defineProperty(object1, "city", {
  enumerable: false,
});
for (const object in object1) {
  console.log({ object });
}
const object2 = new Object();

object2.nadme = "kalavsathi Dandu";
object2.age = "38";
console.log(object2);

function Badvel() {
  this.name = "Dakshini Saginala";
  this.age = "20";
  this.city = "badvel";
}

Badvel.prototype.greet = function () {
  console.log(`Hello, my name is ${this.name} and I am ${this.age}`);
};

const badvel = new Badvel();

badvel.greet();
const newObject = {};

//this is the example for the  assign

Object.assign(newObject, badvel, object);
console.log({ newObject });

const data = {
  name: "something",
};

const data1 = Object.create(data, {
  name: { value: "rahul", enumerable: true },
  age: { value: "d Crosseddd 22 now in 23", enumerable: true, writable: false },
});
data1.age = { value: "dsfs" };

console.log(Object.entries(data1));

const array = ["rahul"];
const array2 = ["rahul"];

console.log(array.includes(array2));

const numbers = ["1", "2", "3"];
console.log(...numbers);

function lowerNumber(numbers) {
  let data = numbers.map((item) => ~~item);
  return Math.min(...data);
}

console.log(lowerNumber(numbers));
console.log(Math.random());

function spinWords(string) {
  let splittedData = string.split(" ");
  let reverserdData = splittedData.map((item) => {
    return item.length >= 5 ? item.split("").reverse().join("") : item;
  });
  return reverserdData.join(" ");
}

// this is the topic about the reduce function
