import express from "express";

const app = express();

app.listen(3000,(req,res)=>{
    console.log("Server Running Successfully");
})

app.get("/",(req,res)=>{
    const random = Math.floor(Math.random()*blogs.length());
    res.json(blogs[random])
})

const blogs=[{id:1,author:"Moon",text:"hello"}]