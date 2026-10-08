const express = require('express')
const Post = require('../models/Post')
const router = express.Router()

router.get('/', async (req, res)=> {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
})

router.post('/', async (req, res)=> {
    const {title, content} = req.body;
    // Creates an instance of Post and save it in db in one step
    const newPost = await Post.create({title, content});
    // await newPost.save();
    res.json(newPost);
})

router.delete('/', async(req, res)=>{
    try{
        const {id} = req.body;
        const result = await Post.findByIdAndDelete(id)
        if(!result){
           return res.status(404).send({message: "Post not Found"});
        }
        res.status(200).send({message: "Post Deleted Successfully"})
    }catch(err){
        res.status(500).send({message: err.message})
    }
})

router.put('/', async(req, res)=> {
    try{
        const{id, title, content} = req.body;
        const updatePost = await Post.findByIdAndUpdate(
            id,
            {title, content},
            {new:true}
        )
        if(!updatePost){
            return res.status(404).send({message: "Post not found"});
        }
        res.status(200).send({message: "Post Updated Successfully"});
    }catch(err){
       res.status(500).send({message: err.message})
    }
})

module.exports = router