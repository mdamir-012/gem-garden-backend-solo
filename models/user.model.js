const mongoose = require("mongoose");

const userSchema= new mongoose.Schema({
    name: {type:String, required:true},
    email: {type:String, required:true},
    password: {type:String, required:true},
    
})

const userPersonalInfoSchema= new mongoose.Schema({
    firstName: {type:String, required:true},
    lastName: {type:String, required:true},
    email: {type: String, required:true},
    phone: {type:String, required:true},
    city: {type:String, required:true},
    state: {type:String, required:true},
    pincode: {type:String, required: true},
    userId: {type:String, required:true}
})

const userModel= mongoose.model("user",userSchema)

const userInfoModel= mongoose.model("userInfo", userPersonalInfoSchema);

module.exports= {userModel,userInfoModel}