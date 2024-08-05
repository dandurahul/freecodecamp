// const fruits = ["Banana", "Orange", "Apple", "Mango"];
// // console.log(fruits);
// for (let i = 0; i < fruits.length; i++) {
//   let data = fruits[i].toUpperCase().split("");
//   for (let j = 0; j < data.length; j++) {
//     if (data[j] !== fruits[0][j].toUpperCase()) {
//         console.log(isArray(data[j]))
//     }
//   }
// }

const fruits = ["Banana", "Orange", "Apple", "Mango"];

for (let i = 0; i < fruits.length; i++) {
  let data = fruits[i].toUpperCase().split("");
  for (let j = 0; j < data.length; j++) {
    if (data[j] !== fruits[0][j].toUpperCase()) {
      console.log(data[j]);
    }
  }
}

// const fruidts = ["Banana", "Orange", "Apple", "Mango"];

// for (let i = 0; i < fruits.length; i++) {
//     let data = fruits[i].split("");
//     for (let j = 0; j < data.length; j++) {
//         if (data[j] !== fruits[0][j]) {
//             console.log(data[j]);
//         }
//     }
// }

// // console.log(fruits.indexOf("ppple"))
// // const isArray= Array.isArray(fruits)
// if (Array.isArray(fruits) === true) {
//   console.log(`This is an array,${fruits}`);
// }

// const survey = [
//   { name: "Steve", answer: "Yes" },
//   { name: "Jessica", answer: "Yes" },
//   { name: "Peter", answer: "Yes" },
//   { name: "Elaine", answer: "No" },
// ];

// const data = survey.every((r, index, arr) => {
//  return r.answer === "Yes";
// });

//   console.log(data)
