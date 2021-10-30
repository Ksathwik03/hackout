const Product = require("../models/Product");
const User = require("../models/user");

exports.addProduct = async(req,res) => {
    try{
        const token = req.headers["x-access-token"];
        const {product_name,product_link} = req.body
        const user = await User.findOne({'token': token})
        if(!user){
            return res.json({
                stats: 400,
                sucess: false,
                message: "Auth token required"
            })
        }
        const product = new Product({
            userId: user._id,
            product_name : product_name,
            product_link: product_link,
            dealStatus: "reviewing",
        })
        await product.save()
        return res.json({
            stats: 200,
            sucess: "Successfully created"
        }) 
    }
    catch(err){
        return res.json({
            stats: 400,
            sucess: false,
            message: `some error ${err}`
        
        }) 
    }
}

exports.updateProductStatus = async(req,res) => {
    try{
        const token = req.headers["x-access-token"];
        const {dealStatus} = req.body
        const user = await User.findOne({'token': token})
        if(!user || !(user.admin)){
            return res.json({
                stats: 400,
                sucess: false,
                message: "Auth token required"
            })
        }
        const product = await Product.findOne({'_id': req.params.pid})
        await product.save()
        return res.json({
            stats: 200,
            sucess: "Successfully updated"
        }) 
    }
    catch(err){
        return res.json({
            stats: 400,
            sucess: false,
            message: `some error ${err}`
        
        }) 
    }
}

exports.getUserProducts = async(req,res) => {
    try{
        const token = req.headers["x-access-token"];
        const user = await User.findOne({'token': token})
        if(!user || !(user.admin)){
            return res.json({
                stats: 400,
                sucess: false,
                message: "Auth token required"
            })
        }
        let products = await Product.find({'userId': user._id})
        return res.json({
            stats: 200,
            sucess: "Successfully found user products",
            products: products
        }) 
    }
    catch(err){
        return res.json({
            stats: 400,
            sucess: false,
            message: `some error ${err}`
        }) 
    }
}

