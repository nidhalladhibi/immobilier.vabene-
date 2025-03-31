import React, { useEffect, useState } from "react";
import axios from "axios";
import ListingItem from "../components/ListingItem";
import { Container, Row, Col, Spinner, Carousel, Card, Button } from "react-bootstrap";
import 'animate.css/animate.min.css';
import { Link } from 'react-router-dom';
import '../Home.css';

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
    <div className="page-wrapper animate__animated animate__fadeIn">
      {/* Décoration de fond */}
      <div className="background-decoration">
        <div className="bg-circle bg-circle-1"></div>
        <div className="bg-circle bg-circle-2"></div>
        <div className="bg-circle bg-circle-3"></div>
        <div className="bg-lines"></div>
      </div>

      {/* Pattern de fond */}
      <div className="background-pattern"></div>

      <Carousel fade indicators={false} controls={false} className="custom-carousel">
        {carouselItems.map((item) => (
          <Carousel.Item key={item.id}>
            <img className="d-block w-100" src={item.image} alt={item.title} style={{ height: "60vh", objectFit: "cover" }} />
            <Carousel.Caption className="bg-dark bg-opacity-50 rounded p-4 animated fadeInUp">
              <h3 className="display-4 animate__animated animate__fadeInDown text-shadow">{item.title}</h3>
              <p className="lead animate__animated animate__fadeInUp animate__delay-1s text-shadow">{item.description}</p>
              <Button variant="primary" size="lg" className="animate__animated animate__bounceIn animate__delay-2s shadow-lg">Explorer</Button>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      <div className="content-section">
        <Container className="my-5">
          <Row className="mb-4">
            <Col>
              <div className="section-header">
                <div className="fancy-underline"></div>
                <h1 className="text-center display-4 fw-bold text-primary shadow-text">Nos dernières annonces</h1>
                <div className="fancy-underline"></div>
              </div>
              <p className="text-center text-muted">Découvrez notre sélection de propriétés exceptionnelles</p>
            </Col>
          </Row>

          {loading ? (
            <div className="text-center my-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-2">Chargement des annonces...</p>
            </div>
          ) : (
            <Row xs={1} md={2} lg={3} className="g-4 listings-section">
              {listings.map((listing) => (
                <Col key={listing._id} className="animate__animated animate__fadeIn">
                  <div className="listing-card">
                    <ListingItem title={listing.title} price={listing.price} image={listing.image} />
                    <div className="details-button-wrapper">
                      <Link to={`/property/${listing._id}`} className="text-decoration-none">
                        <Button 
                          variant="outline-primary" 
                          className="details-button animate__animated animate__pulse animate__infinite animate__slower"
                          onMouseEnter={(e) => e.currentTarget.classList.add('animate__rubberBand')}
                          onMouseLeave={(e) => e.currentTarget.classList.remove('animate__rubberBand')}
                        >
                          <i className="bi bi-eye-fill me-2"></i>
                          Voir les détails
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          )}

          <Row className="mt-5">
            <Col>
              <Card className="border-0 shadow-lg animate__animated animate__pulse animate__infinite animate__slower gradient-bg-card">
                <div className="card-shapes">
                  <div className="card-shape card-shape-1"></div>
                  <div className="card-shape card-shape-2"></div>
                </div>
                <Card.Body className="text-center p-5">
                  <h2 className="display-6">Vous souhaitez vendre ou louer ?</h2>
                  <p className="lead mb-4">Rejoignez notre plateforme et bénéficiez d'une visibilité maximale</p>
                  <Link to="/add-listing">
                    <Button variant="outline-light" size="lg" className="shadow-lg">Déposer une annonce</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="wave-section">
        <div className="wave wave1"></div>
        <div className="wave wave2"></div>
      </div>

      <footer className="bg-gradient-dark text-light p-5 mt-5 animate__animated animate__fadeInUp footer-wrapper">
        <Container>
          <Row className="footer-content">
            <Col md={4} className="mb-4 mb-md-0 animate__animated animate__fadeIn animate__delay-1s">
              <h4 className="mb-4 footer-heading">Immobilier de rêve</h4>
              <p>Votre partenaire de confiance pour trouver le logement idéal. Notre expertise à votre service depuis 2015.</p>
              <Button variant="outline-light" size="sm" className="mt-3 footer-btn animate__animated animate__pulse animate__infinite animate__slow">
                En savoir plus
              </Button>
            </Col>

            <Col md={4} className="mb-4 mb-md-0 animate__animated animate__fadeIn animate__delay-2s">
              <h5 className="mb-4 footer-heading">Nos coordonnées</h5>
              <p className="footer-contact-item">
                <i className="bi bi-whatsapp me-2"></i> WhatsApp : +12651679495
              </p>
              <p className="footer-contact-item">
                <i className="bi bi-envelope me-2"></i> E-mail : www.nidhal.com@gmail.com
              </p>
              <p className="footer-contact-item">
                <i className="bi bi-telephone me-2"></i> Téléphone : +21651679495
              </p>
            </Col>

            <Col md={4} className="animate__animated animate__fadeIn animate__delay-3s">
              <h5 className="mb-4 footer-heading">Restez connecté</h5>
              <div className="social-icons">
                <a href="#" className="social-icon animate__animated animate__bounce animate__infinite animate__slower">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="#" className="social-icon animate__animated animate__bounce animate__infinite animate__slower animate__delay-1s">
                  <i className="bi bi-instagram"></i>
                </a>
                <a href="#" className="social-icon animate__animated animate__bounce animate__infinite animate__slower animate__delay-2s">
                  <i className="bi bi-linkedin"></i>
                </a>
                <a href="#" className="social-icon animate__animated animate__bounce animate__infinite animate__slower animate__delay-3s">
                  <i className="bi bi-twitter"></i>
                </a>
              </div>
              <form className="mt-4">
                <div className="input-group">
                  <input type="email" className="form-control" placeholder="Votre email..." />
                  <Button variant="primary" className="subscribe-btn">S'abonner</Button>
                </div>
              </form>
            </Col>
          </Row>

          <hr className="footer-divider animate__animated animate__fadeIn animate__delay-4s" />

          <Row className="text-center mt-4 animate__animated animate__fadeIn animate__delay-4s">
            <Col>
              <p className="mb-0 copyright-text"> Immobilier VABENE</p>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
};

export default Home;