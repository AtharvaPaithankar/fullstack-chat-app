import { v2 as cloudinary } from "cloudinary";
import { fileURLToPath } from "url";
import { config } from "dotenv";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

config({ path: path.join(__dirname, "../.env") });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log("API KEY:", process.env.CLOUDINARY_API_KEY);

export default cloudinary;