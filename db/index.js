const { Client } = require('pg');

const { DATABASE_URL } = process.env;

const client = new Client({
  connectionString: DATABASE_URL,
  database: "FoodStore"
})
  
module.exports = { client }