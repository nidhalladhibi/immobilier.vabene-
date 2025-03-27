import React, { useState } from "react";
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
import '../Login.css'; // We'll create a CSS file for animations

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      navigate("/");
    } catch (error) {
      console.error("Erreur de connexion :", error.response?.data || error.message);
      setError(error.response?.data?.message || "Erreur de connexion");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="login-container">
      <Card className="login-card slide-in-bottom">
        <Card.Body>
          <Card.Title className="text-center mb-4">Connexion</Card.Title>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control 
                type="email" 
                placeholder="Entrez votre email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-bounce"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mot de passe</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="Mot de passe" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-bounce"
              />
            </Form.Group>

            {error && (
              <Alert variant="danger" className="shake-animation">
                {error}
              </Alert>
            )}

            <Button 
              variant="primary" 
              type="submit" 
              className="w-100 btn-bounce"
              disabled={isLoading}
            >
              {isLoading ? 'Connexion en cours...' : 'Connexion'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;