import React, { useEffect, useState } from "react";
import axios from "axios";
import ListingItemOwner from "../components/ListingItemOwner";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { Trash2, Edit } from "lucide-react"; // Icons from lucide-react
import "bootstrap/dist/css/bootstrap.min.css";

const OwnerProperties = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch the listings owned by the user
  const fetchListings = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/properties/owner", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setListings(data);
      setLoading(false);
    } catch (error) {
      console.error("Erreur de chargement des annonces", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  // Handle edit action
  const onEdit = (id) => {
    navigate(`/edit-property/${id}`); // Redirect to the edit page
  };

  // Handle delete action
  const onDelete = async (id) => {
    console.log("Supprimer", id);
    try {
      await axios.delete(`http://localhost:5000/api/properties/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchListings(); // Refresh the listings after deletion
    } catch (error) {
      console.error("Erreur lors de la suppression", error);
    }
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4 animate__animated animate__fadeInDown">Mes annonces</h1>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3">Chargement des annonces...</p>
        </div>
      ) : listings.length === 0 ? (
        <p className="text-center text-muted">Aucune annonce trouvée.</p>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {listings.map((listing) => (
            <Col key={listing._id} className="animate__animated animate__fadeInUp">
              <Card className="shadow-sm border-0">
                <Card.Img
                  variant="top"
                  src={`http://localhost:5000/${listing.image}`}
                  alt={listing.title}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title>{listing.title}</Card.Title>
                  <Card.Text>
                    <strong>Prix:</strong> {listing.price}€
                    <br />
                    <strong>Localisation:</strong> {listing.location}
                  </Card.Text>
                  <div className="d-flex justify-content-between">
                    <Button
                      variant="primary"
                      onClick={() => onEdit(listing._id)}
                      className="d-flex align-items-center"
                    >
                      <Edit size={18} className="me-2" />
                      Modifier
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => onDelete(listing._id)}
                      className="d-flex align-items-center"
                    >
                      <Trash2 size={18} className="me-2" />
                      Supprimer
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default OwnerProperties;