(function data() {
  const data = "rahulDnadu";
  console.log({ data });
})();

function one() {
  let x = "Rahul Dandu";

  function inner() {
    console.log(x);
  }
  inner();
}

const data = "rahsulDandu";
console.log(data.slice(0, 5));
one();

console.log(new Date());
