import React, { useState, useEffect } from "react"
import { Form, Button, Row, Col, Container, Card, Modal, Alert, Pagination } from "react-bootstrap"
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

  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const size = 24

  const [totalElements, setTotalElements] = useState(0)

  useEffect(() => {
    const fetchUtente = async () => {
      try {
        const user = await fetchWithToken("/utente/me")
        setUser(user)
      } catch (error) {
        setErrore("Errore durante il caricamento del profilo.")
      }
    }
    fetchUtente()
    fetchVeicoli()
  }, [page, pickupDate, dropoffDate, location, carType, carCategory, minPrezzo, maxPrezzo])

  const fetchVeicoli = async () => {
    const params = new URLSearchParams()
    if (pickupDate) params.append("dataInizio", pickupDate)
    if (dropoffDate) params.append("dataFine", dropoffDate)
    if (location) params.append("posizione", location)
    if (carType) params.append("tipoVeicolo", carType)
    if (carCategory) params.append("categoria", carCategory)
    if (minPrezzo) params.append("minPrezzo", minPrezzo)
    if (maxPrezzo) params.append("maxPrezzo", maxPrezzo)

    try {
      const veicoliFiltrati = await fetchGet(`/veicoli/search?page=${page}&size=${size}&${params.toString()}`)
      setTotalPages(veicoliFiltrati.page.totalPages)
      setVeicoli(veicoliFiltrati.content)
      setTotalElements(veicoliFiltrati.page.totalElements)
      setCaricamento(false)
    } catch (error) {
      console.error("Errore nella ricerca dei veicoli:", error)
      setErrore("Errore durante il caricamento dei veicoli.")
      setCaricamento(false)
    }
  }

  const handleFilter = (e) => {
    e.preventDefault()
    setPage(0)
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
      await fetchWithToken("/prenotazioni/crea", {
        method: "POST",
        body: JSON.stringify(prenotazione),
      })
      setPrenotazioneSuccesso("Prenotazione effettuata con successo!")
      setPrenotazioneErrore("")
      setPage(0)
      fetchVeicoli()
      setTimeout(() => {
        setShowModal(false)
        setPrenotazioneSuccesso("")
        setPrenotazioneErrore("")
      }, 1000)
    } catch (error) {
      setPrenotazioneErrore("Veicolo non disponibile per la data selezionata.")
      setPrenotazioneSuccesso("")
      fetchVeicoli()
      setTimeout(() => {
        setShowModal(false)
        setPrenotazioneSuccesso("")
        setPrenotazioneErrore("")
      }, 1500)
    }
  }

  const handlePageChange = (newPage) => {
    setPage(newPage)
  }

  const handleReset = (e) => {
    e.preventDefault()
    setPickupDate(today)
    setDropoffDate(nextWeek)
    setLocation("")
    setCarType("")
    setCarCategory("")
    setMinPrezzo("")
    setMaxPrezzo("")
    setPage(0)
    fetchVeicoli()
  }

  return (
    <div className="">
      <div className="rounded-5 p-4 filter-form-container shadow">
        <Container className="pickup-wrapper wow fadeInUp">
          <h1 className="text-center mb-4 font-weight-bold text-primary">Risultati di ricerca - {totalElements}</h1>
          <Form onSubmit={handleFilter}>
            <Row>
              <Col xs={12} sm={12} md={12} lg={12} xl={4} className="mb-3">
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
              <Col xs={12} sm={6} md={6} lg={6} xl={4} className="mb-3">
                <Form.Group controlId="formPickupDate">
                  <Form.Label>Data Inizio:</Form.Label>
                  <Form.Control type="date" value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} />
                </Form.Group>
              </Col>
              <Col xs={12} sm={6} md={6} lg={6} xl={4} className="mb-3">
                <Form.Group controlId="formDropoffDate">
                  <Form.Label>Data Fine:</Form.Label>
                  <Form.Control type="date" value={dropoffDate} onChange={(e) => setDropoffDate(e.target.value)} />
                </Form.Group>
              </Col>
              <Col xs={12} sm={12} md={6} lg={12} xl={6} className="mb-3">
                <Form.Group controlId="formCarType">
                  <Form.Label>Tipo Veicolo:</Form.Label>
                  <Form.Control as="select" value={carType} onChange={(e) => setCarType(e.target.value)}>
                    <option value="">Tutti</option>
                    <option value="AUTO">Auto</option>
                    <option value="MOTO">Moto</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col xs={12} sm={12} md={6} lg={12} xl={6} className="mb-3">
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
              <Col xs={12} sm={6} md={6} lg={6} xl={6} className="mb-3">
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
              <Col xs={12} sm={6} md={6} lg={6} xl={6} className="mb-3">
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
          </Form>
          <div className="d-flex mt-3 justify-content-center">
            <Button onClick={handleReset} variant="secondary" type="button" className="ms-2">
              Resetta
            </Button>
          </div>
        </Container>
      </div>
      <Container className="mt-5 containerMod2">
        {caricamento ? (
          <p>Caricamento in corso...</p>
        ) : errore ? (
          <p>Errore nel caricamento dei veicoli: {errore}</p>
        ) : (
          <Row>
            <Pagination className="justify-content-center">
              <Pagination.First onClick={() => handlePageChange(0)} disabled={page === 0} />
              <Pagination.Prev onClick={() => handlePageChange(page - 1)} disabled={page === 0} />
              {Array.from({ length: totalPages }).map((_, index) => (
                <Pagination.Item key={index} active={index === page} onClick={() => handlePageChange(index)}>
                  {index + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next onClick={() => handlePageChange(page + 1)} disabled={page === totalPages - 1} />
              <Pagination.Last onClick={() => handlePageChange(totalPages - 1)} disabled={page === totalPages - 1} />
            </Pagination>
            {veicoli.map((veicolo) => (
              <Col xs={12} sm={6} md={4} lg={3} xl={3} xxl={2} key={veicolo.id} className="mb-4">
                <Card className="vehicle-card shadow-sm h-100">
                  <Card.Img
                    variant="top"
                    src={veicolo.immagini}
                    alt={`${veicolo.marca} ${veicolo.modello}`}
                    className="vehicle-card-img"
                  />
                  <Card.Body>
                    <Card.Title className="vehicle-title">
                      {veicolo.marca} {veicolo.modello}
                    </Card.Title>
                    <Card.Text className="vehicle-info">
                      <hr />
                      <strong>Data Creazione Veicolo:</strong> {veicolo.dataCreazioneVeicolo} <br />
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
            <Pagination className="justify-content-center">
              <Pagination.First onClick={() => handlePageChange(0)} disabled={page === 0} />
              <Pagination.Prev onClick={() => handlePageChange(page - 1)} disabled={page === 0} />
              {Array.from({ length: totalPages }).map((_, index) => (
                <Pagination.Item key={index} active={index === page} onClick={() => handlePageChange(index)}>
                  {index + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next onClick={() => handlePageChange(page + 1)} disabled={page === totalPages - 1} />
              <Pagination.Last onClick={() => handlePageChange(totalPages - 1)} disabled={page === totalPages - 1} />
            </Pagination>
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
