import express from "express";
import fs from "fs";
import bodyParser from "body-parser";
const app = express();
var blogs=[];
const saveDataToFile = (data) => {
    fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
  };
  // Read data from a JSON file
const getDataFromFile = () => {
    try {
      const rawData = fs.readFileSync('data.json');
      return JSON.parse(rawData);
    } catch (err) {
      return [];
    }
  };
  
app.use(bodyParser.urlencoded({extended:true}))
app.listen(3000,(req,res)=>{
    console.log("Server Running Successfully");
})

app.get("/",(req,res)=>{
    const random = Math.floor(Math.random()*blogs.length);
    console.log(blogs)
    res.json(blogs[random])
})
//Posting APi
app.post("/blogs",(req,res)=>{
    blogs=getDataFromFile();
    var identity = blogs.length+1;
    const authordata = req.body.author;
    const textdata = req.body.text;
    var temp=0;
    for(var i =0; i<blogs.length;i++)
    {    var temp1= temp;
        var temp = blogs[i].id;
        

if(blogs[i].id!=i+1)
{ 
    
    var diff=temp-temp1;
    var number = (temp-diff)+1
    
        identity=number;

    console.log("temp1"+temp1 + "temp"+temp + "diff"+diff + "number"+number);
    break;
}
    }

    const newblog = {id:identity,
        author:authordata,
        text:textdata

    }

    blogs.push(newblog);
    blogs.sort(function(a, b){return a.id - b.id});
saveDataToFile(blogs);
console.log(blogs.length)
    res.json(newblog);


})



 app.put("/blog/:id",(req,res)=>{
    blogs=getDataFromFile();
    const identity=parseInt(req.params.id);
    const update={
        id:identity,
        author:req.body.author,
        text:req.body.text
    }
    console.log(blogs);
    const blogidentity = blogs.findIndex(blog => blog.id=identity);
    

    blogs[blogidentity]=update;
    saveDataToFile(blogs);
    res.json(blogs[blogidentity]);
 })


 app.patch("/blog/:id",(req,res)=>{
    blogs=getDataFromFile();
    const identity=parseInt(req.params.id);
    

    const blogidentity = blogs.findIndex(blog => blog.id=identity);
    const authordata = req.body.author||blogs[blogidentity].author;
    const textdata =req.body.text||blogs[blogidentity].text;
    const update={
        id:identity,
        author:authordata,
        text:textdata
    }
    blogs[blogidentity]=update;
    saveDataToFile(blogs);
    res.json(blogs[blogidentity]);
 })
 app.delete("/blog/:id",(req,res)=>{
    blogs=getDataFromFile();
    const identity=parseInt(req.params.id);
    

    const blogidentity = blogs.findIndex(blog => blog.id=identity);
   
    blogs.splice(blogs[blogidentity],1)
    saveDataToFile(blogs);
    res.json(blogs[blogidentity]);
 })
// var blogs=[{id:1,author:"moon",text:"hello"},];