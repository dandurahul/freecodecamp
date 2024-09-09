const string = "10*x=100";
const output = underTaker(string);
console.log({ output });

function underTaker(string) {
  const [one, two] = string.split("=");
  const operator = one.includes("+")
    ? "+"
    : one.includes("*")
    ? "*"
    : one.includes("%")
    ? "%"
    : null;

  const [num1, num2] = one.split(operator).map(Number);
  const number = condistionCheckout(num1, num2);
  let output;
  switch (operator) {
    case "+":
      output = ~~two - number;
      break;
    case "*":
      output = ~~two / number;
  }

  return output;
}
function condistionCheckout(num1, num2) {
  let number;
  if (isNaN(num1)) {
    number = num2;
  } else {
    number = num1;
  }
  return number;
}
let a = 10;
for (let i = 0; i <= a; i++) {
  if (i === 9) {
    continue;
  }
  console.log(i);
}

const bcrpt = require("bcrypt");
const salt = 10;
const password = "RahulDandu";
const d = "RahulDandu";

const data = async (password, salt) => {
  let hash;
  hash = await bcrpt.hash(password, salt);
  let data = await bcrpt.compare(d, hash);
  return { hash, data };
};
data(password, salt)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });

let i=10

while (i < dd) {
    i--
  console.log(i);
}
