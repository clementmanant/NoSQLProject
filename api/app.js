require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const neo4j = require('neo4j-driver')
const redis = require('redis')
const productRoute = require('./routes/product.route.js')
const ingredientRoute = require('./routes/ingredient.route.js')

const app = express()

// Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Routes
app.use("/api/products", productRoute)
app.use("/api/ingredients", ingredientRoute)

app.get('/', (_, res) => {
    res.send("Welcome to ROBARATHON !")
})

const neo = async () => {
  
    // URI examples: 'neo4j://localhost', 'neo4j+s://xxx.databases.neo4j.io'
    const URI = process.env.URI_NEO
    const USER = process.env.USER_NEO
    const PASSWORD = process.env.PASSWORD_NEO
    let driver
    try {
      driver = neo4j.driver(URI,  neo4j.auth.basic(USER, PASSWORD))
      const serverInfo = await driver.getServerInfo()
      console.log('Connection estabilished to Neo4j.')
      // console.log(serverInfo)
    } catch(err) {
      console.log(`Connection error\n${err}\nCause: ${err.cause}`)
      await driver.close()
      return
    }
  
    // Use the driver to run queries
    await driver.close()
  }

neo()

try {
    const client = redis.createClient({
        password: process.env.PASSWORD_REDIS,
        socket: {
            host: process.env.HOST_REDIS,
            port: process.env.PORT_REDIS
        }
    });
    console.log("Redis connection established.")
    // console.log(client)
}
catch(err){
    console.log("Error connecting to Redis.")
}


mongoose.connect(process.env.URL_MONGO)
    .then(() => {
        console.log("Connected to Mongo database !")
        app.listen(process.env.PORT_MONGO, () => {
            console.log('Server is running on port', process.env.PORT_MONGO, "!")
        })
    })
    .catch(() => {
        console.log("Connexion failed !")
    })

