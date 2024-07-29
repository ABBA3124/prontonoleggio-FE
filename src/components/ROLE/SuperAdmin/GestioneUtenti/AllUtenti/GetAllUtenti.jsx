import React, { useState, useEffect } from "react"
import { Table, Container, Spinner, Alert, Form, Button, Row, Col, Pagination } from "react-bootstrap"
import { fetchWithToken } from "../../../../../../api"
import { useNavigate } from "react-router-dom"
import "./GetAllUtenti.css"
import { format } from "date-fns"

const GetAllUtenti = () => {
  const [utenti, setUtenti] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [searchParams, setSearchParams] = useState({
    nome: "",
    cognome: "",
    email: "",
    telefono: "",
    username: "",
    role: "",
    eta: "",
    citta: "",
    provincia: "",
    nazione: "",
    dataNascita: "",
    codiceFiscale: "",
    patente: "",
  })

  const handleChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value })
  }

  const fetchUtenti = async (params = {}, page = 0) => {
    setLoading(true)
    setError("")
    try {
      const filteredParams = Object.fromEntries(Object.entries(params).filter(([key, value]) => value !== ""))
      const queryParams = new URLSearchParams({ ...filteredParams, page })
      const response = await fetchWithToken(`/utente/all?page=${page}&size=20&${queryParams.toString()}`)
      console.log("Response data:", response)
      setUtenti(response.content)
      setTotalPages(response.page.totalPages)
    } catch (error) {
      console.error("Errore nel caricamento degli utenti:", error)
      setError("Errore nel caricamento degli utenti.")
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    setPage(0)
    fetchUtenti(searchParams, 0)
  }

  const handleReset = (e) => {
    setSearchParams({
      nome: "",
      cognome: "",
      email: "",
      telefono: "",
      username: "",
      role: "",
      eta: "",
      citta: "",
      provincia: "",
      nazione: "",
      dataNascita: "",
      codiceFiscale: "",
      patente: "",
    })
    fetchUtenti({})
  }

  const handlePageChange = (page) => {
    setPage(page)
    fetchUtenti(searchParams, page)
  }

  useEffect(() => {
    fetchUtenti()
  }, [])

  const handleDelete = (id) => {
    navigate(`/elimina/utente/${id}`)
  }

  return (
    <Container className="mt-2 containerMod1">
      <h1 className="text-center mb-4 font-weight-bold text-primary shadow-sm ">Utenti</h1>
      <Form onSubmit={handleSearch} className="mb-4">
        <Row className="mb-3">
          <Col md={4}>
            <Form.Control
              type="text"
              placeholder="Nome"
              name="nome"
              value={searchParams.nome}
              onChange={handleChange}
              className="mb-2"
            />
          </Col>
          <Col md={4}>
            <Form.Control
              type="text"
              placeholder="Cognome"
              name="cognome"
              value={searchParams.cognome}
              onChange={handleChange}
              className="mb-2"
            />
          </Col>
          <Col md={4}>
            <Form.Control
              type="text"
              placeholder="Email"
              name="email"
              value={searchParams.email}
              onChange={handleChange}
              className="mb-2"
            />
          </Col>
          <Col md={4}>
            <Form.Control
              type="text"
              placeholder="Telefono"
              name="telefono"
              value={searchParams.telefono}
              onChange={handleChange}
              className="mb-2"
            />
          </Col>
          <Col md={4}>
            <Form.Control
              type="text"
              placeholder="Username"
              name="username"
              value={searchParams.username}
              onChange={handleChange}
              className="mb-2"
            />
          </Col>
          <Col md={4}>
            <Form.Control
              type="text"
              placeholder="Ruolo"
              name="role"
              value={searchParams.role}
              onChange={handleChange}
              className="mb-2"
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={4}>
            <Form.Control
              type="number"
              placeholder="Età"
              name="eta"
              value={searchParams.eta}
              onChange={handleChange}
              className="mb-2"
            />
          </Col>
          <Col md={4}>
            <Form.Control
              type="text"
              placeholder="Città"
              name="citta"
              value={searchParams.citta}
              onChange={handleChange}
              className="mb-2"
            />
          </Col>
          <Col md={4}>
            <Form.Control
              type="text"
              placeholder="Provincia"
              name="provincia"
              value={searchParams.provincia}
              onChange={handleChange}
              className="mb-2"
            />
          </Col>
          <Col md={4}>
            <Form.Control
              type="text"
              placeholder="Nazione"
              name="nazione"
              value={searchParams.nazione}
              onChange={handleChange}
              className="mb-2"
            />
          </Col>
          <Col md={4}>
            <Form.Control
              type="date"
              placeholder="Data Nascita"
              name="dataNascita"
              value={searchParams.dataNascita}
              onChange={handleChange}
              className="mb-2"
            />
          </Col>
          <Col md={4}>
            <Form.Control
              type="text"
              placeholder="Codice Fiscale"
              name="codiceFiscale"
              value={searchParams.codiceFiscale}
              onChange={handleChange}
              className="mb-2"
            />
          </Col>
          <Col md={4}>
            <Form.Control
              type="text"
              placeholder="Patente"
              name="patente"
              value={searchParams.patente}
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
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <>
          <div className="table-container ">
            <Table striped bordered hover responsive className="w-100">
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
                  <th>Azioni</th>
                </tr>
              </thead>
              <tbody>
                {utenti.map((utente) => (
                  <tr key={utente.id}>
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
                    <td>
                      <Button variant="danger" onClick={() => handleDelete(utente.id)}>
                        Elimina
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
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
        </>
      )}
    </Container>
  )
}

export default GetAllUtenti
