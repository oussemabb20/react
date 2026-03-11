import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import useEventStore from '../ZustandStores/useEventStore';

function UpdateEvent() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { getEventById, updateEventAPI, fetchEvents, events } = useEventStore();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    img: 'placeholder.jpg',
    price: 0,
    nbTickets: 0,
    nbParticipants: 0,
    like: false
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchEventData();
  }, [eventId]);

  const fetchEventData = async () => {
    try {
      setLoading(true);
      if (events.length === 0) {
        await fetchEvents();
      }
      const found = getEventById(eventId);
      if (found) {
        setFormData(found);
        setError(null);
      } else {
        setError('Event does not exist');
      }
    } catch (err) {
      setError('Event does not exist');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!formData.name || !formData.description) {
      setError('Le nom et la description sont obligatoires');
      return;
    }

    try {
      setIsSubmitting(true);
      await updateEventAPI(eventId, {
        ...formData,
        price: Number(formData.price),
        nbTickets: Number(formData.nbTickets),
        nbParticipants: Number(formData.nbParticipants)
      });
      setSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (err) {
      setError('Erreur lors de la mise à jour de l\'événement');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Container className="mt-4 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Chargement...</span>
        </Spinner>
      </Container>
    );
  }

  if (error && !formData.name) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">{error}</Alert>
        <Button variant="secondary" onClick={() => navigate('/')}>
          Retour aux événements
        </Button>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2>Modify {formData.name}</h2>
      
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">Événement mis à jour avec succès ! Redirection...</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter a Name"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="0"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Number of Tickets</Form.Label>
          <Form.Control
            type="number"
            name="nbTickets"
            value={formData.nbTickets}
            onChange={handleChange}
            min="0"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Image</Form.Label>
          <div className="d-flex align-items-center gap-2">
            <Button variant="outline-secondary" size="sm">
              Browse...
            </Button>
            <span className="text-muted">No file selected.</span>
          </div>
        </Form.Group>

        <div className="d-flex gap-2">
          <Button variant="primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Mise à jour...' : 'Update'}
          </Button>
          <Button variant="secondary" onClick={() => navigate('/')}>
            Cancel
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default UpdateEvent;
