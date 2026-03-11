import React, { useEffect } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import Event from './Event.jsx';
import useEventStore from '../ZustandStores/useEventStore';
import useFavoriteStore from '../ZustandStores/useFavoriteStore';
import './Events.css';

function Events() {
  const { events, errors, fetchEvents, deleteEventObject } = useEventStore();
  const { favorites } = useFavoriteStore();

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = (id) => {
    deleteEventObject(id);
  };

  if (!events.length && !errors) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" role="status" variant="primary" style={{ width: '3rem', height: '3rem' }}>
          <span className="visually-hidden">Chargement...</span>
        </Spinner>
        <p className="mt-3 text-muted">Chargement des événements...</p>
      </Container>
    );
  }

  if (errors) {
    return (
      <Container className="mt-4">
        <Alert variant="danger" className="text-center">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          Erreur lors du chargement des événements. Assurez-vous que le serveur JSON est démarré.
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="events-container">
      <div className="events-header">
        <h1 className="events-title">
          <i className="bi bi-calendar-event-fill me-3"></i>
          My Events
        </h1>
        <p className="events-subtitle">Découvrez nos événements culturels exceptionnels</p>
      </div>
      
      {events.length === 0 ? (
        <Alert variant="info" className="text-center">
          <i className="bi bi-info-circle-fill me-2"></i>
          Aucun événement disponible pour le moment.
        </Alert>
      ) : (
        <Row className="g-4">      
          {
            events.map((eventitem) => (
              <Col key={eventitem.id} lg={4} md={6} sm={12}>
                <Event event={eventitem} onDelete={() => handleDelete(eventitem.id)} /> 
              </Col>
            ))
          }
        </Row>
      )}

      <div className="favorites-section mt-5">
        <h2>⭐ Mes Favoris</h2>
        {favorites.length === 0 ? (
          <p>Aucun événement en favori.</p>
        ) : (
          <Row className="g-4">
            {favorites.map((favItem) => (
              <Col key={favItem.id} lg={4} md={6} sm={12}>
                <Event event={favItem} onDelete={() => handleDelete(favItem.id)} />
              </Col>
            ))}
          </Row>
        )}
      </div>
    </Container>
  );
} 

export default Events;
