const db = require('../connection');

const getUser = (username) => {
  const query = 'SELECT * FROM users WHERE username = $1;';
  const values = [username]

  return db.query(query, values)
    .then(data => {
      console.log('db-query: ', data.rows); //test
      return data.rows;
    });
};

module.exports = { getUser };
