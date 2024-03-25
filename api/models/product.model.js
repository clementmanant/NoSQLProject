const mongoose = require('mongoose')

const StepSchema = new mongoose.Schema({
    ingredient_id: String,
    quantity: Number,
    ordre: Number
});

const ProductSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter product name."],
        },
        quantity: {
            type: Number,
            required: true,
            default: 0,
        },
        price: {
            type: Number,
            required: true,
            default: 0,
        },
        image: {
            type: String,
            required: false,
        },
        available: {
            type: Boolean,
            required: true,
            default: true
        },
        steps: {
            type: [StepSchema], 
            required: [true, "Please enter the ingredients."]
        }
    },
    {
        timestamps: true
    }
)

const Product = mongoose.model("Products", ProductSchema)

module.exports = Product