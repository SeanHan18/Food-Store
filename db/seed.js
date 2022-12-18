const { client } = require('./')
const { createUser } = require('./users')

async function dropTables() {

    console.log("Dropping All Tables...")
  
    await client.query(`
      DROP TABLE IF EXISTS carts;
      DROP TABLE IF EXISTS products;
      DROP TABLE IF EXISTS users;
    `);
    
    console.log("Finished dropping tables!");
  }

  async function createTables() {

  try {
    console.log("Starting to build tables...")

    await client.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username varchar(255) UNIQUE NOT NULL,
        password varchar(255) NOT NULL,
        birthday DATE NOT NULL,
        cart integer ARRAY,
        active boolean DEFAULT TRUE,
        admin boolean DEFAULT FALSE
      );
      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        title varchar(255) NOT NULL,
        description TEXT NOT NULL, 
        type varchar(255) NOT NULL,
        price DECIMAL(19,3) NOT NULL
      );
      CREATE TABLE carts (
        id SERIAL PRIMARY KEY,
        "userId" INTEGER REFERENCES users(id),
        "productIds" INTEGER ARRAY
      );
      CREATE TABLE reviews (
        id SERIAL PRIMARY KEY,
        name varchar(255) NOT NULL,
        description TEXT NOT NULL, 
        rating INTEGER NOT NULL,
        CHECK (rating BETWEEN 1 and 5),
        "productId" INTEGER REFERENCES products(id),
        "userId" INTEGER REFERENCES users(id)
      );  
  `);

    console.log("Finished building tables!")
  } catch (error) {
    console.error("Error building tables!")
  }
}

async function createTables() {

    try {
      console.log("Starting to build tables...")
  
      await client.query(`
        CREATE TABLE users (
          id SERIAL PRIMARY KEY,
          username varchar(255) UNIQUE NOT NULL,
          password varchar(255) NOT NULL,
          birthday DATE NOT NULL,
          cart integer ARRAY,
          active boolean DEFAULT TRUE,
          admin boolean DEFAULT FALSE
        );
        CREATE TABLE products (
          id SERIAL PRIMARY KEY,
          title varchar(255) NOT NULL,
          description TEXT NOT NULL, 
          type varchar(255) NOT NULL,
          price DECIMAL(19,3) NOT NULL
        );
        CREATE TABLE carts (
          id SERIAL PRIMARY KEY,
          "userId" INTEGER REFERENCES users(id),
          "productIds" INTEGER ARRAY
        );
    `);
  
      console.log("Finished building tables!")
    } catch (error) {
      console.error("Error building tables!")
    }
  }

  async function createInitialUsers() {

    console.log("Creating initial users...")
  
    try {
      const usersToCreate = [
        { username: "sean", password: "seanpassword", birthday: "09-21-1993", admin: "true" },
        { username: "evan", password: "evanpassword", birthday: "01-21-1999", admin: "true" },
      ]
  
      const users = await Promise.all(usersToCreate.map(createUser))
  
      console.log("Users created:")
      console.log(users)
      console.log("Finished creating intial users")
  
    } catch (error) {
      console.error("Error creating initial users")
      throw error
    }
  }

  async function buildDB() {

    try {
      client.connect();
      await dropTables();
      await createTables();
    //   await createInitialProducts();
    //   await testDeleteProduct();
      await createInitialUsers();
  
    } catch (ex) {
      console.log('Error building the DB')
      throw ex;
    }
  }
  
  buildDB()
    .catch(console.error)
    .finally(() => client.end())