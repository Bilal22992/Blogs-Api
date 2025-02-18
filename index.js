import axios from "axios";
import bodyParser from "body-parser";
import { compile } from "ejs";
import express from "express";

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.listen(4000,()=>{
    console.log("Server Running Successfully");
})

// app.get("/", async (req,res)=>{
//     const response = await axios.get("http://localhost:3000/");
//     console.log(response.data)
//     res.render("index.ejs",{data:response.data})
// })
app.get("/", async (req,res)=>{
    const response = await axios.get("http://localhost:3000/");
    // console.log(response.data)
    res.render("index.ejs",{data:response.data})
})

app.post("/delete/:id", async (req,res)=>{
    const identity = parseInt(req.params.id);
    console.log(identity);
    const response = await axios.delete(`http://localhost:3000/blog/${identity}`);
    console.log(response.data)
    res.redirect("/")


})
app.post("/edit/:id", async (req,res)=>{
    const identity = parseInt(req.params.id);
    // console.log(identity);
    const response = await axios.get(`http://localhost:3000/${identity}`);
    console.log(response.data)
    res.render("post.ejs",{res:response.data})


})

app.post("/update/:id", async(req,res)=>{

    try {
        const identity = parseInt(req.params.id);
        const iauthor = req.body.author;
        const itext = req.body.text;
        console.log(identity+iauthor+itext);
        const response = await axios.put(`http://localhost:3000/blog/${identity}`,{author:iauthor,text:itext},{
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }});
        console.log(response.data)
    console.log(req.body.author+req.body.text);
        res.redirect("/")
    } catch (error) {
        console.log(error.message)
    }
   
})