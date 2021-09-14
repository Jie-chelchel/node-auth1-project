// Require `checkUsernameFree`, `checkUsernameExists` and `checkPasswordLength`
// middleware functions from `auth-middleware.js`. You will need them here!
const express = require("express");
const { userInfo } = require("os");
const router = express.Router();
const User = require("../users/users-model");
const bcrypt = require("bcryptjs");
const {
  checkPasswordLength,
  checkUsernameExists,
  checkUsernameFree,
} = require("./auth-middleware");
/**
  1 [POST] /api/auth/register { "username": "sue", "password": "1234" }

  response:
  status 200
  {
    "user_id": 2,
    "username": "sue"
  }

  response on username taken:
  status 422
  {
    "message": "Username taken"
  }

  response on password three chars or less:
  status 422
  {
    "message": "Password must be longer than 3 chars"
  }
 */

/**
  2 [POST] /api/auth/login { "username": "sue", "password": "1234" }

  response:
  status 200
  {
    "message": "Welcome sue!"
  }

  response on invalid credentials:
  status 401
  {
    "message": "Invalid credentials"
  }
 */

/**
  3 [GET] /api/auth/logout

  response for logged-in users:
  status 200
  {
    "message": "logged out"
  }

  response for not-logged-in users:
  status 200
  {
    "message": "no session"
  }
 */
router.post("/login", checkUsernameExists, (req, res, next) => {
  res.send("login");
});

router.post(
  "/register",
  checkUsernameFree,
  checkPasswordLength,
  (req, res, next) => {
    const { username, password } = req.body;
    const hash = bcrypt.hashSync(password, 8);

    User.add({ username, password: hash })
      .then((newUser) => res.json(newUser))
      .catch((err) => next(err));
  }
);

router.get("/logout", (req, res, next) => {
  res.send("logout");
});
module.exports = router;
