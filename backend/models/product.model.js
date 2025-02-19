import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});
const Product = mongoose.model('Product', productSchema);
// Product ka first letter large isliye dete mongoose lowercase change krdeta hai 
export default Product