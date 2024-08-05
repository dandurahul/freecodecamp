//this is the email checker and also validation
const emailChecker = /\w+([.-]?w+)*@\w([.-]?\w+)*(\.\w{2,})+$/;
const email = "rahl@gmail.com";
console.log(emailChecker.test(email));

//password checker

const passwordRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
const password = "pa4ssword";

if (passwordRegex.test(password) === false) {
  console.log("password must have one Capital letter and Atleast One Number");
} else {
  console.log("password is created succesfully");
}
console.log(passwordRegex.test(password))


//userName validator

const userNameRegex=/\w+$/;
const userNaName="rahul_2Dandu"

console.log("testing the userName",userNameRegex.test(userNaName))