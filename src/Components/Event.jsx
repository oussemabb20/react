import React from 'react';
import { Card } from 'react-bootstrap';
import placeholder from '../assets/placeholder.jpg';

function Event({ name, price, nbTickets, nbParticipants }) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={placeholder} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>Price : {price}</Card.Text>
        <Card.Text>Number of tickets : {nbTickets}</Card.Text>
        <Card.Text>Number of participants : {nbParticipants}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Event;
