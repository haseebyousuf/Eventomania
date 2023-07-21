import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import multer from "multer";
import sharp from "sharp";
import { v4 as uuidv4 } from "uuid";

import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

import committeeRoutes from "./routes/committee.js";
import adminRoutes from "./routes/admin.js";
import eventRoutes from "./routes/eventRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

import { createEvent, uploadPhotos } from "./controllers/eventController.js";
import { uploadReport } from "./controllers/eventController.js";

//data imports
import Admin from "./models/Admin.js";

// CONFIGURATION
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
//set directory of where we store files
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// FILE STORAGE CONFIGURATIONS
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname +
        "-" +
        uuidv4() +
        "-" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });
//COMPRESS PHOTOS BEFORE UPLOADING
const compressAndSavePhotos = async (req, res, next) => {
  try {
    const compressedPhotos = await Promise.all(
      req.files.map(async (photo) => {
        const photoPath = photo.path;
        const compressedPath = photoPath.replace("photos", "compressedPhotos");
        let compressionQuality = 40;

        if (photo.size >= 2000000) {
          compressionQuality = 35;
        } else if (photo.size > 1000000) {
          compressionQuality = 40;
        } else if (photo.size > 800000 && photo.size <= 1000000) {
          compressionQuality = 60;
        } else if (photo.size > 300000 && photo.size <= 800000) {
          compressionQuality = 80;
        } else if (photo.size < 300000) {
          compressionQuality = 90;
        }
        await sharp(photoPath)
          .jpeg({ quality: compressionQuality })
          .toFile(compressedPath);

        // Remove the original image after compression using fs.promises.unlink
        await fs.promises.unlink(photoPath);

        // Return the compressed photo information
        return { ...photo, path: compressedPath };
      })
    );

    req.files.photos = compressedPhotos;
    next();
  } catch (err) {
    console.error("Error compressing photos:", err);
    res.status(500).json({ message: "Error compressing photos." });
  }
};
// ROUTES WITH FILE UPLOADS
app.post(
  "/event/createEvent",
  upload.fields([
    { name: "banner", maxCount: 1 },
    { name: "order", maxCount: 1 },
  ]),
  createEvent
);
app.post("/event/uploadReport", upload.single("report"), uploadReport);
app.post(
  "/event/uploadPhotos",
  upload.array("photos"),
  compressAndSavePhotos,
  uploadPhotos
);

// ROUTES
app.use("/committee", committeeRoutes);
app.use("/admin", adminRoutes);
app.use("/events", eventRoutes);
app.use("/user", userRoutes);
app.use("/dashboard", dashboardRoutes);
// MONGOOSE Setup

const PORT = process.env.PORT || 9000;
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
