import axios from "axios";
import { compile } from "ejs";
import express from "express";

const app = express();


app.listen(4000,()=>{
    console.log("Server Running Successfully");
})

app.get("/", async (req,res)=>{
    const response = await axios.get("http://localhost:3000/");
    console.log(response.data)
})