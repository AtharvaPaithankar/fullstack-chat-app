import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/authroute.js";
import messageRoutes from "./routes/messageroute.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from 'cors';
import { app, server } from './lib/socket.js'


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });

dotenv.config();

// const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}))

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
  const frontendPath = path.resolve(__dirname, "../../frontend/dist");

  app.use(express.static(frontendPath));

  // fallback route
  app.use((req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

server.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
  connectDB();
});
