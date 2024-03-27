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

const client = redis.createClient(process.env.PORT_REDIS);

(async ()=> {
    client.on('error', (err) => {
        console.log("Redis connexion error.", err)
    })

    client.on('ready', () => console.log("Redis is ready !"))

    await client.connect()
    await client.ping()
    
    }
)();

app.get('/api/redis/test', async () => {
    const test = await client.set('key', 'value');
    const value = await client.get('key');
})

app.post('/api/redis/list', async (req, res) => {
    try {
        const jsonData = req.body;

        if (!jsonData.user_id || !Array.isArray(jsonData.cocktails)) {
            return res.status(400).send('Le JSON doit contenir un user_id et un tableau de cocktails');
        }

        jsonData.cocktails.forEach(cocktail => {
            client.rPush('file_attente', JSON.stringify({ user_id: jsonData.user_id, cocktail }), (err) => {
                if (err) {
                    console.error('Erreur lors de l\'ajout à la liste d\'attente :', err);
                } else {
                    console.log('Cocktail ajouté à la liste d\'attente :', cocktail.name);
                }
            });
        });

        res.status(200).send('Les cocktails ont été ajoutés à la liste d\'attente avec succès.');
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get('/api/redis/list', async (_, res) => {
    
    try {
        const value = await client.lRange("file_attente", 0, -1)
        res.status(200).json(value);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
    
});

app.put('/api/redis/list', async (_, res) => {
    try {
        const cocktailPrep = await client.lPop("file_attente")
        res.status(200).json(cocktailPrep);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

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

/*
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
*/