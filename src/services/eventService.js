import axios from 'axios';

const API_URL = 'http://localhost:3001/events';

// Récupérer tous les événements
export const getAllEvents = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des événements:', error);
    throw error;
  }
};

// Récupérer un événement par ID
export const getEventById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération de l'événement ${id}:`, error);
    throw error;
  }
};

// Créer un nouvel événement
export const createEvent = async (eventData) => {
  try {
    const response = await axios.post(API_URL, eventData);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la création de l\'événement:', error);
    throw error;
  }
};

// Mettre à jour un événement
export const updateEvent = async (id, eventData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, eventData);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la mise à jour de l'événement ${id}:`, error);
    throw error;
  }
};

// Supprimer un événement
export const deleteEvent = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error(`Erreur lors de la suppression de l'événement ${id}:`, error);
    throw error;
  }
};

// Mettre à jour le statut "like" d'un événement
export const toggleLike = async (id, currentLikeStatus) => {
  try {
    const response = await axios.patch(`${API_URL}/${id}`, {
      like: !currentLikeStatus
    });
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la mise à jour du like pour l'événement ${id}:`, error);
    throw error;
  }
};

// Acheter des tickets (décrémenter nbTickets)
export const buyTickets = async (id, currentTickets, quantity = 1) => {
  try {
    const newTicketCount = Math.max(0, currentTickets - quantity);
    const response = await axios.patch(`${API_URL}/${id}`, {
      nbTickets: newTicketCount
    });
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de l'achat de tickets pour l'événement ${id}:`, error);
    throw error;
  }
};
