import React, { useState, useEffect } from "react"
import { Container, Row, Col, Table, Spinner, Alert, Button, Modal, Form, Toast, Pagination } from "react-bootstrap"
import { fetchWithToken, updatePrenotazione, deletePrenotazione } from "../../../../../../api"
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
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)
  const [totalElements, setTotalElements] = useState(0)

  const [searchParams, setSearchParams] = useState({
    dataCreazione: "",
    dataInizio: "",
    dataFine: "",
    targaVeicolo: "",
    tipoVeicolo: "",
    posizioneVeicolo: "",
    nomeUtente: "",
    cognomeUtente: "",
    emailUtente: "",
    telefonoUtente: "",
  })

  const handleChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value })
  }

  const handleReset = (e) => {
    setSearchParams({
      dataCreazione: "",
      dataInizio: "",
      dataFine: "",
      targaVeicolo: "",
      tipoVeicolo: "",
      posizioneVeicolo: "",
      nomeUtente: "",
      cognomeUtente: "",
      emailUtente: "",
      telefonoUtente: "",
    })
    fetchPrenotazioni({})
  }

  const fetchPrenotazioni = async (params = {}, page = 0) => {
    setCaricamento(false)
    setErrore("")
    try {
      const filteredParams = Object.fromEntries(Object.entries(params).filter(([key, value]) => value !== ""))
      const queryParams = new URLSearchParams({ ...filteredParams, page })
      const response = await fetchWithToken(
        `/prenotazioni/tuttelaprenotazioni?page=${page}&size=20&${queryParams.toString()}`
      )
      console.log("Response data:", response)
      setPrenotazioni(response.content)
      setTotalPages(response.page.totalPages)
      setTotalElements(response.page.totalElements)
      setCaricamento(false)
    } catch (error) {
      setErrore("Errore durante il caricamento della cronologia delle prenotazioni.")
      setCaricamento(false)
    }
  }

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
      setTotalElements(totalElements - 1)
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
    fetchPrenotazioni(searchParams, newPage)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    setPage(0)
    fetchPrenotazioni(searchParams, 0)
  }

  useEffect(() => {
    fetchPrenotazioni()
  }, [page])

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
    <Container className="mt-2 containerMod1">
      <Toast onClose={() => setToast({ show: false, message: "", type: "" })} show={toast.show} delay={3000} autohide>
        <Toast.Body className={`text-${toast.type}`}>{toast.message}</Toast.Body>
      </Toast>
      <Row>
        <Col md={12}>
          <h1 className="text-center mb-4 font-weight-bold text-primary shadow-sm">
            Cronologia di tutte le prenotazioni - {totalElements}
          </h1>
          <Form onSubmit={handleSearch} className="mb-4">
            <Row className="mb-3">
              <Col md={2}>
                <Form.Label>Data Creazione</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Data Creazione"
                  name="dataCreazione"
                  value={searchParams.dataCreazione}
                  onChange={handleChange}
                  className="mb-2"
                />
              </Col>
              <Col md={2}>
                <Form.Label>Data Inizio</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Data Inizio"
                  name="dataInizio"
                  value={searchParams.dataInizio}
                  onChange={handleChange}
                  className="mb-2"
                />
              </Col>
              <Col md={2}>
                <Form.Label>Data Fine</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Data Fine"
                  name="dataFine"
                  value={searchParams.dataFine}
                  onChange={handleChange}
                  className="mb-2"
                />
              </Col>
              <Col md={2}>
                <Form.Group>
                  <Form.Label>Tipo Veicolo</Form.Label>
                  <Form.Control as="select" name="tipoVeicolo" value={searchParams.tipoVeicolo} onChange={handleChange}>
                    <option value="">Tutti</option>
                    <option value="AUTO">Auto</option>
                    <option value="MOTO">Moto</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={2}>
                <Form.Group>
                  <Form.Label>Località</Form.Label>
                  <Form.Control
                    as="select"
                    name="posizioneVeicolo"
                    value={searchParams.posizioneVeicolo}
                    onChange={handleChange}
                  >
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
              <Col md={2}>
                <Form.Label>Targa Veicolo</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Inserisci Targa Veicolo"
                  name="targaVeicolo"
                  value={searchParams.targaVeicolo}
                  onChange={handleChange}
                  className="mb-2"
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={3}>
                <Form.Label>Nome Utente</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Inserisci Nome Utente"
                  name="nomeUtente"
                  value={searchParams.nomeUtente}
                  onChange={handleChange}
                  className="mb-2"
                />
              </Col>
              <Col md={3}>
                <Form.Label>Cognome Utente</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Inserisci Cognome Utente"
                  name="cognomeUtente"
                  value={searchParams.cognomeUtente}
                  onChange={handleChange}
                  className="mb-2"
                />
              </Col>
              <Col md={3}>
                <Form.Label>Email Utente</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Inserisci Email Utente"
                  name="emailUtente"
                  value={searchParams.emailUtente}
                  onChange={handleChange}
                  className="mb-2"
                />
              </Col>
              <Col md={3}>
                <Form.Label>Telefono Utente</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Inserisci Telefono Utente"
                  name="telefonoUtente"
                  value={searchParams.telefonoUtente}
                  onChange={handleChange}
                  className="mb-2"
                />
              </Col>
            </Row>
            <div className="d-flex mt-3 justify-content-center">
              <Button variant="primary" type="submit">
                Cerca
              </Button>
              <Button variant="secondary" type="button" className="ms-2" onClick={handleReset}>
                Resetta
              </Button>
            </div>
            <Pagination className="justify-content-center mt-4">
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
          </Form>
          {prenotazioni.length === 0 ? (
            <Alert variant="info" className="text-center">
              Nessuna prenotazione trovata.
            </Alert>
          ) : (
            <>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Prenotazione Id</th>
                    <th>Data Creazione</th>
                    <th>Data Inizio</th>
                    <th>Data Fine</th>
                    <th>Veicolo Id</th>
                    <th>Targa</th>
                    <th>Tipo Veicolo</th>
                    <th>Tariffa Giornaliera</th>
                    <th>Posizione</th>
                    <th>Utente Id</th>
                    <th>Nome Completo</th>
                    <th>Email</th>
                    <th>Telefono</th>
                    <th>Modifica</th>
                    <th>Elimina</th>
                  </tr>
                </thead>
                <tbody>
                  {prenotazioni.map((prenotazione) => (
                    <tr key={prenotazione.id}>
                      <td>{prenotazione.id}</td>
                      <td>{format(new Date(prenotazione.dataCreazione), "dd/MM/yyyy HH:mm")}</td>
                      <td>{format(new Date(prenotazione.dataInizio), "dd/MM/yyyy")}</td>
                      <td>{format(new Date(prenotazione.dataFine), "dd/MM/yyyy")}</td>
                      <td>{prenotazione.veicolo.id}</td>
                      <td>{prenotazione.veicolo.targa}</td>
                      <td>{prenotazione.veicolo.tipoVeicolo}</td>
                      <td>{prenotazione.veicolo.tariffaGiornaliera} €</td>
                      <td>{prenotazione.veicolo.posizione}</td>
                      <td>{prenotazione.utente.id}</td>
                      <td>
                        {prenotazione.utente.nome} {prenotazione.utente.cognome}
                      </td>
                      <td>{prenotazione.utente.email}</td>
                      <td>{prenotazione.utente.telefono}</td>
                      <td>
                        <Button
                          variant="warning"
                          size="sm"
                          onClick={() => handleModifica(prenotazione)}
                          className="me-2"
                        >
                          <i className="bi bi-pencil-fill"></i> Modifica
                        </Button>
                      </td>
                      <td>
                        <Button variant="danger" size="sm" onClick={() => handleElimina(prenotazione)}>
                          <i className="bi bi-trash-fill"></i> Elimina
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Pagination className="justify-content-center mt-4">
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
            </>
          )}
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
