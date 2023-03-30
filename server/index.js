import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

import path from "path";
import {fileURLToPath} from "url";

import committeeRoutes from './routes/committee.js';
import adminRoutes from './routes/admin.js';
import eventRoutes from './routes/eventRoutes.js';
import { createEvent } from './controllers/eventController.js';

//data imports
import Admin from './models/Admin.js';

// CONFIGURATION
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
//set directory of where we store files
app.use("/assets", express.static(path.join(__dirname, "public/assets")));


// FILE STORAGE CONFIGURATIONS
const storage = multer.diskStorage({
  destination: function (req, file, cb){
    cb(null, "public/assets");
  },
  filename: function (req, file,cb){
    cb(null, file.fieldname + '-' +uuidv4() + '-' + Date.now()+ path.extname(file.originalname));
  }
});

const upload = multer({storage})

// ROUTES WITH FILE UPLOADS
app.post("/event/createEvent", upload.fields([
  {name:'banner', maxCount:1},
  {name: 'order', maxCount:1},
]), createEvent);
// ROUTES
app.use('/committee', committeeRoutes);
app.use('/admin', adminRoutes);
app.use('/event', eventRoutes);
// MONGOOSE Setup

const PORT = process.env.PORT || 9000;
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
}).then(()=>{
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
}).catch((error) => console.log(`${error} did not connect`));