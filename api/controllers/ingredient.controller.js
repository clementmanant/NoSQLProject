const Ingredient = require('../models/ingredient.model.js')

const getIngredients = async (_, res) => {
    try {
        const ingredients = await Ingredient.find({})
        res.status(200).json(ingredients)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const getIngredient = async (req, res) => {
    try {
        const { id } = req.params
        const ingredient = await Ingredient.findById(id)
        res.status(200).json(ingredient)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const createIngredient = async (req, res) => {
    try {
        const ingredient = await Ingredient.create(req.body)
        res.status(200).json(ingredient)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const updateIngredient = async (req, res) => {
    try {
        const { id } = req.params
        const ingredient = await Ingredient.findByIdAndUpdate(id, req.body)

        if (!ingredient) {
            return res.status(404).json({message: "Ingredient not found !"})
        }

        const updatedIngredient = await Ingredient.findById(id)

        res.status(200).json(updatedIngredient)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const deleteIngredient = async (req, res) => {
    try {
        const { id } = req.params
        const ingredient = await Ingredient.findByIdAndDelete(id)

        if (!ingredient) {
            return res.status(404).json({message: "Ingredient not found !"})
        }

        res.status(200).json(ingredient)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
    
module.exports = {
    getIngredients, 
    getIngredient,
    createIngredient,
    updateIngredient,
    deleteIngredient
}