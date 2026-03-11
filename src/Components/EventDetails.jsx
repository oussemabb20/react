import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Button, Spinner, Alert, Badge, Row, Col } from 'react-bootstrap';
import useEventStore from '../ZustandStores/useEventStore';
import './EventDetails.css';

function EventDetails() {
  const { eventName } = useParams();
  const navigate = useNavigate();
  const { getEventById, updateEventAPI, fetchEvents, events } = useEventStore();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    fetchEventDetails();
  }, [eventName, events]);

  const fetchEventDetails = async () => {
    try {
      setLoading(true);
      // Ensure events are loaded in the store
      if (events.length === 0) {
        await fetchEvents();
      }
      const found = getEventById(eventName);
      if (found) {
        setEvent(found);
        setError(null);
      } else {
        setError('Événement non trouvé');
      }
    } catch (err) {
      setError('Événement non trouvé ou erreur de chargement');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    try {
      setIsUpdating(true);
      const updatedEvent = { ...event, like: !event.like };
      const result = await updateEventAPI(event.id, updatedEvent);
      setEvent(result);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du like:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleBuyTicket = async () => {
    if (event.nbTickets <= 0) {
      alert('Désolé, il n\'y a plus de tickets disponibles !');
      return;
    }
    
    try {
      setIsUpdating(true);
      const updatedEvent = { ...event, nbTickets: event.nbTickets - 1 };
      const result = await updateEventAPI(event.id, updatedEvent);
      setEvent(result);
      alert('Ticket acheté avec succès !');
    } catch (error) {
      console.error('Erreur lors de l\'achat du ticket:', error);
      alert('Erreur lors de l\'achat du ticket');
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" role="status" variant="primary" style={{ width: '3rem', height: '3rem' }}>
          <span className="visually-hidden">Chargement...</span>
        </Spinner>
        <p className="mt-3 text-muted">Chargement des détails...</p>
      </Container>
    );
  }

  if (error || !event) {
    return (
      <Container className="mt-4">
        <Alert variant="danger" className="text-center">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          {error || 'Événement non trouvé'}
        </Alert>
        <div className="text-center">
          <Button variant="primary" onClick={() => navigate('/')}>
            <i className="bi bi-arrow-left me-2"></i>
            Retour aux événements
          </Button>
        </div>
      </Container>
    );
  }

  const isSoldOut = event.nbTickets === 0;
  const imageUrl = `/images/${event.img}`;

  return (
    <Container className="event-details-container">
      <Button 
        variant="outline-primary" 
        onClick={() => navigate('/')}
        className="mb-4 back-btn"
      >
        <i className="bi bi-arrow-left me-2"></i>
        Retour aux événements
      </Button>

      <Card className="event-details-card">
        <Row className="g-0">
          <Col md={6}>
            <div className="event-details-image-container">
              <Card.Img 
                src={imageUrl} 
                alt={event.name}
                className="event-details-image"
              />
              {isSoldOut && (
                <div className="sold-out-overlay">
                  <img src="/images/sold_out.png" alt="Sold Out" className="sold-out-badge" />
                </div>
              )}
              {event.like && (
                <div className="like-badge-large">
                  <i className="bi bi-heart-fill"></i>
                </div>
              )}
            </div>
          </Col>
          
          <Col md={6}>
            <Card.Body className="event-details-body">
              <h1 className="event-details-title">{event.name}</h1>
              
              <div className="event-details-info">
                <div className="info-card">
                  <i className="bi bi-tag-fill"></i>
                  <div>
                    <span className="info-label">Prix</span>
                    <span className="info-value">{event.price} DT</span>
                  </div>
                </div>
                
                <div className="info-card">
                  <i className="bi bi-ticket-perforated-fill"></i>
                  <div>
                    <span className="info-label">Tickets disponibles</span>
                    <Badge bg={isSoldOut ? 'danger' : 'success'} className="info-badge">
                      {event.nbTickets}
                    </Badge>
                  </div>
                </div>
                
                <div className="info-card">
                  <i className="bi bi-people-fill"></i>
                  <div>
                    <span className="info-label">Participants</span>
                    <span className="info-value">{event.nbParticipants}</span>
                  </div>
                </div>
              </div>

              <div className="event-description">
                <h5><i className="bi bi-info-circle-fill me-2"></i>Description</h5>
                <p>{event.description}</p>
              </div>

              <div className="event-actions-details">
                <Button 
                  variant={event.like ? 'danger' : 'outline-danger'}
                  onClick={handleLike}
                  disabled={isUpdating}
                  className="action-btn-large"
                >
                  <i className={`bi ${event.like ? 'bi-heart-fill' : 'bi-heart'}`}></i>
                  {event.like ? 'J\'aime' : 'Aimer'}
                </Button>
                
                <Button 
                  variant="primary" 
                  onClick={handleBuyTicket}
                  disabled={isUpdating || isSoldOut}
                  className="action-btn-large"
                >
                  <i className="bi bi-cart-fill"></i>
                  {isSoldOut ? 'Épuisé' : 'Acheter un ticket'}
                </Button>
              </div>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}

export default EventDetails;
