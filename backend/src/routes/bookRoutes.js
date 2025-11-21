import express, { json } from "express";
import cloudinary from "../../lib/cloudinary.js"
import Book from "../models/Book.js";
import protectRoute from "../../lib/middleware/protectRoute.js";

const router = express.Router();

//create book
router.post("/", protectRoute, async(req,res)=>{
    try{
        const {title, caption, rating, image}=req.body;

        if(!title || !caption || !rating || !image){
            return res.status(400).json({message:"Please provide all fields"});
        }
        const uploadResponse = await cloudinary.uploader.upload(image);
        const imageUrl = uploadResponse.secure_url

        const newBook = new Book({
            title,
            caption,
            rating,
            image: imageUrl,
        });

        await newBook.save();
        res.status(200).json(newBook);

    }catch(error){
        console.log("Error creating book",error);
        res.status(500).json({message: error.message});
    }
});

//pagination for books
router.get("/", async (req, res)=>{
    try{
    const page = req.query.page || 1;
    const limit = req.query.limit || 5;
    const skip = (page - 1) * limit;
    const books = await Book.find().sort({ createdAt: -1 }).skip(skip).limit(limit).populate("user", "username profileImage");
    totalBooks = Book.countDocuments();
    
    res.send({
        books,
        currentPage: page,
        totalBooks,
        totalPages: Math.ceil(totalBooks / limit),
    });


}catch(error){
        console.log("Error in fetching books", error);
      return  res.status(500).json({message: "Internal Server Error"});
    }
});

//delete book
router.delete("/:id",async (req, res)=>{
    try{

     const book = await Book.findById(req.params.id);
     if(!book){
      return  res.status(404).json({message: "Book not found"});
     }

     if(book.user.toString() !== req.user._id.toString())
        return res.status(401).json({message: "Unauthorized"});


     if(book.image && book.image.includes("cloudinary")){
        try{
        
            const publicId = book.image.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy(publicId);
        }catch(error){
            console.log("Error in deleting image from cloudinary")
        }
     }

     await book.deleteOne();

    }catch(error){
    console.log("Error deleting book",error);
    res.status(500),json({message: "Internal Server Error"});
    }
});

//books recommendations
router.get("/user",protectRoute,async (req,res)=>{
    try{
        const books = await Book.find({user:req.user._id}).sort({createdAt: -1});
        res.json(books);

    }catch(error){
        console.log("Error in fetching recommendations",error);
        res.status(500).json({message:"Internal Server Error"});
    }
});




export default router;