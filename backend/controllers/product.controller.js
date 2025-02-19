import Product from "../models/product.model.js";
import mongoose from 'mongoose';

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ success: true, data: products })
    } catch (error) {
        console.log("Error in fetching product:", error.message)
        res.status(500).json({ success: false, message: "Server Error" })
    }
}
export const createProduct = async (req, res) => {
    // req.body means jo user ki req hit hogi body main
    const product = req.body;
    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: "Please Provide all the fields" })
    }
    const newProduct = new Product(product);
    try {
        await newProduct.save();
        return res.status(200).json({ success: true, data: newProduct })
    } catch (error) {
        console.error('Error in Create products:', error.message);
        return res.status(500).json({ sucess: false, message: 'Server Error' })
    }
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid product id" })
    }

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product Delete" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Product not found" })
    }
}

export const updatedProduct = async (req, res) => {
    const { id } = req.params;
    const product = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid product id" })
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
        res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        res.status(500).json({ success: true, message: "Server Error" })
    }
}