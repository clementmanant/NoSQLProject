const redis = require('redis');
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

const getWaitingList = async (_, res) => {
    
    try {
        const value = await client.lRange("file_attente", 0, -1)

        const combinedJSON = `[${value.join(',')}]`;
        const parsedJSON = JSON.parse(combinedJSON);
        
        res.status(200).json(parsedJSON);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
    
}

const sendToWaitingList = async (req, res) => {
    try {
        const jsonData = req.body;

        if (!jsonData.user_id || !Array.isArray(jsonData.cocktails)) {
            return res.status(400).send('Le JSON doit contenir un user_id et un tableau de cocktails');
        }

        jsonData.cocktails.forEach(cocktail => {
            client.rPush('file_attente', JSON.stringify({ user_id: jsonData.user_id, cocktail }));
        });

        client.del(jsonData.user_id + ' Basket');

        res.status(200).send('Les cocktails ont été ajoutés à la liste d\'attente avec succès.');
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const popFromWaitingList = async (_, res) => {
    try {
        const cocktailPrep = await client.lPop("file_attente")
        res.status(200).json(JSON.parse(cocktailPrep));
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const getBasketByUserId = async (req, res) => {
    try {
        const userId = req.params.id;

        const actualBasket = await client.hGet(userId + ' Basket', 'cocktails')

        res.status(200).json({user_id: userId, cocktails: JSON.parse(actualBasket)});
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const modifyBasket = async (req, res) => {
    try {
        const userId = req.params.id;
        const data = req.body;

        const actualBasket = await client.hGet(userId + ' Basket', 'cocktails')
        const cocktails = actualBasket ? JSON.parse(actualBasket) : [];
        cocktails.push(data);

        client.hSet(userId + ' Basket', {
            user_id: userId,
            cocktails: JSON.stringify(cocktails)
        });
        res.status(200).json({user_id: userId, cocktails: cocktails});
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const popCocktailFromBasket = async (req, res) => {
    try {
        const userId = req.params.id;
        const cocktailId = req.params.cocktailId;

        const actualBasket = await client.hGet(userId + ' Basket', 'cocktails');
        if (!actualBasket) {
            return res.status(404).json({ message: 'Panier introuvable pour l\'utilisateur' });
        }

        let cocktails = JSON.parse(actualBasket);
        const indexToRemove = cocktails.findIndex(cocktail => cocktail._id === cocktailId);
        if (indexToRemove === -1) {
            return res.status(404).json({ message: 'Cocktail introuvable dans le panier' });
        }

        cocktails.splice(indexToRemove, 1);

        client.hSet(userId + ' Basket', 'cocktails', JSON.stringify(cocktails));
        res.status(200).json({ message: 'Cocktail supprimé avec succès', cocktails });
    } catch (error) {
        console.error('Erreur lors de la requête:', error);
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getWaitingList,
    sendToWaitingList,
    popFromWaitingList,
    getBasketByUserId,
    modifyBasket,
    popCocktailFromBasket
}