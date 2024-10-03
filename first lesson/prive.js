var hundredNumbers = [];
var primeNumber = [];
var evenNumber = [];
for (let i = 0; i <= 1000; i++) {
  hundredNumbers.push(i);
}
for (i = 0; i <= hundredNumbers.length; i++) {
  let num = hundredNumbers[i];
  if (num % 2 === 0) {
    evenNumber.push(num);
  } else {
    odd.push(num);
  }
}

console.log("primeNUmbers", primeNumber);
console.log("evenNumbers", evenNumber);
