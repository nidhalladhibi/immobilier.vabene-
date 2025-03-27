import Property from "../models/Property.js";
import mongoose from "mongoose";

// ✅ Récupérer toutes les propriétés
export const getProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur GET", error: error.message });
  }
};

// ✅ Récupérer les propriétés par owner
export const getPropertiesByOwner = async (req, res) => {
  console.log(req.user)
  try {
    const properties = await Property.find({ owner: req.user._id });
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur Owner", error: error.message, user: req.user });
  }
};

// ✅ Récupérer une propriété par ID
export const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Propriété non trouvée" });
    }
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur get by id", error: error.message });
  }
};

// ✅ Ajouter une nouvelle propriété
export const createProperty = async (req, res) => {
  try {
    const { title, description, price, location } = req.body;

    if (!title || !description || !price || !location) {
      return res.status(400).json({ message: "Tous les champs sont requis" });
    }

    // const owner = mongoose.Types.ObjectId(req.user.userId); // Convert userId to ObjectId

    const newProperty = new Property({ title, description, price, location, image: req.file.path, owner: req.user._id });
    await newProperty.save();
    res.status(201).json(newProperty);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur creation", error: error.message });
  }
};

// ✅ Modifier une propriété
export const updateProperty = async (req, res) => {
  try {
    const { title, description, price, location } = req.body;
    const updatedProperty = await Property.findByIdAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      { title, description, price, location },
      { new: true } // Retourne la propriété mise à jour
    );

    if (!updatedProperty) {
      return res.status(404).json({ message: "Propriété non trouvée" });
    }

    res.status(200).json(updatedProperty);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur update", error: error.message });
  }
};

// ✅ Supprimer une propriété
export const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById({ _id: req.params.id, owner: req.user._id });
    if (!property) {
      return res.status(404).json({ message: "Propriété non trouvée." });
    }

    // Vérifier si l'utilisateur est le propriétaire
    // if (property.user.toString() !== req.user._id.toString()) {
    //   return res.status(403).json({ message: "Non autorisé." });
    // }

    await property.deleteOne();
    res.json({ message: "Propriété supprimée avec succès." });
  } catch (error) {
    console.error("Erreur lors de la suppression :", error);
    res.status(500).json({ message: "Erreur serveur delete" });
  }
};
