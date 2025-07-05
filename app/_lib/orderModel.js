import mongoose, { mongo } from "mongoose";

const orderSchema = new mongoose.Schema({
    products: {
        type: Array,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },    
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },
    payment: {
        type: Boolean,
        default: false,
    },
    date: {
        type: Number,
        required: true
    },
  
    status: { type: String, default: 'Order Placed' }

})

const Order = mongoose.models.order || mongoose.model("order", orderSchema)

export default Order