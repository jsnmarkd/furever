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
  return db.query("SELECT * FROM users; WHERE id = $1", [id]).then((data) => {
    return data.rows;
  });
};

const getUserByEmail = (id) => {
  return db.query("SELECT * FROM users; WHERE email = $1", [email]).then((data) => {
    return console.log('is it me??',data.rows[0]);
  });
};

const checkUsernameExists = (username) => {
  return db.query('SELECT id FROM users WHERE username = $1', [username]);
};

const checkEmailExists = (email) => {
  return db.query('SELECT id FROM users WHERE email = $1', [email]);
};

const addUser = (username, email, password, firstName, lastName) => {
  return bcrypt.hash(password, 10).then((hashedPassword) => {
    return db.query('INSERT INTO users (username, email, password, first_name, last_name) VALUES ($1, $2, $3, $4, $5) RETURNING *', [username, email, hashedPassword, firstName, lastName]);
  });
};


module.exports = { getAllUsers, getUserById, checkUsernameExists, checkEmailExists, addUser, userExists, getUserByEmail};
