# NoSQLProject / Barathon

## Membres
- LOPEZ Tao
- TORIBIO Alexis
- CROIZET Rémy
- FEUGNET Théo
- MANANT Clément

## Recettes
With MongoDB

- Mojito
- Long Island
- Tequila Sunrise
- Sex on the Beach
- Rhum coca
- Daiquiri
- Gin Tonic

## Commandes
Redis

Basket
Waiting list

## Recommandations
Neo4J

## Installation
Install node
Pull the git : https://github.com/clementmanant/NoSQLProject
cd api
npm i express mongodb mongoose dotenv redis neo4j-driver
npm i nodemon -D
docker compose up
Create .env and fill : 
- PORT_MONGO
- URL_MONGO
- HOST_REDIS
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
