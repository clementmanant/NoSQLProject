const express = require('express')
const mongoose = require('mongoose')
const productRoute = require('./routes/product.route.js')

const app = express()

// Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Routes
app.use("/api/products", productRoute)

app.get('/', (_, res) => {
    res.send("Welcome to ROBARATHON !")
})

mongoose.connect("mongodb+srv://robarathon_admin:robarathon_admin@robarathon.t8nwbum.mongodb.net/Robarathon?retryWrites=true&w=majority&appName=Robarathon")
    .then(() => {
        console.log("Connected to database !")
        app.listen(3000, () => {
            console.log('Server is running on port 3000')
        })
    })
    .catch(() => {
        console.log("Connexion failed !")
    })