import express from 'express';
import cors from 'cors';
import Mongoose from 'mongoose';
import dotenv from 'dotenv';
import Note from './models/model.js';
dotenv.config();

const app=express();
app.use(cors());
app.use(express.json());


const connectDB= async()=>{
  await Mongoose.connect(process.env.MONGODB_URL)
  console.log("Database Connected!!")
}
connectDB();

 const PORT=process.env.PORT||5000;
 


app.get("/health", (req,res)=>{
    res.json({
       sucess:true,
       message:"Server is running",
       data:null

    })
});



app.post("/notes" , async(req,res)=>{
    const{title,content, category}=req.body;


    if(!title){
        return res.json({
            success:false,
            message:"Title is required",
            data:null
        })
    }

    if(!content){
        return res.json({
            success:false,
            message:"Content is required",
            data:null
        })
    }

    if(!category){
        return res.json({
            success:false,
            message:"Category is required",
            data:null
        })
    }

   const newNote=await Note.create({
        "title":title,
        "content":content,
        "category":category
    })
    res.json({
        sucess:true,
        message:" Notes added successfully ",
        data:newNote
    })
})

app.get("/notes", async(req,res)=>{

    const notes=await Note.findOne();
    res.json({
        sucess:true,
        message:"Notes fetched successfully",
        data:notes
    })
})

app.get("/notes/:id", async(req,res)=>{
    const {id}= req.params;
   

    const note= await Note.findById(id);
    res.json({
        success:true,
        content:"Data fatched successfully",
        data:null
    })
})


app.put("/notes/:id", async (req,res)=>{
    const {id}=req.params;

    const{title, content, category}=req.body;

    await Note.updateOne({_id:id},{$set: {
        title:title,
        content:content,
        category:category
    }})

    app.delete("/notes/:id", async(req,res)=>{
          const {id}=req.params;

          await Note.deleteOne({ _id:id })


          res.json({
            sucess:true,
            message:"Data deleted successfully",
            data:null
          })
    })

    res.json({
        sucess:true,
        message:"Data Update successfully",
        data:null
    })

})
 app.listen(PORT, ()=>{
    console.log(`Server is running on port : ${PORT}`);
 });