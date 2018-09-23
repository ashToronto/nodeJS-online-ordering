const express         = require("express");
const router          = express.Router();

module.exports = (knex) => {
  router.get("/shoppers", (req, res) => {
    knex("items")
    .select("*")
    .then(data => {
      const templateVars = {data: data}
      res.render("clients", templateVars);
    })
  });

  return router;
}
