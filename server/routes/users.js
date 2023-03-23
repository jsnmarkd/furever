const express = require("express");
const router = express.Router();
const users = require("../db/queries/users");

router.get("/", (req, res) => {
  users.getAllUsers().then((data) => {
    console.log(data);
    res.json({ users: data });
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  users.getUserById(id).then((data) => {
    console.log(data);
    res.json({ users: data });
  });
});

router.post("/:id", (req, res) => {
  const { username, email, firstName, lastName, password, profileUrl } = req.body;

  users
    .getUserById(req.params.id)
    .then((userExists) => {
        return users.editUser(req.params.id, username, email, password, firstName, lastName, profileUrl);
      
    })
    .then((user) => {
      const updatedUser = user.rows[0];
      console.log('User updated:', updatedUser);
      return res.status(200).send({ user: updatedUser, message: 'User successfully updated' });
    })
    .catch((error) => {
      console.error(error);
      return res.status(400).send({ error: error.message });
    });
});


module.exports = router;
