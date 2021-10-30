const express = require("express");
const { 
    addProduct, updateProductStatus, getUserProducts, getAllProducts
 } = require("../controllers/ProductController");
const router = express.Router();

router.post('/add', addProduct)
router.put('/update',updateProductStatus)
router.get('/user',getUserProducts)
router.get('/',getAllProducts)

module.exports = router;
