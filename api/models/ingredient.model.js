const mongoose = require('mongoose')

const IngredientSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter product name."],
        },
    },
    {
        timestamps: true
    }
)

const Ingredient = mongoose.model("Ingredients", IngredientSchema)

module.exports = Ingredient