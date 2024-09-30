import mongoose from "mongoose";
const Schema = mongoose.Schema;

const sellerSchema = new Schema({ 
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    }, 
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
    }, 
    donationType: {
        type: String,
        required: true,
    }, 
    donationAmount: {
        type: Number,
        required: true,
        min: 0,
    }, 
    contact: {
        type: String,
        required: true,
    }, 
    email: {
        type: String,
        required: true,
    }, 
    products: [
        {
            type: String,
            required: true,
        }
    ], 
    ngoList: [
        {
        type: String,
        required: true,
    }
] ,
image: {
    type: String,
    required: true,
},
});

const Seller = mongoose.model("Seller", sellerSchema);
export default Seller;