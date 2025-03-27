import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();


// Inscription d'un nouvel utilisateur
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Vérification si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Cet email est déjà utilisé" });
    }

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);


    // Création du nouvel utilisateur
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    // Réponse avec succès
    res.status(201).json({ message: "Utilisateur créé avec succès" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur, veuillez réessayer plus tard" });
  }
};

// Connexion de l'utilisateur
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Utilisateur non trouvé avec cet email" });
    }

    // Comparaison du mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Mot de passe incorrect" });
    }

    // Création du token JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || "default_secret", { expiresIn: "1h" });

    // Réponse avec token et informations de l'utilisateur
    res.json({ token, user: { name: user.name, email: user.email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur, veuillez réessayer plus tard" });
  }
};

