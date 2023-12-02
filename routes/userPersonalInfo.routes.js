const express = require("express");
const {userInfoModel} = require("../models/user.model")
require("dotenv").config()


const userInfoController = express.Router()

userInfoController.get("/", async(req,res)=>{
    const {userId} = req.body;

    const userInfo= await userInfoModel.find({userId: userId})
    res.status(200).json({userdata: userInfo})

    
})


userInfoController.post("/create", async(req,res)=>{
    const {firstName,lastName,email,phone,city,state,pincode,userId} = req.body;

    const userinfoAdded = new userInfoModel({firstName,lastName,email,phone,city,state,pincode,userId})

    try{
        await userinfoAdded.save()
        res.status(200).json({message:"created",createdData:userinfoAdded})

    }
    catch(err){
        console.log(err)
        res.send("something went wrong")
    }
})


userInfoController.delete("/delete/:id", async(req,res)=>{
    const {id} = req.params;
    const {userId} = req.body;
    const deletedData = await userInfoModel.findOneAndDelete({_id:id, userId:userId})
    if(deletedData){
        res.send("deleted", deletedData)
    }else{
        res.send("couldn't delete")
    }
    
})


userInfoController.patch("/edit/:id", async(req,res)=>{
    const {id} =req.params;

    const editUserInfo = await userInfoModel.findOneAndUpdate({_id: id , userId:req.body.userId}, ...req.body)
    if(editUserInfo){
        res.send("edited", editUserInfo)
    }else{
        res.send("couldn't edit")
    }

})
module.exports = {userInfoController}