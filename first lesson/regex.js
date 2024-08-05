//this is the email checker and also validation
const emailChecker = /\w+([.-]?w+)*@\w([.-]?\w+)*(\.\w{2,})+$/;
const email = "rahl@gmail.com";
console.log(emailChecker.test(email));

// password checker
const passwordRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
const password = "P5srfdds";

const checks = {
  lowercase: /[a-z]/,
  uppercase: /[A-Z]/,
  digit: /\d/,
  length: /.{8,}/,
};

let missingConditions = [];
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
if (password.length > 20) {
  missingConditions.push("Not More than 20 Charectors");
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
