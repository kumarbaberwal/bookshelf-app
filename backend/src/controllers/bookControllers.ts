import { Request, Response } from "express";
import cloudinary from "../utils/cloudinary";
import { Book } from "../models/book";

export const bookController = async (req: Request, res: Response): Promise<any> => {
    try {
        const { title, caption, rating, image } = req.body;

        if (!title || !caption || !rating || !image) {
            return res.status(400).json({
                message: 'Please provide all fields',
            });
        }

        // upload the image to cloudinary

        const uploadResponse = await cloudinary.uploader.upload(image);

        // get the image url from the cloudinary

        const imageUrl = uploadResponse.secure_url;


        // save this to the mongodb
        const newBook = new Book({
            title: title,
            caption: caption,
            rating: rating,
            image: imageUrl,
            user: req.user.userId,
        });

        await newBook.save();

        res.status(201).json(newBook);
    } catch (error) {
        console.log('Error creating book: ', error);
        res.status(500).json({
            message: "Error creating book",
        })
    }
}

// pagination => infinite scrolling
// first 5 books => then 5 books => then 5 books
const getAllBooks = async (req: Request, res: Response): Promise<any> => {
    try {
        const page = parseInt(req.query.page as string, 10) || 1;
        const limit = parseInt(req.query.limit as string, 10) || 5;
        const skip = (page - 1) * limit;
        const books = await Book.find()
            .sort({ createdAt: -1 })  // Sort books in descending order by creation date
            .skip(skip)               // Skip over a number of documents (for pagination)
            .limit(limit)             // Limit the number of documents returned
            .populate('user', 'username profileImage');  // Populate 'user' field with specific user fields ('username', 'profileImage')

        const totalBooks = await Book.countDocuments();

        res.status(200).json({
            books,
            currentPage: page,
            totalBooks,
            totalPages: Math.ceil(totalBooks / limit),
        })


    } catch (error) {
        console.log("Error in Fetching All Books: ", error);
        res.status(500).json({
            message: 'Error in Fetching All Books',
        });
    }
}