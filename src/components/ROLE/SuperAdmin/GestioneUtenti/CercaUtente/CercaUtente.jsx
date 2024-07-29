import React, { useState } from "react"
import { Table, Container, Spinner, Alert, Form, Button, Row, Col } from "react-bootstrap"
import { fetchWithToken } from "../../../../../../api"
import "./CercaUtente.css"
import { format } from "date-fns"

const CercaUtente = () => {
  const [userId, setUserId] = useState("")
  const [utente, setUtente] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    setUserId(e.target.value)
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setUtente(null)
    try {
      const response = await fetchWithToken(`/utente/cerca/${userId}`)
      setUtente(response)
    } catch (error) {
      console.error("Errore nella ricerca dell'utente:", error)
      setError("Errore nella ricerca dell'utente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container className="mt-5 containerMod4">
      <h1 className="text-center mb-4">Cerca Utente</h1>
      <Form onSubmit={handleSearch} className="mb-4">
        <Row className="justify-content-center">
          <Col md={6}>
            <Form.Control
              type="text"
              placeholder="Inserisci ID Utente"
              value={userId}
              onChange={handleChange}
              className="mb-2"
            />
          </Col>
          <Col md={2}>
            <Button variant="primary" type="submit" className="w-100">
              Cerca
            </Button>
          </Col>
        </Row>
      </Form>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : utente ? (
        <Table striped bordered hover responsive>
          <thead className="table-dark">
            <tr>
              <th>Nome</th>
              <th>Cognome</th>
              <th>Email</th>
              <th>Data_Nascita</th>
              <th>Età</th>
              <th>Telefono</th>
              <th>Città</th>
              <th>Provincia</th>
              <th>Nazione</th>
              <th>Codice Fiscale</th>
              <th>Patente</th>
              <th>Username</th>
              <th>Ruolo</th>
              <th>id_</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{utente.nome}</td>
              <td>{utente.cognome}</td>
              <td>{utente.email}</td>
              <td>{format(new Date(utente.dataNascita), "dd/MM/yyyy")}</td>
              <td>{utente.eta}</td>
              <td>{utente.telefono}</td>
              <td>{utente.citta}</td>
              <td>{utente.provincia}</td>
              <td>{utente.nazione}</td>
              <td>{utente.codiceFiscale}</td>
              <td>{utente.patente}</td>
              <td>{utente.username}</td>
              <td>{utente.role}</td>
              <td>{utente.id}</td>
            </tr>
          </tbody>
        </Table>
      ) : (
        <Alert variant="info">Inserisci un ID utente per cercare.</Alert>
      )}
    </Container>
  )
}

export default CercaUtente
