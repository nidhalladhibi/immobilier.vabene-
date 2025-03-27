import React, { useState } from "react";
import axios from "axios";
import { 
  Container, 
  Form, 
  Button, 
  Card, 
  Alert, 
  InputGroup 
} from 'react-bootstrap';
import '../Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear specific field error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Le nom est requis";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Format d'email invalide";
    }
    
    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis";
    } else if (formData.password.length < 6) {
      newErrors.password = "Le mot de passe doit contenir au moins 6 caractères";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      await axios.post("http://localhost:5000/api/auth/register", formData);
      
      setRegistrationSuccess(true);
      setFormData({ name: "", email: "", password: "" });
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Erreur d'inscription";
      setErrors(prev => ({ ...prev, serverError: errorMsg }));
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container className="register-container">
      <Card className="register-card">
        <Card.Body>
          <Card.Title className="text-center mb-4">Créer un compte</Card.Title>
          
          {registrationSuccess && (
            <Alert variant="success" className="text-center">
              Inscription réussie ! Vous pouvez maintenant vous connecter.
            </Alert>
          )}
          
          <Form onSubmit={handleRegister}>
            <Form.Group className="mb-3">
              <Form.Label>Nom</Form.Label>
              <Form.Control 
                type="text" 
                name="name" 
                placeholder="Entrez votre nom" 
                value={formData.name}
                onChange={handleChange}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control 
                type="email" 
                name="email" 
                placeholder="Entrez votre email" 
                value={formData.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mot de passe</Form.Label>
              <InputGroup>
                <Form.Control 
                  type={showPassword ? "text" : "password"}
                  name="password" 
                  placeholder="Créez un mot de passe" 
                  value={formData.password}
                  onChange={handleChange}
                  isInvalid={!!errors.password}
                />
                <Button 
                  variant="outline-secondary" 
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? "Masquer" : "Afficher"}
                </Button>
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            {errors.serverError && (
              <Alert variant="danger">
                {errors.serverError}
              </Alert>
            )}

            <Button 
              variant="primary" 
              type="submit" 
              className="w-100"
              disabled={isLoading}
            >
              {isLoading ? 'Inscription en cours...' : "S'inscrire"}
            </Button>
          </Form>

          <div className="text-center mt-3">
            <p>Déjà un compte ? <a href="/login">Connectez-vous</a></p>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Register;