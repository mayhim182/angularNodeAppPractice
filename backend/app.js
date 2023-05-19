const express=require('express');
const bodyParser=require('body-parser');
const Post=require('./models/post');
const mongoose=require('mongoose');

const app=express();

mongoose.connect("mongodb+srv://mayankshoppin21:EbRJFh3FxNODirwh@cluster0.ga4oz41.mongodb.net/?retryWrites=true&w=majority").then(
    ()=>{
        console.log("Connected to Database!");
    }
).catch(    
    ()=>{
        console.log("Connection Failed");
    }
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, PATCH, DELETE, OPTIONS"
    )
    next();
});

app.post("api/posts",(req,res,next)=>{
    // const post=req.body;
    const post=new Post({
        title:req.body.title,
        content:req.body.content
    });
    console.log(post);
    res.status(201).json({
        message:'Post added successfully',
    });
});

app.use('/api/posts',(req,res,next)=>{
    const posts = [
        {
            id:'fadf1241l',
            title:'First server side code',
            content:'This is coming from the server'
        }
    ];
    res.status(200).json({
        message:'Posts fetched successfully!',
        posts:posts
    });
})

module.exports=app;