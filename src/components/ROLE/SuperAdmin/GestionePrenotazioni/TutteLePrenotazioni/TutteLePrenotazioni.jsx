import React, { useState, useEffect } from "react"
import { Container, Row, Col, Card, Spinner, Alert, Button, Modal, Form, Toast, Pagination } from "react-bootstrap"
import { fetchAllPrenotazioni, updatePrenotazione, deletePrenotazione } from "../../../../../../api"
import { format } from "date-fns"

const TutteLePrenotazioni = () => {
  const [prenotazioni, setPrenotazioni] = useState([])
  const [caricamento, setCaricamento] = useState(true)
  const [errore, setErrore] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedPrenotazione, setSelectedPrenotazione] = useState(null)
  const [modificaDataInizio, setModificaDataInizio] = useState("")
  const [modificaDataFine, setModificaDataFine] = useState("")
  const [toast, setToast] = useState({ show: false, message: "", type: "" })
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const fetchPrenotazioni = async () => {
      try {
        const response = await fetchAllPrenotazioni(page)
        setPrenotazioni(response.content)
        setTotalPages(response.page.totalPages)
        setCaricamento(false)
      } catch (error) {
        setErrore("Errore durante il caricamento della cronologia delle prenotazioni.")
        setCaricamento(false)
      }
    }

    fetchPrenotazioni()
  }, [page])

  const handleModifica = (prenotazione) => {
    setSelectedPrenotazione(prenotazione)
    setModificaDataInizio(prenotazione.dataInizio)
    setModificaDataFine(prenotazione.dataFine)
    setShowModal(true)
  }

  const handleElimina = (prenotazione) => {
    setSelectedPrenotazione(prenotazione)
    setShowDeleteModal(true)
  }

  const confirmElimina = async () => {
    try {
      await deletePrenotazione(`/prenotazioni/cancella/${selectedPrenotazione.id}`)
      setPrenotazioni(prenotazioni.filter((prenotazione) => prenotazione.id !== selectedPrenotazione.id))
      setToast({ show: true, message: "Prenotazione eliminata con successo.", type: "success" })
      setShowDeleteModal(false)
    } catch (error) {
      setToast({ show: true, message: "Errore durante l'eliminazione della prenotazione.", type: "danger" })
      setShowDeleteModal(false)
    }
  }

  const handleSubmitModifica = async () => {
    try {
      const updatedPrenotazione = {
        veicoloId: selectedPrenotazione.veicolo.id,
        dataInizio: modificaDataInizio,
        dataFine: modificaDataFine,
      }
      await updatePrenotazione(selectedPrenotazione.id, updatedPrenotazione)
      setPrenotazioni(
        prenotazioni.map((prenotazione) =>
          prenotazione.id === selectedPrenotazione.id ? { ...prenotazione, ...updatedPrenotazione } : prenotazione
        )
      )
      setToast({ show: true, message: "Prenotazione modificata con successo.", type: "success" })
      setShowModal(false)
    } catch (error) {
      setToast({ show: true, message: "Errore durante la modifica della prenotazione.", type: "danger" })
      setShowModal(false)
    }
  }

  const handlePageChange = (newPage) => {
    setPage(newPage)
  }

  if (caricamento) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Caricamento...</span>
        </Spinner>
      </Container>
    )
  }

  if (errore) {
    return (
      <Container className="py-5 text-center">
        <Alert variant="danger">{errore}</Alert>
      </Container>
    )
  }

  return (
    <Container>
      <Toast onClose={() => setToast({ show: false, message: "", type: "" })} show={toast.show} delay={3000} autohide>
        <Toast.Body className={`text-${toast.type}`}>{toast.message}</Toast.Body>
      </Toast>
      <Row>
        <Col md={12}>
          <h1 className="text-center mb-4">Cronologia di tutte le prenotazioni</h1>
          {prenotazioni.length === 0 ? (
            <Alert variant="info" className="text-center">
              Nessuna prenotazione trovata.
            </Alert>
          ) : (
            prenotazioni.map((prenotazione) => (
              <Card key={prenotazione.id} className="mb-3 shadow-sm">
                <Card.Header className="d-flex justify-content-between align-items-center">
                  <div></div>
                  <div className="d-flex">
                    <Button variant="warning" size="sm" onClick={() => handleModifica(prenotazione)} className="me-2">
                      <i className="bi bi-pencil-fill"></i> Modifica
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => handleElimina(prenotazione)}>
                      <i className="bi bi-trash-fill"></i> Elimina
                    </Button>
                  </div>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col md={4} className="d-flex align-items-center justify-content-center">
                      <img
                        src={prenotazione.veicolo.immagini}
                        alt={`${prenotazione.veicolo.marca} ${prenotazione.veicolo.modello}`}
                        className="img-fluid rounded-3"
                        style={{ maxHeight: "200px", objectFit: "cover" }}
                      />
                    </Col>
                    <Col md={8}>
                      <Row>
                        <Col md={4} className="mb-3">
                          <h5 className="text-primary">Dati Veicolo</h5>
                          <div className="d-flex justify-content-around date-container">
                            <div className="date-info">
                              <p>
                                <strong>Veicolo Id:</strong> {prenotazione.veicolo.id}
                              </p>
                              <p>
                                <strong>Nome:</strong> {prenotazione.veicolo.marca} {prenotazione.veicolo.modello}
                              </p>
                              <p>
                                <strong>Anno:</strong> {prenotazione.veicolo.anno}
                              </p>
                              <p>
                                <strong>Categoria:</strong> {prenotazione.veicolo.categoria}
                              </p>
                              <p>
                                <strong>Tipo Veicolo:</strong> {prenotazione.veicolo.tipoVeicolo}
                              </p>
                              <p>
                                <strong>Targa:</strong> {prenotazione.veicolo.targa}
                              </p>
                              <p>
                                <strong>Posizione:</strong> {prenotazione.veicolo.posizione}
                              </p>
                              <p>
                                <strong>Tariffa Giornaliera:</strong> €{prenotazione.veicolo.tariffaGiornaliera}
                              </p>
                            </div>
                          </div>
                        </Col>
                        <Col md={4} className="mb-3">
                          <h5 className="text-primary">Dati Utente</h5>
                          <div className="d-flex justify-content-around date-container">
                            <div className="date-info">
                              <p>
                                <strong>Utente Id:</strong> {prenotazione.utente.id}
                              </p>
                              <p>
                                <strong>Nome:</strong> {prenotazione.utente.nome} {prenotazione.utente.cognome}
                              </p>
                              <p>
                                <strong>Email:</strong> {prenotazione.utente.email}
                              </p>
                              <p>
                                <strong>Telefono:</strong> {prenotazione.utente.telefono}
                              </p>
                              <p>
                                <strong>Codice Fiscale:</strong> {prenotazione.utente.codiceFiscale}
                              </p>
                              <p>
                                <strong>Patente:</strong> {prenotazione.utente.patente}
                              </p>
                            </div>
                          </div>
                        </Col>
                        <Col md={4} className="mb-3">
                          <h5 className="text-primary">Dati Prenotazione</h5>
                          <div className="d-flex justify-content-around date-container">
                            <div className="date-info">
                              <p>
                                <strong>Prenotazione Id:</strong> {prenotazione.id}
                              </p>
                              <p>
                                <strong>Data Inizio:</strong> {format(new Date(prenotazione.dataInizio), "dd/MM/yyyy")}
                              </p>
                              <p>
                                <strong>Data Fine:</strong> {format(new Date(prenotazione.dataFine), "dd/MM/yyyy")}
                              </p>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            ))
          )}
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
        </Col>
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Modifica Prenotazione</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="modificaDataInizio">
              <Form.Label>Data Inizio:</Form.Label>
              <Form.Control
                type="date"
                value={modificaDataInizio}
                onChange={(e) => setModificaDataInizio(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="modificaDataFine">
              <Form.Label>Data Fine:</Form.Label>
              <Form.Control
                type="date"
                value={modificaDataFine}
                onChange={(e) => setModificaDataFine(e.target.value)}
              />
            </Form.Group>
          </Form>
          {success && (
            <Alert variant="success" className="mt-3">
              {success}
            </Alert>
          )}
          {error && (
            <Alert variant="danger" className="mt-3">
              {error}
            </Alert>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Annulla
          </Button>
          <Button variant="primary" onClick={handleSubmitModifica}>
            Salva Modifiche
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Conferma Eliminazione</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="confirm-message mb-3">
            <p className="m-0">
              <i className="bi bi-question-circle-fill me-2"></i>
              Sei sicuro di voler eliminare questa prenotazione?
            </p>
          </div>
          {success && (
            <Alert variant="success" className="mt-3">
              {success}
            </Alert>
          )}
          {error && (
            <Alert variant="danger" className="mt-3">
              {error}
            </Alert>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Annulla
          </Button>
          <Button variant="danger" onClick={confirmElimina}>
            Elimina
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default TutteLePrenotazioni
