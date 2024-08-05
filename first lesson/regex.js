//this is the email checker and also validation
const emailChecker = /\w+([.-]?w+)*@\w([.-]?\w+)*(\.\w{2,})+$/;
const email = "rahl@gmail.com";
console.log(emailChecker.test(email));

//password checker

// const passwordRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
// const password = "pa4ssword";

// if (passwordRegex.test(password) === false) {
//   console.log("password must have one Capital letter and Atleast One Number");
// } else {
//   console.log("password is created succesfully");
// }
// console.log(passwordRegex.test(password))
const passwordRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
const password = "psa4sD";

const checks = {
  lowercase: /[a-z]/,
  uppercase: /[A-Z]/,
  digit: /\d/,
  length: /.{8,}/,
};

let missingConditions = [];
console.log("something something", !checks.lowercase.test(password));
if (!checks.lowercase.test(password)) {
  missingConditions.push("one lowercase letter");
}
if (!checks.uppercase.test(password)) {
  missingConditions.push("one uppercase letter");
}
if (!checks.digit.test(password)) {
  missingConditions.push("one digit");
}
if (!checks.length.test(password)) {
  missingConditions.push("at least 8 characters");
}
if (missingConditions.length > 0) {
  console.log("Password must have " + missingConditions);
} else {
  console.log("Password is created successfully");
}

console.log(passwordRegex.test(password));

//userName validator

const userNameRegex = /\w+$/;
const userNaName = "rahul_2Dandu";

console.log("testing the userName", userNameRegex.test(userNaName));
