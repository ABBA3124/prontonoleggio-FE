import React, { useState, useEffect } from "react"
import { Form, Button, Row, Col, Container, Card, Modal, Alert } from "react-bootstrap"
import { fetchGet, fetchWithToken } from "../../../../api"
import "./INostriVeicoli.css"

const Veicoli = () => {
  const today = new Date().toISOString().split("T")[0]
  const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
  const [pickupDate, setPickupDate] = useState(today)
  const [dropoffDate, setDropoffDate] = useState(nextWeek)

  const [location, setLocation] = useState("")
  const [carType, setCarType] = useState("")
  const [carCategory, setCarCategory] = useState("")
  const [minPrezzo, setMinPrezzo] = useState("")
  const [maxPrezzo, setMaxPrezzo] = useState("")

  const [veicoli, setVeicoli] = useState([])
  const [caricamento, setCaricamento] = useState(true)
  const [errore, setErrore] = useState(null)
  const [user, setUser] = useState(null)
  const [prenotazioneSuccesso, setPrenotazioneSuccesso] = useState("")
  const [prenotazioneErrore, setPrenotazioneErrore] = useState("")

  const [showModal, setShowModal] = useState(false)
  const [selectedVeicolo, setSelectedVeicolo] = useState(null)

  useEffect(() => {
    const fetchUtente = async () => {
      try {
        const user = await fetchWithToken("/utente/me")
        setUser(user)
      } catch (error) {
        setErrore("Errore durante il caricamento del profilo.")
      }
    }

    const fetchVeicoli = async () => {
      try {
        const response = await fetchWithToken("/veicoli/disponibilita/disponibili")
        setVeicoli(response.content)
        setCaricamento(false)
      } catch (error) {
        setErrore("Errore durante il caricamento dei veicoli.")
        setCaricamento(false)
      }
    }

    fetchUtente()
    fetchVeicoli()
  }, [])

  const handleFilter = async (e) => {
    e.preventDefault()
    const params = new URLSearchParams()

    if (location) params.append("posizione", location)
    if (pickupDate) params.append("dataInizio", pickupDate)
    if (dropoffDate) params.append("dataFine", dropoffDate)
    if (carType) params.append("tipoVeicolo", carType)
    if (carCategory) params.append("categoria", carCategory)
    if (minPrezzo) params.append("minPrezzo", minPrezzo)
    if (maxPrezzo) params.append("maxPrezzo", maxPrezzo)

    try {
      const veicoliFiltrati = await fetchGet(`/veicoli/search?${params.toString()}`)
      setVeicoli(veicoliFiltrati.content)
    } catch (error) {
      console.error("Errore nella ricerca dei veicoli:", error)
    }
  }

  const handlePrenota = (veicolo) => {
    setSelectedVeicolo(veicolo)
    setShowModal(true)
  }

  const handleDettagli = (veicoloId) => {
    console.log(`Mostra dettagli veicolo con ID: ${veicoloId}`)
  }

  const handleSubmitPrenotazione = async () => {
    if (!user) {
      setPrenotazioneErrore("Utente non trovato.")
      return
    }

    const prenotazione = {
      veicoloId: selectedVeicolo.id,
      utenteId: user.id,
      dataInizio: pickupDate,
      dataFine: dropoffDate,
    }

    try {
      const response = await fetchWithToken("/prenotazioni/crea", {
        method: "POST",
        body: JSON.stringify(prenotazione),
      })
      setPrenotazioneSuccesso("Prenotazione effettuata con successo!")
      setPrenotazioneErrore("")
      setTimeout(() => {
        setPrenotazioneErrore("")
        setPrenotazioneSuccesso("")
        setShowModal(false)
      }, 2000)
    } catch (error) {
      setPrenotazioneErrore("Veicolo non disponibile per la data selezionata.")
      setPrenotazioneSuccesso("")
      setTimeout(() => {
        setPrenotazioneErrore("")
        setPrenotazioneSuccesso("")
        setShowModal(false)
      }, 2000)
    }
  }

  return (
    <div className="">
      <div className="rounded-5 bg-secondary m-4 p-3">
        <Container className="pickup-wrapper wow fadeInUp mt-4">
          <Form onSubmit={handleFilter}>
            <Row>
              <Col xs={12} sm={12} md={12} lg={12} xl={4}>
                <Form.Group controlId="formLocation">
                  <Form.Label>Località:</Form.Label>
                  <Form.Control as="select" value={location} onChange={(e) => setLocation(e.target.value)}>
                    <option value="">Tutte</option>
                    <option value="Milano">Milano</option>
                    <option value="Roma">Roma</option>
                    <option value="Napoli">Napoli</option>
                    <option value="Messina">Messina</option>
                    <option value="Catania">Catania</option>
                    <option value="Palermo">Palermo</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col xs={12} sm={6} md={6} lg={6} xl={4}>
                <Form.Group controlId="formPickupDate">
                  <Form.Label>Data Inizio:</Form.Label>
                  <Form.Control type="date" value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} />
                </Form.Group>
              </Col>
              <Col xs={12} sm={6} md={6} lg={6} xl={4}>
                <Form.Group controlId="formDropoffDate">
                  <Form.Label>Data Fine:</Form.Label>
                  <Form.Control type="date" value={dropoffDate} onChange={(e) => setDropoffDate(e.target.value)} />
                </Form.Group>
              </Col>
              <Col xs={12} sm={12} md={6} lg={12} xl={6}>
                <Form.Group controlId="formCarType">
                  <Form.Label>Tipo Veicolo:</Form.Label>
                  <Form.Control as="select" value={carType} onChange={(e) => setCarType(e.target.value)}>
                    <option value="">Tutti</option>
                    <option value="AUTO">Auto</option>
                    <option value="MOTO">Moto</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col xs={12} sm={12} md={6} lg={12} xl={6}>
                <Form.Group controlId="formCarCategory">
                  <Form.Label>Categoria Veicolo:</Form.Label>
                  <Form.Control as="select" value={carCategory} onChange={(e) => setCarCategory(e.target.value)}>
                    <option value="">Tutti</option>
                    <option value="Utilitaria">Utilitaria</option>
                    <option value="sportiva">Sportiva</option>
                    <option value="suv">SUV</option>
                    <option value="berlina">Berlina</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col xs={12} sm={6} md={6} lg={6} xl={6}>
                <Form.Group controlId="formMinPrezzo">
                  <Form.Label>Prezzo Minimo:</Form.Label>
                  <Form.Control
                    type="number"
                    value={minPrezzo}
                    onChange={(e) => setMinPrezzo(e.target.value)}
                    placeholder="Prezzo minimo"
                  />
                </Form.Group>
              </Col>
              <Col xs={12} sm={6} md={6} lg={6} xl={6}>
                <Form.Group controlId="formMaxPrezzo">
                  <Form.Label>Prezzo Massimo:</Form.Label>
                  <Form.Control
                    type="number"
                    value={maxPrezzo}
                    onChange={(e) => setMaxPrezzo(e.target.value)}
                    placeholder="Prezzo massimo"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button variant="primary" type="submit" className="mt-3">
              Filtra
            </Button>
          </Form>
        </Container>
      </div>
      <Container className="mt-5">
        {caricamento ? (
          <p>Caricamento in corso...</p>
        ) : errore ? (
          <p>Errore nel caricamento dei veicoli: {errore}</p>
        ) : (
          <Row>
            {veicoli.map((veicolo) => (
              <Col xs={12} sm={6} md={4} lg={3} key={veicolo.id} className="mb-4">
                <Card>
                  <Card.Img
                    variant="top"
                    src={veicolo.immagini}
                    alt={`${veicolo.marca} ${veicolo.modello}`}
                    className="vehicle-card-img"
                  />
                  <Card.Body>
                    <Card.Title>
                      {veicolo.marca} {veicolo.modello}
                    </Card.Title>
                    <Card.Text>
                      <hr />
                      <strong>Anno:</strong> {veicolo.anno} <br />
                      <strong>Categoria:</strong> {veicolo.categoria} <br />
                      <strong>Tariffa Giornaliera:</strong> €{veicolo.tariffaGiornaliera} <br />
                      <strong>Posizione:</strong> {veicolo.posizione} <br />
                      <strong>Posti:</strong> {veicolo.posti} <br />
                      <strong>Motorizzazione:</strong> {veicolo.motorizzazione} <br />
                      <strong>Trasmissione:</strong> {veicolo.trasmissione} <br />
                      <hr />
                      <strong>Disponibilità:</strong> {veicolo.disponibilita} <br />
                      <strong>Porte:</strong> {veicolo.porte} <br />
                      <strong>Aria Condizionata:</strong> {veicolo.ariaCondizionata ? "Sì" : "No"} <br />
                    </Card.Text>
                    <div className="d-flex justify-content-between">
                      <Button variant="primary" onClick={() => handlePrenota(veicolo)}>
                        Prenota Ora
                      </Button>
                      <Button variant="secondary" onClick={() => handleDettagli(veicolo.id)}>
                        Dettagli
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
      {selectedVeicolo && (
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Conferma Prenotazione</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Row>
                <Col xs={12} className="text-center mb-3">
                  <p className="mb-3 text-center price-info">
                    {selectedVeicolo.marca} {selectedVeicolo.modello}
                  </p>
                  <img
                    src={selectedVeicolo.immagini}
                    className="vehicle-card-img rounded-5 mb-3"
                    alt={`${selectedVeicolo.marca} ${selectedVeicolo.modello}`}
                  />
                  <p className="mb-3 text-center price-info">
                    <strong>Prezzo:</strong> €{selectedVeicolo.tariffaGiornaliera}
                  </p>
                  <div className="d-flex justify-content-around mb-3 date-container">
                    <div className="text-center date-info">
                      <p className="m-0">
                        <strong>Data Inizio:</strong>
                      </p>
                      <p className="m-0">{pickupDate}</p>
                    </div>
                    <div className="text-center date-info">
                      <p className="m-0">
                        <strong>Data Fine:</strong>
                      </p>
                      <p className="m-0">{dropoffDate}</p>
                    </div>
                  </div>
                  <div className="confirm-message mb-3">
                    <p className="m-0">
                      <i className="bi bi-question-circle-fill me-2"></i>
                      Vuoi confermare la prenotazione di questo veicolo?
                    </p>
                  </div>
                  {prenotazioneErrore && <Alert variant="danger">{prenotazioneErrore}</Alert>}
                  {prenotazioneSuccesso && <Alert variant="success">{prenotazioneSuccesso}</Alert>}
                </Col>
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer className="justify-content-between">
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Annulla
            </Button>
            <Button variant="primary" onClick={handleSubmitPrenotazione}>
              Conferma Prenotazione
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  )
}

export default Veicoli
