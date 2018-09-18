const express         = require("express");
const PORT            = 8080;
const bodyParser      = require("body-parser");
const app             = express();
const configuration   = require('./knexfile.js')['development']
const knex            = require('knex')(configuration);

app.set("view engine", "ejs");

// Serve css files
app.use(express.static(__dirname + '/stylesheets'));

// Seperated Routes for each Resource
const clientsRoutes = require("./routes/clients.js");
const adminRoutes = require("./routes/admin.js");

// Welcome page to direct shoppers and business owners
app.get("/", (req, res) => {
  res.render("welcome");
});

//Mounting Routes
app.use("/clients", clientsRoutes(knex));
app.use("/admin", adminRoutes(knex));

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
