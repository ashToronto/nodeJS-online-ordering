const express         = require("express");
const router          = express.Router();

module.exports = (knex) => {

  // SHOPPER CATELOGUE
  router.get("/shoppers", (req, res) => {
    knex("items")
    .select("*")
    .then(data => {
      const templateVars = {data: data}
      res.render("clients", templateVars);
    })
  });

const global_item_db = [];
// NEED TO PERSIST DATA FROM GET AND POST SO NEW PAGE CAN RE RENDER IT
  router.get("/shoppers/checkout", (req, res) => {
    const templateVars = {
      item_summary_name: global_item_db[0].items.item_name,
      items_summary_quantity: global_item_db[0].items.items_quantity,
      item_summary_price: global_item_db[0].items.item_price,
      checkout_total: global_item_db[0].total_price
    }
    console.log(global_item_db[0])
    res.render("clients_checkout", templateVars)
  });

  router.post("/shoppers/checkout", (req, res) => {
    const products = req.body
    //Push items into global array to render on new page
    global_item_db.push(products)
    res.redirect("shoppers/checkout")
  });

  return router;
}
