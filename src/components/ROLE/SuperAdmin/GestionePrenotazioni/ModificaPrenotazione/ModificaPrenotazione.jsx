import React, { useState } from "react"
import { Form, Button, Container, Spinner, Alert } from "react-bootstrap"
import { fetchWithToken } from "../../../../../../api"

const ModificaPrenotazione = () => {
  const [prenotazioneId, setPrenotazioneId] = useState("")
  const [veicoloId, setVeicoloId] = useState("")
  const [utenteId, setUtenteId] = useState("")
  const [dataInizio, setDataInizio] = useState("")
  const [dataFine, setDataFine] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleUpdate = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      const response = await fetchWithToken(`/prenotazioni/modifica/${prenotazioneId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ veicoloId, utenteId, dataInizio, dataFine }),
      })

      const responseText = await response.text()

      if (response.ok) {
        setSuccess("Prenotazione modificata con successo!")
      } else {
        setError(responseText)
      }
    } catch (error) {
      setError("Errore nella modifica della prenotazione.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Modifica Prenotazione</h1>
      <Form onSubmit={handleUpdate}>
        <Form.Group controlId="prenotazioneId">
          <Form.Label>ID Prenotazione</Form.Label>
          <Form.Control
            type="text"
            placeholder="Inserisci ID prenotazione"
            value={prenotazioneId}
            onChange={(e) => setPrenotazioneId(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="veicoloId" className="mt-3">
          <Form.Label>ID Veicolo</Form.Label>
          <Form.Control
            type="text"
            placeholder="Inserisci ID veicolo"
            value={veicoloId}
            onChange={(e) => setVeicoloId(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="utenteId" className="mt-3">
          <Form.Label>ID Utente</Form.Label>
          <Form.Control
            type="text"
            placeholder="Inserisci ID utente"
            value={utenteId}
            onChange={(e) => setUtenteId(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="dataInizio" className="mt-3">
          <Form.Label>Data Inizio</Form.Label>
          <Form.Control
            type="date"
            placeholder="Inserisci data di inizio"
            value={dataInizio}
            onChange={(e) => setDataInizio(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="dataFine" className="mt-3">
          <Form.Label>Data Fine</Form.Label>
          <Form.Control
            type="date"
            placeholder="Inserisci data di fine"
            value={dataFine}
            onChange={(e) => setDataFine(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3" disabled={loading}>
          Modifica
        </Button>
      </Form>
      {loading && (
        <div className="text-center mt-3">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
      {error && (
        <Alert variant="danger" className="mt-3">
          {error}
        </Alert>
      )}
      {success && (
        <Alert variant="success" className="mt-3">
          {success}
        </Alert>
      )}
    </Container>
  )
}

export default ModificaPrenotazione
