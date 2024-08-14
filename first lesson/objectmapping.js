let item = {
  itemcode: "123",
  specifications: [
    {
      name: "Size",
      attributes: [
        {
          attributeid: "124",
          fieldvalue: "",
        },
      ],
    },
  ],
};

let ex = { color: "Green" };

const data = Object.keys(ex)[0];
const exValue = ex[data];
console.log(data, exValue);

let family = {
  familyName: "Colors",
  Groups: [
    {
      groupId: "",
      subgroup: [
        {
          attributes: [
            {
              attributeid: "124",
              label: "color",
            },
          ],
        },
      ],
    },
  ],
};

let familyMap = {};

family.Groups.map((sb) => {
  sb.subgroup.map((sub) => {
    sub.attributes.map((attr) => {
      familyMap[attr.attributeid] = attr;
    });
  });
});

[item].map((i) => {
  i.specifications.map((s) => {
    s.attributes.map((r) => {
      console.log(r.attributeid)
      let attribute = familyMap[r.attributeid];
      if (r.attributeid === attribute.attributeid) {
        r.fieldvalue = Object.values(ex)[0];
      }
    });
  });
});

console.log("familyMap", familyMap);
console.log(JSON.stringify(item));

// const fruts=["Banana","Orange","Grapes","Pinapple",10]
// console.log(fruts.copyWithin(2,0))

// fruts.findIndex(bringInterger)
// console.log(fruts)
// function bringInterger(fruts){
// if(fruts.Object.values!=="tring"){
//     return fruts.Object.values(fruts)
// }
// }

const fruits = ["Banana", "Orange", "Grapes", "Pineapple", 10];

// const foreach = fruits.forEach((item, index) => {
//   console.log(`${index}:${item}`);
// });
// console.log(foreach);

// function bringInteger(element) {
//     return typeof element==="string"
//     // return Number.isInteger(element);
// }

// const index = fruits.findIndex(bringInteger);
// console.log(index);

// Log the fruits array
// console.log(fruits); // ["Banana", "Orange", "Banana", "Orange", "Grapes"]

// if(fruts.every(element=>typeof element=== "string")){
// console.log("all the frusts are stirngs only")
// }
