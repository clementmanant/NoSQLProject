# NoSQLProject

Bar commande

Recettes : relationnelle/document?
Attente commande : redis? Un user = un panier = 1 ou plus commande
Recommandation : neo4j

Optionnelle : Modification recettes => à stocker quelque part si un client veut pas de glaçon/citron/etc…

## Recettes
Mojito
Margarita
Cosmopolitan
Martini
Daiquiri
Pina Colada
Mai Tai
Long Island Iced Tea
Bloody Mary
Old Fashioned
Manhattan
Negroni
Moscow Mule
Gin and Tonic
Whiskey Sour
Tequila Sunrise
Sangria
Sex on the Beach
Blue Lagoon
White Russian
Piña Colada
Hurricane
Mint Julep
Bellini
French 75
Singapore Sling
Paloma
Dark 'n' Stormy
Cuba Libre
Zombie
Tom Collins
Mojito
White Lady
Caipirinha
Irish Coffee
Mojito
Bellini
Sazerac
Mimosa
Screwdriver



## Commandes
Redis

## Recommandations
Neo4J

## Installation
Pull the git : https://github.com/clementmanant/NoSQLProject
Install node
cd api
npm i express mongodb mongoose dotenv redis neo4j-driver
npm i nodemon -D
Create account http://mongodb.com/atlas (I have to give access to view)
Same for Redis and Neo4j

## Launch project
cd api
Create .env and fill : 
- PORT_MONGO
- URL_MONGO
- PASSWORD_REDIS
- HOST_REDIS
- PORT_REDIS
- URI_NEO
- USER_NEO
- PASSWORD_NEO

npm run dev

You should see :

    Redis connection established.
    Connection estabilished to Neo4j.
    Connected to Mongo database !
    Server is running on port 3000 ! 

Test Mongo with http://localhost:3000 and http://localhost:3000/api/products 

## TODOS
UML Mongo
Mongo API on all collections
Redis API
Neo4J API