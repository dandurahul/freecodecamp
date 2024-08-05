const a = 10;
const b = 20;
const promise = new Promise((resolve, reject) => {
  setTimeout(resolve, 1000, "fooo");
});
Promise
  .all([promise, a, b])
  .then((value) => {
    console.log(value);
  })
  .catch((error) => {
    console.log(error);
  });
