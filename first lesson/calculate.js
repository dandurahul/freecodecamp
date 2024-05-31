const express = require("express");
const bodyParser = require("body-parser"); // Import body-parser to parse request bodies

const port = 5000;
const app = express();

// Use body-parser middleware to parse JSON bodies
app.use(bodyParser.json());

// Create a router
const router = express.Router();

// Define the POST route
router.post("/post", (req, res) => {
  const data = req.body;
  const response = calculateData(data);

  // console.log("Data received:", data);
  res.send("Data received");
});

// Use the router
app.use("/", router);

const calculateData = (result) => {
  const array = [result];
  const datas = array.flatMap((item) => item.invoiceDetails);
  let result1  = []
for(let el of datas){
    let a  = Object.keys(el)
    if(a.includes(totalAmount)){


        
    }
}
console.log(result1)
//   for (let [k,v] in datas) {
//     console.log({k,v})
//     // const data = result.totalAmount && result.discountAmount;
//     // console.log(data);
//   }
// datas.map((k,v)=>{
//     console.log({k,v})
//     // const data = v.totalAmount && .discountAmount;
//     //     console.log(data);
// })
};

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
