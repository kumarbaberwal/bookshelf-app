import dotenv from 'dotenv';
dotenv.config();

export const ENV_VARS = {
    PORT: process.env.PORT || 3000,
    MONGO_URI: process.env.MONGO_URI || "mongodb+srv://kumar:kumar$12@cluster0.viepc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    JWT_SECRET: process.env.JWT_SECRET || 'bookshelf',
}