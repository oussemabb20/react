import React, { useState } from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { editEvent, deleteEvent } from '../service/api';
import useFavoriteStore from '../ZustandStores/useFavoriteStore';
import './Event.css';

function Event({ event, onUpdate }) {
  const navigate = useNavigate();
  const [isUpdating, setIsUpdating] = useState(false);
  const { addFavorite, removeFavorite, isFavorite } = useFavoriteStore();
  const favorite = isFavorite(event.id);

  const handleToggleFavorite = (e) => {
    e.stopPropagation();
    if (favorite) {
      removeFavorite(event.id);
    } else {
      addFavorite(event);
    }
  };

  const handleViewDetails = () => {
    navigate(`/event/${event.id}`);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    navigate(`/update-event/${event.id}`);
  };

  const handleLike = async (e) => {
    e.stopPropagation();
    try {
      setIsUpdating(true);
      const updatedEvent = { ...event, like: !event.like };
      await editEvent(event.id, updatedEvent);
      if (onUpdate) onUpdate();
    } catch (error) {
      console.error('Erreur lors de la mise à jour du like:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleBuyTicket = async (e) => {
    e.stopPropagation();
    if (event.nbTickets <= 0) {
      alert('Désolé, il n\'y a plus de tickets disponibles !');
      return;
    }
    
    try {
      setIsUpdating(true);
      const updatedEvent = { ...event, nbTickets: event.nbTickets - 1 };
      await editEvent(event.id, updatedEvent);
      if (onUpdate) onUpdate();
      alert('Ticket acheté avec succès !');
    } catch (error) {
      console.error('Erreur lors de l\'achat du ticket:', error);
      alert('Erreur lors de l\'achat du ticket');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (!window.confirm(`Êtes-vous sûr de vouloir supprimer l'événement "${event.name}" ?`)) {
      return;
    }
    
    try {
      setIsUpdating(true);
      await deleteEvent(event.id);
      if (onUpdate) onUpdate();
      alert('Événement supprimé avec succès !');
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      alert('Erreur lors de la suppression de l\'événement');
    } finally {
      setIsUpdating(false);
    }
  };

  const isSoldOut = event.nbTickets === 0;
  const imageUrl = `/images/${event.img}`;

  return (
    <Card className="event-card">
      <div className="event-image-container">
        <Card.Img 
          variant="top" 
          src={imageUrl} 
          alt={event.name}
          className="event-image"
        />
        {isSoldOut && (
          <div className="sold-out-overlay">
            <img src="/images/sold_out.png" alt="Sold Out" className="sold-out-badge" />
          </div>
        )}
        {event.like && (
          <div className="like-badge">
            <i className="bi bi-heart-fill"></i>
          </div>
        )}
      </div>
      
      <Card.Body className="event-body">
        <Card.Title 
          className="event-title" 
          onClick={handleViewDetails}
        >
          {event.name}
        </Card.Title>
        
        <div className="event-info">
          <div className="info-item">
            <i className="bi bi-tag-fill"></i>
            <span>Price: <strong>{event.price} DT</strong></span>
          </div>
          <div className="info-item">
            <i className="bi bi-ticket-perforated-fill"></i>
            <span>Tickets: <Badge bg={isSoldOut ? 'danger' : 'success'}>{event.nbTickets}</Badge></span>
          </div>
          <div className="info-item">
            <i className="bi bi-people-fill"></i>
            <span>Participants: <strong>{event.nbParticipants}</strong></span>
          </div>
        </div>
        
        <div className="event-actions">
          <div className="action-row">
            <Button
              variant={favorite ? 'warning' : 'info'}
              onClick={handleToggleFavorite}
              className="action-btn w-100"
            >
              {favorite ? 'Retirer des Favoris' : 'Ajouter aux Favoris'}
            </Button>
          </div>
          <div className="action-row">
            <Button 
              variant={event.like ? 'danger' : 'outline-danger'}
              onClick={handleLike}
              disabled={isUpdating}
              className="action-btn"
            >
              <i className={`bi ${event.like ? 'bi-heart-fill' : 'bi-heart'}`}></i> Like
            </Button>
            <Button 
              variant="primary" 
              onClick={handleBuyTicket}
              disabled={isUpdating || isSoldOut}
              className="action-btn"
            >
              <i className="bi bi-cart-fill"></i> Book
            </Button>
          </div>
          <div className="action-row">
            <Button 
              variant="success" 
              onClick={handleEdit}
              disabled={isUpdating}
              className="action-btn"
            >
              <i className="bi bi-pencil-fill"></i> Update
            </Button>
            <Button 
              variant="danger" 
              onClick={handleDelete}
              disabled={isUpdating}
              className="action-btn"
            >
              <i className="bi bi-trash-fill"></i> Delete
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default Event;
