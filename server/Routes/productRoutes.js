const express = require("express");
const { 
    addProduct, updateProductStatus
 } = require("../controllers/ProductController");
const router = express.Router();

router.post('/addProduct', addProduct)
router.put('/updateProduct',updateProductStatus)
router.get('/',getAllProducts)
