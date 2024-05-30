const character = "#";
const count = 8;
const rows = [];

function padRow(rowNumber, rowCount) {
  return " ".repeat(rowCount - rowNumber) + character.repeat(2 * rowNumber - 1);
}

// TODO: use a different type of loop
for (let i = count; i>0; i=i-1) {
  rows.push(padRow(i, count));
}

let continueLoop = false;
// while (count>done) {
//   done++;
// rows.push(padRow(done,count))
//   // if (done === count) {
//   //   continueLoop = false;
//   // }
// }

// while (rows.length<count) {
//   rows.push(padRow(rows.length+1, count));
// }

let result = "";

for (const row of rows) {
  result = result + "\n" + row;
}

console.log(result);

const object = "rahul";
console.log(object.length);

