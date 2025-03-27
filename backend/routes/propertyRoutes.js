import { 
  createProperty, 
  getProperties, 
  getPropertyById, 
  updateProperty, 
  deleteProperty, 
  getPropertiesByOwner
} from "../controllers/propertyController.js";

import { Router } from "express";
import { authenticate } from "../middleware/authMiddleware.js"; // 🛡️ Importer l'authMiddleware

// import multer from "multer";
// const upload = multer({ dest: "uploads/" });
import upload from "../middleware/multerMiddleware.js";

const router = Router();

router.get("/", getProperties);         // 🔓 Public - Récupérer toutes les propriétés
router.get("/property/:id", getPropertyById);    // 🔓 Public - Récupérer une propriété par ID

router.get("/owner", authenticate, getPropertiesByOwner); // 🔒 Auth - Récupérer les propriétés par owner
// router.post("/", upload.array("images", 5), createProperty);     // 🔒 Auth - Ajouter une propriété
router.post("/", authenticate, upload.single("image"), createProperty);
router.put("/:id", authenticate, updateProperty);   // 🔒 Auth - Modifier une propriété
router.delete("/:id", authenticate, deleteProperty);// 🔒 Auth - Supprimer une propriété

export default router;
