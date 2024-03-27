# NoSQLProject / Barathon

## Membres
- LOPEZ Tao
- TORIBIO Alexis
- CROIZET Rémy
- FEUGNET Théo
- MANANT Clément

## Recettes
With MongoDB

Classic CRUDs on Products collection and Ingredients collection

- Mojito
- Long Island
- Tequila Sunrise
- Sex on the Beach
- Rhum coca
- Daiquiri
- Gin Tonic

## Commandes
Redis

Create or update basket
Get basket by User
Pop cocktail from Basket
Send to Waiting List
Get Waiting List
Pop from Waiting List

## Recommandations
Neo4J

## Installation
Install node
Pull the git : https://github.com/clementmanant/NoSQLProject
Go inside the folder you just cloned
cd api
npm i express mongodb mongoose dotenv redis
npm i nodemon -D
docker compose up
Create .env in api folder and fill with : 
- PORT_MONGO
- URL_MONGO
- PORT_REDIS
npm run dev

## To view DB inside
Create account http://mongodb.com/atlas (I have to give access to view)
Connect to RedisInsight at 127.0.0.1:6379 

## Launch project
npm run dev

You should see :

    Redis is ready !
    Connected to Mongo database !
    Server is running on port 3000 !

Test Mongo with http://localhost:3000/api/products and http://localhost:3000/api/redis/list
