//this is the email checker and also validation
const emailChecker = /\w+([.-]?w+)*@\w([.-]?\w+)*(\.\w{2,})+$/;
const email="rahl@gmail.com"
console.log(emailChecker.test(email))

