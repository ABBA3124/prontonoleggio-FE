import React, { useState, useEffect } from "react"
import { Table, Container, Spinner, Alert, Pagination, Button, Toast, Form, Row, Col } from "react-bootstrap"
import { fetchWithToken } from "../../../../../../api"
import { useNavigate } from "react-router-dom"
import { format } from "date-fns"
import "./AllVeicoli.css"

const AllVeicoli = () => {
  const [veicoli, setVeicoli] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const size = 10
  const [totalPages, setTotalPages] = useState(1)
  const [page, setPage] = useState(0)
  const [totalElements, setTotalElements] = useState(0)
  const [toast, setToast] = useState({ show: false, message: "", type: "" })

  const [searchParams, setSearchParams] = useState({
    tipoVeicolo: "",
    disponibilita: "",
    posizioneVeicolo: "",
    targaVeicolo: "",
    marcaVeicolo: "",
    modelloVeicolo: "",
  })

  const handleChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value })
  }

  const handleReset = () => {
    setSearchParams({
      tipoVeicolo: "",
      disponibilita: "",
      posizioneVeicolo: "",
      targaVeicolo: "",
      marcaVeicolo: "",
      modelloVeicolo: "",
    })
    fetchVeicoli({})
  }

  const fetchVeicoli = async (params = {}, page = 0) => {
    setLoading(true)
    setError("")
    try {
      const filteredParams = Object.fromEntries(Object.entries(params).filter(([key, value]) => value !== ""))
      const queryParams = new URLSearchParams({ ...filteredParams, page })
      const response = await fetchWithToken(`/veicoli?page=${page}&size=${size}&${queryParams.toString()}`)
      setVeicoli(response.content)
      setTotalPages(response.page.totalPages)
      setTotalElements(response.page.totalElements)
    } catch (error) {
      setError("Errore nel caricamento dei veicoli.")
    } finally {
      setLoading(false)
    }
  }

  const handlePageChange = (newPage) => {
    setPage(newPage)
    fetchVeicoli(searchParams, newPage)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    setPage(0)
    fetchVeicoli(searchParams, 0)
  }

  useEffect(() => {
    fetchVeicoli()
  }, [])

  const handleEdit = (id, type) => {
    if (type === "AUTO") {
      navigate(`/modifica/auto/${id}`)
    } else if (type === "MOTO") {
      navigate(`/modifica/moto/${id}`)
    } else {
      setError("Tipo veicolo non valido.")
    }
  }

  const handleDelete = (id) => {
    navigate(`/elimina/veicolo/${id}`)
  }

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Caricamento...</span>
        </Spinner>
      </Container>
    )
  }

  if (error) {
    return (
      <Container className="py-5 text-center">
        <Alert variant="danger">{error}</Alert>
      </Container>
    )
  }

  return (
    <Container className="mt-2 containerMod1">
      <Toast onClose={() => setToast({ show: false, message: "", type: "" })} show={toast.show} delay={3000} autohide>
        <Toast.Body className={`text-${toast.type}`}>{toast.message}</Toast.Body>
      </Toast>
      <h1 className="text-center mb-4 font-weight-bold text-primary shadow-sm">
        Veicoli <i className="bi bi-car-front-fill"> {totalElements}</i>
      </h1>
      <Form onSubmit={handleSearch} className="mb-4">
        <Row className="mb-3">
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
              <Form.Label>Disponibilità</Form.Label>
              <Form.Control as="select" name="disponibilita" value={searchParams.disponibilita} onChange={handleChange}>
                <option value="">Tutti</option>
                <option value="DISPONIBILE">Disponibile</option>
                <option value="NON_DISPONIBILE">Non Disponibile</option>
                <option value="MANUTENZIONE">Manutenzione</option>
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
          <Col md={2}>
            <Form.Label>Marca</Form.Label>
            <Form.Control
              type="text"
              placeholder="Inserisci Marca Veicolo"
              name="marcaVeicolo"
              value={searchParams.marcaVeicolo}
              onChange={handleChange}
              className="mb-2"
            />
          </Col>
          <Col md={2}>
            <Form.Label>Modello</Form.Label>
            <Form.Control
              type="text"
              placeholder="Inserisci Modello Veicolo"
              name="modelloVeicolo"
              value={searchParams.modelloVeicolo}
              onChange={handleChange}
              className="mb-2"
            />
          </Col>
        </Row>
        <div className="d-flex mt-3 justify-content-center">
          <Button type="submit" variant="primary">
            Cerca
          </Button>
          <Button onClick={handleReset} variant="secondary" type="button" className="ms-2">
            Resetta
          </Button>
        </div>
      </Form>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Immagine</th>
            <th>Marca & Modello</th>
            <th>Targa</th>
            <th>Tipo Veicolo</th>
            <th>Tariffa Giornaliera</th>
            <th>Disponibilità</th>
            <th>Posizione</th>
            <th>Creazione</th>
            <th>id</th>
            <th>Modifica</th>
            <th>Elimina</th>
          </tr>
        </thead>
        <tbody>
          {veicoli.map((veicolo) => (
            <tr key={veicolo.id}>
              <td>
                <img
                  src={veicolo.immagini}
                  alt={`${veicolo.marca} ${veicolo.modello}`}
                  style={{ width: "80px", height: "80px", objectFit: "cover" }}
                />
              </td>
              <td>
                {veicolo.marca} {veicolo.modello}
              </td>
              <td>{veicolo.targa}</td>
              <td>{veicolo.tipoVeicolo}</td>
              <td>{veicolo.tariffaGiornaliera} €</td>
              <td>{veicolo.disponibilita}</td>
              <td>{veicolo.posizione}</td>
              <td>{format(new Date(veicolo.dataCreazioneVeicolo), "dd/MM/yyyy HH:mm")}</td>
              <td>{veicolo.id}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(veicolo.id, veicolo.tipoVeicolo)}>
                  {veicolo.tipoVeicolo === "AUTO" ? "Modifica Auto" : "Modifica Moto"}
                </Button>
              </td>
              <td>
                <Button variant="danger" onClick={() => handleDelete(veicolo.id)}>
                  Elimina
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
    </Container>
  )
}

export default AllVeicoli
