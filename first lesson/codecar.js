// function solution(string) {
//   let data = string.length % 2 === 0;
//   if (!data) {
//     return (string += "_");
//   } else {
//     return string.match(/.{1,2}/g) || [];
//   }
// }

// console.log(solution("abcdef"));
// console.log(solution("abcdefg"));

function solution(string) {
  if (string.length % 2 !== 0) {
    string += "_"; // Append an underscore if the length is odd
  }

  // Use match with a regex to split the string into pairs of characters
  return string.match(/.{1,3}/g) || [];
}

console.log(solution("abcdef")); // Output: ["ab", "cd", "ef"]
console.log(solution("abcdefg")); // Output: ["ab", "cd", "ef", "g_"]

// function solution(string) {
//     if (string.length % 2 !== 0) {
//       string += "_"; // Append an underscore if the length is odd
//     }

//     let result = [];
//     for (let i = 0; i < string.length; i += 2) {
//       result.push(string.substring(i, i + 2)); // Extract pairs of characters
//     }

//     return result;
//   }

//   console.log(solution("abcdef"));  // Output: ['ab', 'cd', 'ef']
//   console.log(solution("abcdefg")); // Output: ['ab', 'cd', 'ef', 'g_']

//THIS IS HASHTAG GENERATOR
function hashtagGenerator(string) {
  if (string.length >= 140 || string.length === null) {
    return false;
  }
  //   const hashtag =
  //     "#" +
  //     string
  //       .trim()
  //       .replace(/\s+/g, "")
  //       .replace(/\b\w/g, (c) => c.toUpperCase());
  const hashtag =
    "#" +
    string
      .trim()
      .replace(/\s+/g, "")
      .replace(/\b\w/g, (c) => c.toUpperCase());

  return hashtag;
}

console.log(
  hashtagGenerator(
    "Looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong"
  )
);
console.log(hashtagGenerator("rahul Dandu"));
console.log(hashtagGenerator("something something"));
console.log(hashtagGenerator(""));
const fruits = new Map([
  ["apples", 500],
  ["bananas", 300],
  ["oranges", 200],
]);
console.log(fruits.set("apples",400)); // 500
console.log(fruits.get("apples")); // 500

const mapObject = {
  apples: 500,
  mangos: 400,
  grapes: 300,
};

console.log(mapObject["apples"]); // 500
