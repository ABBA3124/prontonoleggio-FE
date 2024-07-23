import React, { useState } from "react"
import { Form, Button, Container, Spinner, Alert } from "react-bootstrap"
import { fetchWithToken } from "../../../../../../api"
import { useParams } from "react-router-dom"

const EliminaVeicolo = () => {
  const { vId } = useParams()
  const [veicoloId, setVeicoloId] = useState(vId || "")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleDelete = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      const response = await fetchWithToken(`/veicoli/${veicoloId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      })

      const responseText = await response.text()

      if (response.ok) {
        setSuccess("Veicolo eliminato con successo!")
      } else {
        setError(responseText)
      }
    } catch (error) {
      setSuccess("Veicolo eliminato con successo!")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Elimina Veicolo</h1>
      <Form onSubmit={handleDelete}>
        <Form.Group controlId="veicoloId">
          <Form.Label>ID Veicolo</Form.Label>
          <Form.Control
            type="text"
            placeholder="Inserisci ID veicolo"
            value={veicoloId}
            onChange={(e) => setVeicoloId(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="password" className="mt-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Inserisci la tua password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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

export default EliminaVeicolo
