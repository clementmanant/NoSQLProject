const express = require('express')
const { 
    getIngredients, 
    getIngredient,
    createIngredient,
    updateIngredient,
    deleteIngredient
} = require('../controllers/ingredient.controller.js')

const router = express.Router()

router.get('/', getIngredients)
router.get('/:id', getIngredient)
router.post('/', createIngredient)
router.put('/:id', updateIngredient)
router.delete('/:id', deleteIngredient)

module.exports = router