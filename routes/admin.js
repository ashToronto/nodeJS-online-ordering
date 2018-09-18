const express         = require("express");
const router          = express.Router();


module.exports = (knex) => {
  // Admin panel page for business owners
  router.get("/admin", (req, res) => {
    res.render("admin");
  });
  return router;
}
