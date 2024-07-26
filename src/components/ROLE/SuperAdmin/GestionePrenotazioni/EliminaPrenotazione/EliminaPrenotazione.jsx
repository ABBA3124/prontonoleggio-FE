import React, { useState } from "react"
import { Form, Button, Container, Spinner, Alert } from "react-bootstrap"
import { deletePrenotazionii } from "../../../../../../api"

const EliminaPrenotazione = () => {
  const [prenotazioneId, setPrenotazioneId] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleDelete = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      await deletePrenotazionii(`/prenotazioni/cancella/${prenotazioneId}`, {
        method: "DELETE",
      })
      setSuccess("Prenotazione eliminata con successo!")
      setError("")
      setTimeout(() => {
        setError("")
        setSuccess("")
        setPrenotazioneId("")
      }, 1500)
    } catch (error) {
      setSuccess("")
      setError("Errore nell'eliminazione della prenotazione.")
      setTimeout(() => {
        setError("")
        setSuccess("")
      }, 1500)
    } finally {
      setLoading(false)
    }
  }

  const handleClear = async (e) => {
    setPrenotazioneId("")
  }

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Elimina Prenotazione</h1>
      <Form onSubmit={handleDelete}>
        <Form.Group controlId="prenotazioneId">
          <Form.Label>ID Prenotazione</Form.Label>
          <Form.Control
            type="text"
            placeholder="Inserisci ID prenotazione"
            value={prenotazioneId}
            onChange={(e) => setPrenotazioneId(e.target.value)}
          />
        </Form.Group>
        <div className="d-flex">
          <Button variant="danger" type="submit" className="mt-3 me-2" disabled={loading}>
            Elimina
          </Button>
          <Button variant="secondary" className="mt-3" onClick={handleClear}>
            Reset Campo
          </Button>
        </div>
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

export default EliminaPrenotazione
