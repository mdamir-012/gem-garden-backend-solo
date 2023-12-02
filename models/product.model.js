const mongoose = require("mongoose");

const productSchema= mongoose.Schema({
    brand : {type:String, required:true},
    title: {type:String , required:true},
    description: {type:String, required:true},
    price: {type:String},
    origPrice: {type:String,required:true},
    img1: {type:String,required:true},
    img2: {type:String,required:true},
    img3: {type:String,required:true},
    img4: {type:String,required:true},
    img5: {type:String,required:true},
    category:{type:String,required:true,enum:["Rings","Earrings","Necklaces"]},
    userId: {type:String, required:true}

})

const productModel= mongoose.model("data",productSchema);

module.exports= {productModel}

