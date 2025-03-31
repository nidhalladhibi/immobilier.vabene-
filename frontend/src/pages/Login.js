import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { login } from "../store/actions";
import { useNavigate } from "react-router-dom";
import { 
  Container, 
  Form, 
  Button, 
  Alert, 
  Card 
} from 'react-bootstrap';
import '../Login.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [animateForm, setAnimateForm] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Déclencher l'animation après le montage du composant
    setAnimateForm(true);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email || !password) {
      setError("Veuillez remplir tous les champs.");
      setIsLoading(false);
      return;
    }

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      dispatch(login(data));
      setError("");
      // Ajouter une petite temporisation pour montrer l'animation de succès
      setTimeout(() => navigate("/"), 500);
    } catch (error) {
      console.error("Erreur de connexion :", error.response?.data || error.message);
      setError(error.response?.data?.message || "Erreur de connexion");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Éléments d'arrière-plan animés */}
      <div className="background">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      
      <Container className="login-container">
        <Card className={`login-card ${animateForm ? 'fade-in-up' : ''}`}>
          <div className="brand-logo">
            <div className="logo-circle pulse"></div>
          </div>
          
          <Card.Body>
            <Card.Title className="text-center mb-4 title-animation">Connexion</Card.Title>
            
            <Form onSubmit={handleLogin} className="animated-form">
              <Form.Group className="mb-4 input-group">
                <div className="input-icon">
                  <i className="bi bi-envelope"></i>
                </div>
                <Form.Control 
                  type="email" 
                  placeholder="Entrez votre email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`modern-input ${email ? 'has-value' : ''}`}
                />
                <div className="input-underline"></div>
              </Form.Group>

              <Form.Group className="mb-4 input-group">
                <div className="input-icon">
                  <i className="bi bi-lock"></i>
                </div>
                <Form.Control 
                  type="password" 
                  placeholder="Mot de passe" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`modern-input ${password ? 'has-value' : ''}`}
                />
                <div className="input-underline"></div>
              </Form.Group>

              {error && (
                <Alert variant="danger" className="error-shake">
                  {error}
                </Alert>
              )}

              <Button 
                variant="primary" 
                type="submit" 
                className="w-100 submit-button"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="loading-spinner">
                    <div className="spinner"></div>
                    <span>Connexion...</span>
                  </div>
                ) : (
                  'Connexion'
                )}
              </Button>
              
              <div className="forgot-password text-center mt-3">
                <a href="#" className="text-decoration-none hover-effect">
                  Mot de passe oublié?
                </a>
              </div>
            </Form>
          </Card.Body>
          
          <div className="create-account text-center mb-3">
            <p>Pas encore de compte? <a href="#" className="text-decoration-none hover-effect">Créer un compte</a></p>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default Login;