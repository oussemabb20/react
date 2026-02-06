import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Event from './Event.jsx';

function Events() {
  return (
    <Container>
      <Row>
        <Col>
          <Event 
            name="Festival international de Carthage"
            price={30}
            nbTickets={10}
            nbParticipants={10}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default Events;
