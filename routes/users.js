/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const { getUser } = require("../db/queries/users");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("users");
});

router.post("/login", (req, res) => {
  console.log('field-input: ', req.body.username); //test
  const userName = req.body.username;
  const user = getUser(userName);
  res.redirect("/");
});

module.exports = router;
