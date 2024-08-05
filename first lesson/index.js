// const character = "#";
// // const count = 8;
// // const rows = [];

// // // function padRow(rowNumber, rowCount) {
// // //   return " ".repeat(rowCount - rowNumber) + character.repeat(2 * rowNumber - 1);
// // // }

// // // // TODO: use a different type of loop
// // // for (let i = count; i>0; i--) {
// // //   rows.push(padRow(i, count));
// // // }

// // // let continueLoop = false;
// // // // while (count>done) {
// // // //   done++;
// // // // rows.push(padRow(done,count))
// // // //   // if (done === count) {
// // // //   //   continueLoop = false;
// // // //   // }
// // // // }

// // // // while (rows.length<count) {
// // // //   rows.push(padRow(rows.length+1, count));
// // // // }

// // // let result = "";

// // // for (const row of rows) {
// // //   result = result + "\n" + row;
// // // }

// // // console.log(result);

// // // const object = "rahul";
// // // console.log(object.length);

// // const  results=[1,2,3,4,5,6]

// // // console.log(rows)
// // // const shited=rows.shift()
// // // console.log(shited)
// // // const unshifted=results.unshift(0)
// // // const shifteds=results.shift()
// // // console.log(unshifted)
// // // console.log(shifteds)
// // // console.log(results)

// // for (let i=0;i<=count)

// function peramidStructure(increamentNumber, count) {
//   return (
//     " ".repeat(count - increamentNumber) +
//     characters.repeat(2 * increamentNumber-1 )+" ".repeat(count-increamentNumber)
//   );
// }

// const characters = "$";
// const count = 8;
// const rows = [];
// for (let i = 1; i <= count; i++) {
//   rows.push(peramidStructure(i, count));
// }
// // for (let i = count; i > 0; i--) {
// //   rows.push(peramidStructure(i, count));
// // }
// for(let i=1;i<=count;i++){
//   rows.unshift(peramidStructure(i,count))
// }

// for (const row of rows) {
//   console.log(row);
// }

// function getGrade(score) {
//   if (score === 100) {
//     return "A++";
//   } else if (score >= 90) {
//     return "A";
//   } else if (score >= 80) {
//     return "B";
//   } else if (score >= 70) {
//     return "C";
//   } else if (score >= 60) {
//     return "D";
//   } else {
//     return "F";
//   }
// }

// function hasPassingGrade(score) {
//   return getGrade(score) !== "F";
// }

// // console.log(hasPassingGrade(100));
// // console.log(hasPassingGrade(53));
// // console.log(hasPassingGrade(87));

// function studentMsg(totalScores, studentScore) {
//   const getGrade=getGrade(totalScores)

// }
// console.log(studentMsg([92, 88, 12, 77, 57, 100, 67, 38, 97, 89], 37));
const fs= require("./javascriptprac")
console.log(fs)

function getAverage(scores) {
  let sum = 0;

  for (const score of scores) {
    sum += score;
  }

  return sum / scores.length;
}

function getGrade(score) {
  if (score === 100) {
    return "A++";
  } else if (score >= 90) {
    return "A";
  } else if (score >= 80) {
    return "B";
  } else if (score >= 70) {
    return "C";
  } else if (score >= 60) {
    return "D";
  } else {
    return "F";
  }
}

function hasPassingGrade(score) {
  return getGrade(score) !== "F";
}

function studentMsg(totalScores, studentScore) {
  return `average :${getAverage(totalScores)}.Your grade:${getGrade(
    studentScore
  )},${hasPassingGrade(studentScore) ? "you are passs" : "you are fail"}`;
}
console.log(studentMsg([92, 88, 12, 77, 57, 100, 67, 38, 97, 89], 66));
