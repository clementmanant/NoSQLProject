# Robarathon

## Membres
- LOPEZ Tao
- TORIBIO Alexis
- MANANT Clément

## Recettes
MongoDB Database

Classic CRUDs on Products collection and Ingredients collection

## Commandes
Redis

- Create or update basket
- Get basket by User
- Pop cocktail from Basket
- Send to Waiting List
- Get Waiting List
- Pop from Waiting List

## Recommandations
Neo4J

## Installation
- Install node
- Pull the git : https://github.com/clementmanant/NoSQLProject
- Go inside the folder you just cloned
- cd api
- ```npm i express mongodb mongoose dotenv redis```
- ```npm i nodemon -D```
ASK FOR .ENV
- Create .env in api folder and fill with : 
    - PORT_MONGO
    - URL_MONGO
    - PORT_REDIS
- ```npm run dev```

## To view DB inside
Not neccessary for the project to work
Create account http://mongodb.com/atlas (I have to give access to view)

Same
Connect to RedisInsight at 127.0.0.1:{PORT_REDIS} 

## Launch project
From Robarathon folder:

```cd api```

Launch API : 
```npm run dev```

```cd ..```

```cd app```

Launch application : 
```npm run serve```

You should see :

    Redis is ready !
    Connected to Mongo database !
    Server is running on port 3000 !

Test Mongo with http://localhost:3000/api/products and Redis with http://localhost:3000/api/redis/list

# Notes
Db mongo hébergée cloud mongoatlas...

Db redis hébergé local voir contenu avec l'app redisInsight 127.0.0.1:{PORT_REDIS}

npm run dev dans api et npm run serve dans app pour lancer le back puis le front

localhost:8080 pour accéder à l'app

Le robot a juste à taper sur la route api getWaitingList pour récupérer les cocktails à préparer