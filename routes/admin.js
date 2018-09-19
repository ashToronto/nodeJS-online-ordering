const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');

module.exports = (knex) => {

  // ********************** ALL AVAILABLE ADMIN PATHS - GET REQUESTS ************************

  // ADMIN PANEL HOME PAGE
  router.get("/panel", (req, res) => {
    if (req.session.user_id) {
      res.render("admin");
    } else {
      res.redirect("/")
    }
  });

  // ADMIN REGISTRATION
  router.get("/register", (req, res) => {
    res.status(200);
    res.render("register");
  });

  // ADMIN LOGIN
  router.get("/login", (req, res) => {
    res.render("login")
  });

  // CREATE ITEMS FOR CLIENT CATALOGUE
  router.get("/add", (req, res) => {
    if (req.session.user_id) {

      res.render("create_item");
    } else {
      res.redirect("/")
    }
  });

  // ADMIN ITEM MANAGEMENT
  router.get("/items", (req, res) => {
    if (req.session.user_id) {
      knex("items")
      .select("*")
      .then((data) => {
        console.log(data)
        res.json("ITEM INFO LIST: ", data)
      })
      .then = () => {
        res.render("admin_item_catelogue")
      }
    } else {
      res.redirect("/")
    }
  });

  // ********************** REGISTRATION - POST REQUESTS  ************************

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
            }).catch(function(error) {
              console.error('Error: Inserting the user', error)
            });
        }
      }).catch(function(error) {
        console.error('Error: The user already Exists', error)
      });
  })


  // ********************** LOGIN - POST  ************************

  router.post("/login", (req, res) => {
    const username = req.body.username
    const password = req.body.password

    console.log(username + password)
    knex.select('*')
      .from('owner')
      .where('username', '=', req.body.username)
      .then(function(data) {
        if (bcrypt.compareSync(req.body.password, data[0].password)) {
          console.log('results is', data);
          req.session.user_id = data[0].id;
          res.render("admin");
          return;
        } else {
          res.render("register");
          return;
        }
      }).catch(function(error) {
        console.error("Password is incorrect : " + error)
      });
  })

  // *********** LOGOUT - POST REQUEST  *************

  router.post('/logout', (req, res) => {
    req.session = null;
    res.redirect("/")
  })


  // *********** CREATING ITEMS FOR CLIENT CATELOGUE - POST REQUEST  *************
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
        console.log("created a new item" + user_id);
      })
      .catch((err) => {
        console.log(err);
      });
    res.redirect("/admin/panel");
  });

  return router;
}
