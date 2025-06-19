import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    productImage: {
        type: String
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    latestProduct: {
        type: Boolean,
        default: false
    },
})

const Products = mongoose.models.Products || mongoose.model("Products", ProductSchema)
export default Products