const express         = require("express");
const router          = express.Router();

module.exports = (knex) => {

  router.get("/shoppers", (req, res) => {
    res.render("clients");
  });

  return router;
}
