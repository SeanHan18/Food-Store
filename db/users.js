const { client } = require('./');
const bcrypt = require('bcrypt');

async function createUser({ username, password, birthday, admin }) {

    try {
      const SALT_COUNT = 10;
      const hashedPassword = await bcrypt.hash(password, SALT_COUNT)
      const { rows: [user] } = await client.query(`
          INSERT INTO users(username, password, birthday, admin)
          VALUES($1, $2, $3, $4)
          ON CONFLICT (username) DO NOTHING
          RETURNING id, username, birthday, admin;
          `, [username, hashedPassword, birthday, admin])
  
      return user;
    } catch (error) {
      throw error
    }
  }

module.exports = { createUser }