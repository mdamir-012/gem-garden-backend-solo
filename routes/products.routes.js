const express = require("express");
const { productModel } = require("../models/product.model");

const productsController =express.Router();


productsController.get("/search/:key", async(req,res)=>{
    const mydata= await productModel.find({
        "$or":[
            {brand:{$regex:req.params.key}}
        ]
    })
   console.log(req.query)
    res.status(200).json(mydata)

})


productsController.get("/:category", async(req,res)=>{
    const category= req.params.category;
    console.log(category)

    if(category==="Rings"){
       const product= await productModel.find({category: "Rings"})
        console.log(product)
        res.send(product)
    }else if(category==="Earrings"){
      const item= await productModel.find({category: "Earrings"})
      res.send(item)
       console.log(item)
    }else if(category==="Necklaces"){
        const item1 =await productModel.find({category: "Necklaces"})
        res.send(item1)
    }
})

module.exports= {productsController}