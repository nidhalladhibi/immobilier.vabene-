import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import propertyRoutes from "./routes/propertyRoutes.js";
import authRoutes from "./routes/authRoutes.js";  // ✅ Ajout de authRoutes.js

import multer from "multer";
const upload = multer({ dest: "uploads/" });

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json()); // ✅ Important pour lire les JSON

// Ajouter les routes API
app.use("/api/properties", propertyRoutes);
app.use("/api/auth", authRoutes);  // ✅ Ajout de la route d'authentification
app.use("/uploads", express.static("uploads"));
app.post("/upload_files", upload.array("files"), uploadFiles);

function uploadFiles(req, res) {
    console.log(req.body);
    console.log(req.files);
    res.json({ message: "Successfully uploaded files" });
}

app.listen(5000, () => {
  console.log("🚀 Serveur démarré sur le port 5000");
});
