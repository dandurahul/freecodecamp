//this is the email checker and also validation
const emailChecker = /\w+([.-]?w+)*@\w([.-]?\w+)*(\.\w{2,})+$/;
const email = "rahl@gmail.com";
console.log(emailChecker.test(email));

// password checker
const passwordRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
const password = "P5s6rf5dds";
console.log("password is coming", password.replace(/\d/g, ""));
console.log("password is coming", password.match(/[\d]/g).join(""));
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

function incrementString(string) {
  const data = [string].reduce((c, f) => {
    return c, f;
  });
  console.log({ string });
}

// incrementString("foobar000", "foobar001");
// incrementString("foobar999", "foobar1000");
// incrementString("foobar00999", "foobar01000");
// incrementString("foo", "foo1");
// incrementString("foobar001", "foobar002");
// incrementString("foobar1", "foobar2");
// incrementString("1", "2");
// incrementString("009", "010");
// incrementString("fo99obar99", "fo99obar100");

function NumberPredictor() {
  let n = 0;
  // let number = 10+n=0;

  // return number;
}
const data = NumberPredictor();

const datda = "This is the notification message";

console.log(datda.split(","));
