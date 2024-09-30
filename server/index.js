import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";
import connectToDatabase from "./db/db.js";
// Router imports
import authRouter from "./routes/auth.route.js";
import bodyParser from "body-parser";

const app = express();

dotenv.config();

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Middlewares
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// Routes
app.use("/auth", authRouter);

// Connect to the database
connectToDatabase();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server listening to PORT ${PORT}`);
});