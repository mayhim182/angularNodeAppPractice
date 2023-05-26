const express = require("express");

const router = express.Router();
const Post = require('../models/post');
const multer = require("multer");

const MIME_TYPE_MAP = {
    'images/png':'png',
    'images/jpeg':'jpg',
    'images/jpg':'jpg'
}

const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid mime type");
        if(isValid){
            error=null;
        }
        cb(error,"backend/images");
    },
    filename:(req, file, cb)=>{
        const name=file.originalname.toLowerCase().split(' ').join.call('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + '_' +Date.now() +'.' +ext);
    }
});



router.post("",multer(storage).single("image") ,(req,res,next)=>{
    const post=new Post({
        title:req.body.title,
        content:req.body.content
    });
    post.save().then((result)=>{
        res.status(201).json({
            message:"Post added successfully",
            postId:result._id
        })
    });
    console.log(post);
});


router.put("/:id",(req,res,next)=>{
    const post = new Post({
        _id:req.body.id,
        title:req.body.title,
        content:req.body.content
    });
    Post.updateOne({_id:req.params.id},post).then(result=>{
        console.log(result);
        res.status(200).json({message:"updated successfully!"});
    });
});

router.get("",(req,res,next)=>{
    Post.find().then(
        documents=>{
            res.status(200).json({
                message:'Posts fetched successfully!',
                posts:documents
            });
        }
    ).catch(
        error=>{
            console.log(error);
        }
    );
});

router.get("/:id",(req,res,next)=>{
   Post.findById(req.params.id).then(
    (post)=>{
        if(post){
            res.status(200).json(post);
        }else{
            res.status(404).json({message:"Post not found"});
        }
    }
   )
});


router.delete("/:id",(req,res,next)=>{
    console.log(req.params.id);
    Post.deleteOne({_id:req.params.id}).then((result)=>{
        console.log(result);
    });
    res.status(200).json({message:"Post Deleted"});
})

module.exports=router;