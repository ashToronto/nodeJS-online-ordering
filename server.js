const express         = require("express");
const PORT            = 8080;
const bodyParser      = require("body-parser");
const app             = express();
const configuration   = require('./knexfile.js')['development']
const knex            = require('knex')(configuration);

app.set("view engine", "ejs");

// Seperated Routes for each Resource
const clientsRoutes = require("./routes/clients.js");
const adminRoutes = require("./routes/admin.js");

//Mounting Routes
app.use("/", clientsRoutes(knex));
app.use("/api", adminRoutes(knex));

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
