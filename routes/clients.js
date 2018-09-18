const express         = require("express");
const router          = express.Router();

module.exports = (knex) => {
  // Home page for clients and purchases
  router.get("/", (req, res) => {
    res.render("clients");
  });
  return router;
}
