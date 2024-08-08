import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Nav from "react-bootstrap/Nav"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import "bootstrap/dist/css/bootstrap.min.css"
import LogoProntoNoleggio from "../NavBar/img/ProntoNoleggioWhite.svg"

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white py-4">
      <Container>
        <Row>
          <Col md={4}>
            <div className="d-flex flex-column-reverse align-items-end">
              <div className="">
                <img src={LogoProntoNoleggio} alt="Logo Pronto Noleggio" />
              </div>
              <div>
                <h5>Chi Siamo</h5>
                <p>
                  Pronto Noleggio è il tuo partner di fiducia per il noleggio di auto a prezzi accessibili. Offriamo
                  un'ampia gamma di veicoli per soddisfare ogni tua esigenza, con un servizio clienti impeccabile e
                  prenotazioni online semplici e sicure. Che tu abbia bisogno di un'auto per un evento speciale, un
                  viaggio di lavoro o una vacanza, siamo qui per rendere il tuo viaggio indimenticabile.
                </p>
              </div>
            </div>
          </Col>
          <Col md={4}>
            <h5>Link Rapidi</h5>
            <Nav className="flex-column">
              <Nav.Link href="/" className="text-white">
                Home
              </Nav.Link>
              <Nav.Link href="/veicoli" className="text-white">
                Trova Veicolo
              </Nav.Link>
              <Nav.Link href="/contattaci" className="text-white">
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
