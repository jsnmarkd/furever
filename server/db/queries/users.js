const db = require("../../configs/db.config");
const bcrypt = require('bcryptjs');


// checks if username exists
const userExists = function (username, email) {
  const sql = `SELECT * FROM users WHERE username = $1 OR email = $2;`;
  return db
    .query(sql, [username, email])
    .then((result) => {
      return result.rows[0];
    })
};


const getAllUsers = () => {
  return db.query("SELECT * FROM users;").then((data) => {
    return data.rows;
  });
};

const getUserById = (id) => {
  return db.query("SELECT * FROM users WHERE id = $1;", [id]).then((data) => {
    return data.rows[0];
  });
};

const getUserByEmail = (email) => {
  return db.query("SELECT * FROM users WHERE email = $1", [email]).then((data) => {
    return data.rows[0];
  });
};

const checkUsernameExists = (username) => {
  return db.query('SELECT id FROM users WHERE username = $1', [username]);
};

const checkEmailExists = (email) => {
  return db.query('SELECT id FROM users WHERE email = $1', [email]);
};

const addUser = (username, email, password, firstName, lastName) => {

  return bcrypt.hash(password, 10)
    .then((hashedPassword) => {
      return db
        .query('INSERT INTO users (username, email, password, first_name, last_name) VALUES ($1, $2, $3, $4, $5) RETURNING *', [username, email, hashedPassword, firstName, lastName]);
    });
};

const login = function (email, password) {
  return getUserByEmail(email)
    .then(user => {
      if (bcrypt.compareSync(password, user.password)) {
        return user;
      }
      return res.status(400).send(error);
    })
}

const editUser = function (id, username, email, oldPassword, newPassword, firstName, lastName, profileUrl) {
  return getUserById(id)
    .then(user => {
      if (oldPassword && !bcrypt.compareSync(oldPassword, user.password)) {
        throw new Error("Incorrect password");
      }
      return user;
    })
    .then((user) => {
      let queryString = "UPDATE users SET "
      let queryParams = []

      if (username) {
        queryParams.push(username)
        queryString += `username = $${queryParams.length}, `
      }

      if (email) {
        queryParams.push(email)
        queryString += `email = $${queryParams.length}, `
      }

      if (newPassword) {
        const hashedPassword = bcrypt.hashSync(newPassword, 10); 
        queryParams.push(hashedPassword)
        queryString += `password = $${queryParams.length}, `
      }

      if (firstName) {
        queryParams.push(firstName)
        queryString += `first_name = $${queryParams.length}, `
      }

      if (lastName) {
        queryParams.push(lastName)
        queryString += `last_name = $${queryParams.length}, `
      }

      if (profileUrl) {
        queryParams.push(profileUrl)
        queryString += `user_profile_picture = $${queryParams.length} `
      }

      queryParams.push(id)
      queryString += `WHERE id = $${queryParams.length} RETURNING *;`
      return db.query(queryString, queryParams)
        .then((data) => {
          return data.rows[0]
        })
    });
};

module.exports = { getAllUsers, getUserById, checkUsernameExists, checkEmailExists, addUser, userExists, getUserByEmail, login, editUser };