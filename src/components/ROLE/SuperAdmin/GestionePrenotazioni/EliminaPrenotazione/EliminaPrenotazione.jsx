import React, { useState } from "react"
import { Form, Button, Container, Spinner, Alert } from "react-bootstrap"
import { fetchWithToken } from "../../../../../../api"

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
      const response = await fetchWithToken(`/prenotazioni/cancella/${prenotazioneId}`, {
        method: "DELETE",
      })

      const responseText = await response.text()

      if (response.ok) {
        setSuccess("Prenotazione eliminata con successo!")
      } else {
        setError(responseText)
      }
    } catch (error) {
      setError("Errore nell'eliminazione della prenotazione.")
    } finally {
      setLoading(false)
    }
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
        <Button variant="danger" type="submit" className="mt-3" disabled={loading}>
          Elimina
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

export default EliminaPrenotazione
