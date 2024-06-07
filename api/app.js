require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const productRoute = require('./routes/product.route.js')
const ingredientRoute = require('./routes/ingredient.route.js')
const redisRoute = require('./routes/redis.route.js')

const app = express()

// Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors());

// Routes
app.use("/api/products", productRoute)
app.use("/api/ingredients", ingredientRoute)
app.use("/api/redis", redisRoute)

app.get('/', (_, res) => {
    res.send("Welcome to ROBARATHON !")
})

// Mongo connexion
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
