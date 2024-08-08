import React from "react"
import { Container, Row, Col, Form, Button } from "react-bootstrap"
import "./Contatti.css"

const Contatti = () => {
  return (
    <Container className="mt-4">
      <h1 className="mt-2 mb-4">Contatti</h1>
      <Row>
        <Col md={6}>
          <h2>Informazioni di Contatto</h2>
          <p>
            <strong>Indirizzo:</strong> Via XX Settembre, Patti, Italy 98066
          </p>
          <p>
            <strong>Telefono:</strong> +39 3488637581
          </p>
          <p>
            <strong>Email:</strong> info@ProntoNoleggio.com
            <hr />
          </p>
          <h2>Orari di Apertura</h2>
          <p>
            Lunedì - Venerdì: 9:00 - 20:00
            <br />
            Sabato: 9:00 - 18:00
            <br />
            Domenica: Chiuso
          </p>
          <hr />
        </Col>
        <Col md={6}>
          <h2>Invia un Messaggio</h2>
          <Form>
            <Form.Group controlId="formName" className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control type="text" placeholder="Inserisci il tuo nome" required />
            </Form.Group>
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Inserisci la tua email" required />
            </Form.Group>
            <Form.Group controlId="formMessage" className="mb-3">
              <Form.Label>Messaggio</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Inserisci il tuo messaggio" required />
            </Form.Group>
            <Button variant="primary" type="submit">
              Invia
            </Button>
          </Form>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col className="mb-5">
          <h2>Dove Siamo</h2>
          <iframe
            title="Studio di Tatuaggi"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3138.085618326148!2d14.962444076317416!3d38.138202091141636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13169c43232474b5%3A0x5d1746ba15b3ab5a!2sVia%20XX%20Settembre%2C%2098066%20Patti%20ME!5e0!3m2!1sit!2sit!4v1723110845005!5m2!1sit!2sit"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </Col>
      </Row>
    </Container>
  )
}

export default Contatti
