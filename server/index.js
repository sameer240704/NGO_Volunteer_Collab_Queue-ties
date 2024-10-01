import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";
import connectToDatabase from "./db/db.js";
// Router imports
import authRouter from "./routes/auth.route.js";
import projectRouter from "./routes/projectRoutes.js";
import taskRouter from "./routes/taskRoutes.js";
import commentRouter from "./routes/commentRoutes.js";
import sellerRouter from "./routes/sellerRoutes.js";
import communityRouter from "./routes/community.route.js";

import bodyParser from "body-parser";
import { SessionsClient } from '@google-cloud/dialogflow';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

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
app.use("/project", projectRouter);
app.use('/task', taskRouter);
app.use("/comment", commentRouter);
app.use('/seller', sellerRouter);
app.use("/community", communityRouter);

// Chatbot middleware
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const client = new SessionsClient({
  keyFilename: path.join(__dirname, '/chatbot-api-key.json'), // Update the path
});

app.post('/api/chatbot', async (req, res) => {
  const sessionId = req.body.sessionId;
  const userQuery = req.body.queryInput.text.text;

  if (!sessionId) {
    return res.status(400).send('Session ID is required');
  }
  if (!userQuery) {
    return res.status(400).send('User input text is required');
  }

  const sessionPath = client.projectAgentSessionPath('krisha-bot-diqt', sessionId);

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: userQuery,
        languageCode: 'en',
      },
    },
  };

  try {
    const responses = await client.detectIntent(request);
    res.json(responses[0].queryResult);
  } catch (error) {
    console.error('Error detecting intent:', error);
    res.status(500).send('Error detecting intent');
  }
});

// Connect to the database
connectToDatabase();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server listening to PORT ${PORT}`);
});
