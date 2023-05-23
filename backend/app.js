const express=require('express');
const bodyParser=require('body-parser');


const postsRoutes=require("./routes/posts");

const mongoose=require('mongoose');

const app=express();
                                                                                            // name of db
mongoose.connect("mongodb+srv://mayankshoppin21:MPeBvjoXKAgvUf3r@cluster0.ga4oz41.mongodb.net/node-angular?retryWrites=true&w=majority").then(
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


app.use("/api/posts",postsRoutes);

// app.listen(3000,()=>{
//     console.log('server running on port 3000');
// });

module.exports=app;