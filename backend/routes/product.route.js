import express from 'express';
import { createProduct, deleteProduct, getProducts, updatedProduct } from '../controllers/product.controller.js';

const router = express.Router();
router.post('/', createProduct )
  
  router.delete("/:id", deleteProduct)
  
  router.get("/", getProducts)
  
  router.put("/:id", updatedProduct )

export default router