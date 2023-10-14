const db = require('../connection');

const getUsers = (username) => {
  const query = 'SELECT $1 FROM users;';
  const values = [username]

  return db.query(query, values)
    .then(data => {
      return data.rows;
    });
};

module.exports = { getUsers };
