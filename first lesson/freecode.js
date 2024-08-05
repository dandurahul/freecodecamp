// export const data=()=>{

// const character = "#";
// const count = 8;
// const rows = [];

// function padRow(rowNumber, rowCount) {
//   return " ".repeat(rowCount - rowNumber) + character.repeat(2 * rowNumber - 1) + " ".repeat(rowCount - rowNumber);
// }

// // TODO: use a different type of loop
// for (let i = 1; i <= count; i++) {
//   rows.push(padR ow(i, count));
// }
// // while (rows.length < count) {
// //   rows.push(padRow(rows.length + 1, count));
// // }

// for (let i = count; i > 0; i--) {
//   rows.push(padRow(i, count));
// }

// let result = ""

// for (const row of rows) {
//   result = result + "\n" + row;
// }

// console.log(result);

// }

// function findTwoSum(nums, target) {
//   for (let i = 0; i < nums.length; i++) {}
//   // In case there is no solution, we'll just return an empty array.
// }

// Test the function
// console.log(findTwoSum([2, 7, 11, 15], 9)); // Output: [0, 1]
// console.log(findTwoSum([3, 2, 4], 6));      // Output: [1, 2]
// console.log(findTwoSum([3, 3], 6));         // Output: [0, 1]

// function twoSum(numbers, target) {
//   let numMap = new Map();
//   // console.log({numMap})

//   // console.log({target})
//   for (let i = 0; i < numbers.length; i++) {
//     console.log({i})
//     let complement = target - numbers[i];
//     if (numMap.has(complement)) {
//       return [numMap.get(complement), i];
//     }
//     numMap.set(numbers[i], i);
//   }

//   return [];
// }

// Test the function

// function twoSum(numbers, total) {
//   for (let i = 0; i < numbers.length; i++) {
//     for (let j = i + 1; j < numbers.length; j++) {
//       if(numbers[i]+numbers[j]===total);
//       return [i,j]
//     }
//   }
//   return [];
// }

function twoSum(numbers, target) {
  const data = new Map();
  for (let i = 0; i < numbers.length; i++) {
    const complement = target - numbers[i];
    console.log({complement})
    console.log("data.has",data.has(complement))
    if (data.has(complement)) {
      console.log(data.get(complement),i)
      return [data.get(complement), i];
    }
    data.set(numbers[i], i);
  }
}

console.log(twoSum([2, 7, 11, 15], 9)); // Output: [0, 1]
// console.log(twoSum([3, 2, 4], 6)); // Output: [1, 2]
// console.log(twoSum([3, 3], 6)); // Output: [0, 1]




//  if (!Array.isArray(data) || !data.every(item => typeof item === 'string')) {
//       throw new AppError("Filter criteria must contain a 'type' array of strings", 400);
//     }
	

//  const data=[["a","b"],["b","c"],["c","delhi"],["delhi","mumbai"]]

//  console.log(data)
