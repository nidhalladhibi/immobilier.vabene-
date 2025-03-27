import React, { useEffect, useState } from "react";
import axios from "axios";
import ListingItem from "../components/ListingItem";
import { Container, Row, Col, Spinner, Carousel, Card, Button } from "react-bootstrap";
import 'animate.css/animate.min.css';
import { Link } from 'react-router-dom';

const Home = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/properties");
        setListings(data);
        setLoading(false);
      } catch (error) {
        console.error("Erreur de chargement des annonces", error);
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  // Données pour le carousel (vous pouvez les remplacer par vos propres images)
  const carouselItems = [
    {
      id: 1,
      image: "https://thumbs.dreamstime.com/b/residential-real-estate-buying-selling-renting-homes-apartments-condos-townhouses-investment-shelter-expert-guidance-318813833.jpg",
      title: "Trouvez votre maison de rêve",
      description: "Découvrez nos propriétés exclusives"
    },
    {
      id: 2,
      image: "https://i.pinimg.com/736x/fa/6d/da/fa6ddabd52252e3d2eca1afbb66ef43a.jpg",
      title: "Vivre avec élégance",
      description: "Des espaces conçus pour votre confort"
    }
  ];

  return (
    <div className="animate__animated animate__fadeIn">
      {/* Carousel Hero Section */}
      <Carousel fade indicators={false} controls={false}>
        {carouselItems.map((item) => (
          <Carousel.Item key={item.id}>
            <img
              className="d-block w-100"
              src={item.image}
              alt={item.title}
              style={{ height: "60vh", objectFit: "cover" }}
            />
            <Carousel.Caption className="bg-dark bg-opacity-50 rounded p-4">
              <h3 className="display-4 animate__animated animate__fadeInDown">{item.title}</h3>
              <p className="lead animate__animated animate__fadeInUp animate__delay-1s">{item.description}</p>
              <Button
                variant="primary"
                size="lg"
                className="animate__animated animate__bounceIn animate__delay-2s"
              >
                Explorer
              </Button>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Main Content */}
      <Container className="my-5">
        <Row className="mb-4">
          <Col>
            <h1 className="text-center display-4 fw-bold text-primary">
              Nos dernières annonces
            </h1>
            <p className="text-center text-muted">
              Découvrez notre sélection de propriétés exceptionnelles
            </p>
          </Col>
        </Row>

        {loading ? (
          <div className="text-center my-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-2">Chargement des annonces...</p>
          </div>
        ) : (
          <Row xs={1} md={2} lg={3} className="g-4">
            {listings.map((listing) => (
              <Col key={listing._id} className="animate__animated animate__fadeIn">
                <ListingItem
                  title={listing.title}
                  price={listing.price}
                  image={listing.image} // Assurez-vous que votre ListingItem peut gérer une prop image
                />
              </Col>
            ))}
          </Row>
        )}

        {/* Featured Section */}
        <Row className="mt-5">
          <Col>
            <Card className="border-0 shadow-lg animate__animated animate__pulse animate__infinite animate__slower">
              <Card.Body className="text-center p-5">
                <h2 className="display-6">Vous souhaitez vendre ou louer ?</h2>
                <p className="lead mb-4">
                  Rejoignez notre plateforme et bénéficiez d'une visibilité maximale
                </p>
                <Link to="/add-listing">
                  <Button variant="outline-primary" size="lg">
                    Déposer une annonce
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;