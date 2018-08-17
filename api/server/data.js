const thaiHour = { id: 0, name: "Thai Hour" };
const milano = { id: 1, name: "Fruiterie Milano" };

const merchants = [thaiHour, milano];

const products = [
  {
    id: 0,
    name: "Sauce Golden Mountain",
    brand: "N/A",
    categories: ["Sauce"],
    merchantId: thaiHour.id,
    voteCount: 0
  },
  {
    id: 1,
    name: "Massaman curry paste",
    brand: "Maesri",
    categories: ["Curry"],
    merchantId: thaiHour.id,
    voteCount: 0
  },
  {
    id: 2,
    name: "Homemade fresh ravioli",
    brand: "Milano",
    categories: ["Pasta"],
    merchantId: milano.id,
    voteCount: 0
  }
];

module.exports = {
  merchants,
  products
};
