import React, { useState, useEffect } from "react"
import { Container, Row, Col, Card, Spinner, Alert, Button, Modal, Form, Pagination } from "react-bootstrap"
import { updatePrenotazione, deletePrenotazione, fetchMePrenotazioni } from "../../../../api"
import { format } from "date-fns"

const CronologiaPrenotazioni = () => {
  const [prenotazioni, setPrenotazioni] = useState([])
  const [caricamento, setCaricamento] = useState(true)
  const [errore, setErrore] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedPrenotazione, setSelectedPrenotazione] = useState(null)
  const [modificaDataInizio, setModificaDataInizio] = useState("")
  const [modificaDataFine, setModificaDataFine] = useState("")
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [totaleGiorni, setTotaleGiorni] = useState(0)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const fetchPrenotazioni = async () => {
      try {
        const response = await fetchMePrenotazioni(page)
        setPrenotazioni(response.content)
        setTotalPages(response.page.totalPages)
        setCaricamento(false)
      } catch (error) {
        setErrore("Errore durante il caricamento della cronologia delle tue prenotazioni.")
        setCaricamento(false)
      }
    }

    fetchPrenotazioni()
  }, [page])

  useEffect(() => {
    const calculateTotal = () => {
      let totalDays = 0
      const total = prenotazioni.reduce((total, prenotazione) => {
        const startDate = new Date(prenotazione.dataInizio)
        const endDate = new Date(prenotazione.dataFine)
        const diffTime = Math.abs(endDate - startDate)
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        totalDays += diffDays
        return total + diffDays * prenotazione.veicolo.tariffaGiornaliera
      }, 0)
      setTotaleGiorni(totalDays)
      setTotal(total)
    }

    calculateTotal()
  }, [prenotazioni])

  const handleModifica = (prenotazione) => {
    setSelectedPrenotazione(prenotazione)
    setModificaDataInizio(prenotazione.dataInizio)
    setModificaDataFine(prenotazione.dataFine)
    setShowModal(true)
  }

  const handleElimina = async () => {
    try {
      await deletePrenotazione(`/prenotazioni/cancella/${selectedPrenotazione.id}`)
      setPrenotazioni(prenotazioni.filter((prenotazione) => prenotazione.id !== selectedPrenotazione.id))
      setSuccess("Prenotazione eliminata con successo.")
      setError("")
      setTimeout(() => {
        setShowDeleteModal(false)
        setError("")
        setSuccess("")
      }, 1500)
    } catch (error) {
      setSuccess("")
      setError("Errore durante l'eliminazione della prenotazione.")
      setTimeout(() => {
        setShowDeleteModal(false)
        setError("")
        setSuccess("")
      }, 1500)
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
      setSuccess("Prenotazione modificata con successo.")
      setError("")
      setTimeout(() => {
        setShowModal(false)
        setError("")
        setSuccess("")
      }, 1500)
    } catch (error) {
      setError("Errore durante la modifica della prenotazione.")
      setSuccess("")
      setTimeout(() => {
        setShowModal(false)
        setError("")
        setSuccess("")
      }, 1500)
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
      <Row>
        <Col md={12}>
          <h3 className="mb-3 mt-3">Cronologia Prenotazioni</h3>
          {prenotazioni.length === 0 ? (
            <Alert variant="info">Nessuna prenotazione trovata.</Alert>
          ) : (
            prenotazioni.map((prenotazione) => (
              <Card key={prenotazione.id} className="mb-3 shadow-sm">
                <Card.Header className="d-flex justify-content-between align-items-center">
                  <div>{/* <strong>Prenotazione ID:</strong> {prenotazione.id} */}</div>
                  <div className="d-flex">
                    <Button variant="warning" size="sm" onClick={() => handleModifica(prenotazione)} className="me-2">
                      Modifica
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => {
                        setSelectedPrenotazione(prenotazione)
                        setShowDeleteModal(true)
                      }}
                    >
                      Elimina
                    </Button>
                  </div>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col md={4}>
                      <img
                        src={prenotazione.veicolo.immagini}
                        alt={`${prenotazione.veicolo.marca} ${prenotazione.veicolo.modello}`}
                        className="img-fluid rounded-3"
                        style={{ width: "100%", height: "300px", objectFit: "cover" }}
                      />
                    </Col>
                    <Col md={8}>
                      <div className="d-flex justify-content-around mb-3 date-container">
                        <div className="text-center date-info">
                          <p className="m-0">
                            <strong>Numero Prenotazione:</strong>
                          </p>
                          <p className="m-0">{prenotazione.id}</p>
                        </div>
                      </div>
                      <div className="d-flex justify-content-around mb-3 date-container">
                        <div className="text-center date-info">
                          <p className="m-0">
                            <strong>Nome:</strong>
                          </p>
                          <p className="m-0">
                            {prenotazione.veicolo.marca} {prenotazione.veicolo.modello}
                          </p>
                        </div>
                        <div className="text-center date-info">
                          <p className="m-0">
                            <strong>Anno:</strong>
                          </p>
                          <p className="m-0">{prenotazione.veicolo.anno}</p>
                        </div>
                        <div className="text-center date-info">
                          <p className="m-0">
                            <strong>Categoria:</strong>
                          </p>
                          <p className="m-0">{prenotazione.veicolo.categoria}</p>
                        </div>
                      </div>
                      <div className="d-flex justify-content-around mb-3 date-container">
                        <div className="text-center date-info">
                          <p className="m-0">
                            <strong>Tariffa Giornaliera:</strong>
                          </p>
                          <p className="m-0">{prenotazione.veicolo.tariffaGiornaliera}€</p>
                        </div>

                        <div className="text-center date-info">
                          <p className="m-0">
                            <strong>Totale: </strong>
                            {totaleGiorni} giorni
                            <br />
                            <p className="fs-6">{total}€ iva inclusa</p>
                          </p>
                        </div>

                        <div className="text-center date-info">
                          <p className="m-0">
                            <strong>Prenotata Il:</strong>
                          </p>
                          <p className="m-0">{format(new Date(prenotazione.dataCreazione), "dd/MM/yyyy HH:mm")}</p>
                        </div>
                      </div>
                      <div className="d-flex justify-content-around mb-3 date-container">
                        <div className="text-center date-info">
                          <p className="m-0">
                            <strong>Data Inizio:</strong>
                          </p>
                          <p className="m-0">{format(new Date(prenotazione.dataInizio), "dd/MM/yyyy")}</p>
                        </div>
                        <div className="text-center date-info">
                          <p className="m-0">
                            <strong>Data Fine:</strong>
                          </p>
                          <p className="m-0">{format(new Date(prenotazione.dataFine), "dd/MM/yyyy")}</p>
                        </div>
                      </div>
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
      <Modal show={showModal} onHide={() => setShowModal(false)}>
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
          </Form>
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
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
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
          <Button variant="danger" onClick={handleElimina}>
            Elimina
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default CronologiaPrenotazioni
