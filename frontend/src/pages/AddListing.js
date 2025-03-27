import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddListing = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    success: false,
    error: false,
    message: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ success: false, error: false, message: "" });

    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("location", location);
    if (image) {
      formData.append("image", image);
    }

    try {
      await axios.post("http://localhost:5000/api/properties", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      
      setSubmitStatus({ 
        success: true, 
        error: false, 
        message: "Annonce ajoutée avec succès !" 
      });
      
      // Reset form after successful submission
      setTitle("");
      setPrice("");
      setDescription("");
      setLocation("");
      setImage(null);
    } catch (error) {
      setSubmitStatus({ 
        success: false, 
        error: true, 
        message: "Erreur lors de l'ajout de l'annonce" 
      });
      console.error("Erreur lors de l'ajout de l'annonce", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <div className="border p-4 rounded shadow-sm">
            <h2 className="text-center mb-4 animate__animated animate__fadeIn">
              Ajouter une annonce
            </h2>
            
            {submitStatus.success && (
              <Alert variant="success" className="animate__animated animate__bounceIn">
                {submitStatus.message}
              </Alert>
            )}
            
            {submitStatus.error && (
              <Alert variant="danger" className="animate__animated animate__shakeX">
                {submitStatus.message}
              </Alert>
            )}
            
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Control 
                  type="text" 
                  placeholder="Titre" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="animate__animated animate__fadeInUp"
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Control 
                  type="number" 
                  placeholder="Prix" 
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  className="animate__animated animate__fadeInUp animate__delay-1s"
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Control 
                  as="textarea" 
                  placeholder="Description" 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows={3}
                  className="animate__animated animate__fadeInUp animate__delay-2s"
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Control 
                  type="text" 
                  placeholder="Localisation" 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                  className="animate__animated animate__fadeInUp animate__delay-3s"
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Control 
                  type="file" 
                  onChange={handleImageChange}
                  accept="image/*"
                  className="animate__animated animate__fadeInUp animate__delay-4s"
                />
                {image && (
                  <Form.Text className="text-muted animate__animated animate__fadeIn">
                    {image.name}
                  </Form.Text>
                )}
              </Form.Group>
              
              <Button 
                variant="primary" 
                type="submit" 
                disabled={isSubmitting}
                className="w-100 animate__animated animate__fadeInUp animate__delay-5s"
              >
                {isSubmitting ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-2"
                    />
                    Ajout en cours...
                  </>
                ) : (
                  "Ajouter"
                )}
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AddListing;