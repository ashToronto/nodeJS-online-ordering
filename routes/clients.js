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

  router.get("shoppers/checkout", (req, res) => {
    res.send("CHECKOUT SUCCESSFUL")
  });

  return router;
}
