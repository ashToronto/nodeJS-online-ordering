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

  router.get("/shoppers/checkout", (req, res) => {
    res.render('clients_checkout')
  });

  router.post("/shoppers/checkout", (req, res) => {
    const product = req.body.items.items_quantity
    console.log(req.body)
    res.redirect("/shoppers/checkout")
  });

  return router;
}
