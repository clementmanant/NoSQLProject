const express = require('express')
const { 
    getWaitingList,
    sendToWaitingList,
    popFromWaitingList,
    getBasketByUserId,
    modifyBasket,
    popCocktailFromBasket
} = require('../controllers/redis.controller.js')

const router = express.Router()

router.get('/list', getWaitingList)
router.post('/list', sendToWaitingList)
router.put('/list', popFromWaitingList)

router.get('/basket/:id', getBasketByUserId)
router.post('/basket/:id', modifyBasket)
router.put('/basket/:id/:cocktailId', popCocktailFromBasket)

module.exports = router