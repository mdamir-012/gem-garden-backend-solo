const express = require("express");
const { productModel } = require("../models/product.model");

const productsController = express.Router();


// Getting data by category
productsController.get("/:category", async (req, res) => {
  const category = req.params.category;
  console.log(category);

  if (category === "Rings") {
    const product = await productModel.find({ category: "Rings" });
    console.log(product);
    res.send(product);
  } else if (category === "Earrings") {
    const item = await productModel.find({ category: "Earrings" });
    res.send(item);
    console.log(item);
  } else if (category === "Necklaces") {
    const item1 = await productModel.find({ category: "Necklaces" });
    res.send(item1);
  }
});


// here are all functionalities implemented on this route "/"
productsController.get("/", async (req, res) => {
  let { category, sortBy, order, pageSize, limit, brand, title, filter, q } = req.query;

  // getting data by search
  const search = q;
  if (search) {
    const regex = new RegExp(search, "i");

    const productData = await productModel.find({
      $or: [
        { title: regex },
        { brand: regex },
        { description: regex },
        { price: regex },
        { origPrice: regex },
        { category: regex },
      ],
    });

    res
      .status(200)
      .json({ status: "All your searched data", data: productData });
    console.log(productData);
  }

  // Pagination funcionality
  const skipDatas = (pageSize - 1) * limit;

  if (pageSize && limit && order && sortBy) {
    const product = await productModel
      .find()
      .skip(skipDatas)
      .limit(limit)
      .sort({ [sortBy]: order === "asc" ? 1 : -1 });

    res.json({ status: "here is limited products on page", data: product });

  }else if (pageSize && limit) {  //   pagination with limit
    const products = await productModel.find().skip(skipDatas).limit(limit)
    res.json({status:"success",data:products})

  }else if(category && sortBy && order){ 
   const products= await productModel.find({category:category}).sort({[sortBy]:order === "asc" ? 1:-1})
   console.log(products)
   console.log(req.query)
   res.json({status:"sorted data by category",data:products})

  }else if(title && sortBy && order){
    const products= await productModel.find({title:title}).sort({[sortBy]:order === "asc"?1:-1})
    res.json({status:"sorted data by title",data:products})

  }else if (brand && order && sortBy) {
    if (order === "asc") {
    const  products = await productModel.find({ brand: brand }).sort({
        [sortBy]: 1,
      });
      return res.json({ status: "success", data: products });
    }else if(order === "desc"){
      products = await productModel.find({ brand: brand }).sort({
        [sortBy]: -1,
      });
      return res.json({ status: "success", data: products });
    }
  }

  if (sortBy === "price" && order === "asc") {
   const  products = await productModel.find().sort({ price: 1 });
    return res.json({ products });
  } else if (sortBy === "price" && order === "desc") {
    products = await productModel.find().sort({ price: -1 });
    return res.json({ products });
  } else if (category) {
   const  products = await productModel.find({ category: category });
    return res.json({ status: "sorted by category products", data: products });
  } else if (brand) {
   const  products = await productModel.find({ brand: brand });
    return res.json({ status: "sorted by brand products", data: products });
  } else if (title) {
   const  products = await productModel.find({ title: title });
    return res.json({ status: "sorted by title products", data: products });
  } else {
   const products = await productModel.find();
    return res.json({ status: "All products", data: products });
  }

});



module.exports = { productsController };
