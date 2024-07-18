import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Nav from "react-bootstrap/Nav"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import "bootstrap/dist/css/bootstrap.min.css"

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4">
      <Container>
        <Row>
          <Col md={4}>
            <h5>Chi Siamo</h5>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus beatae dolores doloremque impedit
              mollitia doloribus natus totam suscipit similique ipsa recusandae debitis numquam perferendis nesciunt ad,
              voluptatibus placeat quaerat laudantium?
            </p>
          </Col>
          <Col md={4}>
            <h5>Link Rapidi</h5>
            <Nav className="flex-column">
              <Nav.Link href="#home" className="text-white">
                Home
              </Nav.Link>
              <Nav.Link href="#services" className="text-white">
                Servizi
              </Nav.Link>
              <Nav.Link href="#about" className="text-white">
                About Us
              </Nav.Link>
              <Nav.Link href="#contact" className="text-white">
                Contattaci
              </Nav.Link>
            </Nav>
          </Col>
          <Col md={4}>
            <h5>Contattaci</h5>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Indirizzo Email</Form.Label>
                <Form.Control type="email" placeholder="Inserisci la tua email" className="mb-2" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Iscriviti
              </Button>
            </Form>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col className="text-center">
            <p>&copy; {new Date().getFullYear()} ProntoNoleggio. Tutti i diritti riservati.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
