const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');

module.exports = (knex) => {

  // REGISTRATION
  router.get("/register", (req, res) => {
    res.status(200);
    res.render("register");
  });

  // LOGIN
  router.get("/login", (req, res) => {
    res.render("login")
  });
  // Admin panel page for business owners
  router.get("/panel", (req, res) => {
    res.render("admin");
  });

  router.get("/add", (req, res) => {
    if(req.session.user_id){
    res.render("create_item");
    }
  });

  // *********** REGISTRATION AND VALIDATION  *************
    router.post('/register', (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password
    knex.select("username")
      .from("owner")
      .where("username", username)
      .where("email", email)
      .then(userNametList => {
        if (userNametList.length === 0) {
          return knex('owner')
            .returning('id')
            .insert([{
              username: req.body.username,
              email: req.body.email,
              password: bcrypt.hashSync(req.body.password, 10)
            }])
            .then(function(id) {
              req.session.user_id = id[0];
              res.render("admin");
              return;
            }).catch(function (error) {
              console.error('Error: Inserting the user', error)
            });
        }
      }).catch(function (error) {
        console.error('Error: The user already Exists', error)
      });
  })

  // *********** LOGIN AND VALIDATION  *************
  router.post("/login", (req, res) => {
    const username = req.body.username
    const password = req.body.password

    console.log(username + password)
    knex.select('*')
  .from('owner')
  .where('username', '=', req.body.username)
  .then(function (data) {
    if (bcrypt.compareSync(req.body.password, data[0].password)) {
      console.log('results is', data);
      req.session.user_id = data[0].id;
      res.render("admin");
      return;
        } else {
          res.render("register");
          return;
    }
  }).catch(function (error) {
        console.error("Password is incorrect : " + error)
});
})

// *********** LOGOUT  *************
router.post('/logout', (req, res) => {
req.session = null;
res.redirect("/")
})


// *********** CREATING MENU ITEMS  *************
// Add a new menu item
router.post('/add', (req, res) => {
  res.status(200);
  const name = req.body.name;
  const description = req.body.description;
  const item_price = parseFloat(req.body.price);
  const photo_url = req.body.photo_url;
  console.log(name)
  return (
  knex("items")
  .insert({
    name: req.body.name,
    description: req.body.description,
    price: parseFloat(req.body.price),
    photo_URL: req.body.photo_url,
  })
)
  .then(() => {
    console.log("created a new item");
  })
  .catch((err) => {
    console.log(err);
  });
  res.redirect("/admin/panel");
});
  return router;
}
