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
        // save this to the mongodb

        const uploadResponse = await cloudinary.uploader.upload(image);
        const imageUrl = uploadResponse.secure_url;


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