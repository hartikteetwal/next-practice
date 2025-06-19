const { default: mongoose } = require("mongoose");


const restaurantModel = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    city: String,
    address: String,
    contact:String
})

export const restaurantSchema = mongoose.models.restaurant || mongoose.model("restaurant", restaurantModel)   



