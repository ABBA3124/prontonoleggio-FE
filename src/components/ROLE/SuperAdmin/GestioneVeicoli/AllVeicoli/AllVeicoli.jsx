import React, { useState, useEffect } from "react"
import { Table, Container, Spinner, Alert, Pagination, Button } from "react-bootstrap"
import { fetchWithToken } from "../../../../../../api"
import { useNavigate } from "react-router-dom"

const AllVeicoli = () => {
  const [veicoli, setVeicoli] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const navigate = useNavigate()

  const fetchVeicoli = async (page = 0) => {
    setLoading(true)
    setError("")
    try {
      const response = await fetchWithToken(`/veicoli?page=${page}&size=10`)
      setVeicoli(response.content)
      setTotalPages(response.page.totalPages)
    } catch (error) {
      console.error("Errore nel caricamento dei veicoli:", error)
      setError("Errore nel caricamento dei veicoli.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchVeicoli()
  }, [])

  const handlePageChange = (page) => {
    setCurrentPage(page)
    fetchVeicoli(page)
  }

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

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Tutti i Veicoli</h1>
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
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Immagini</th>
                <th>Marca</th>
                <th>Modello</th>
                <th>Anno</th>
                <th>Targa</th>
                <th>Tipo Veicolo</th>
                <th>Categoria</th>
                <th>Tariffa Giornaliera</th>
                <th>Disponibilità</th>
                <th>Posizione</th>
                <th>Azioni</th>
                <th>Azioni</th>
              </tr>
            </thead>
            <tbody>
              {veicoli.map((veicolo) => (
                <tr key={veicolo.id}>
                  <td>{veicolo.id}</td>
                  <td>
                    <img
                      src={veicolo.immagini}
                      alt={`${veicolo.marca} ${veicolo.modello}`}
                      style={{ width: "80px", height: "80px", objectFit: "cover" }}
                    />
                  </td>
                  <td>{veicolo.marca}</td>
                  <td>{veicolo.modello}</td>
                  <td>{veicolo.anno}</td>
                  <td>{veicolo.targa}</td>
                  <td>{veicolo.tipoVeicolo}</td>
                  <td>{veicolo.categoria}</td>
                  <td>{veicolo.tariffaGiornaliera}</td>
                  <td>{veicolo.disponibilita}</td>
                  <td>{veicolo.posizione}</td>
                  <td>
                    <Button variant="warning" onClick={() => handleEdit(veicolo.id, veicolo.tipoVeicolo)}>
                      {veicolo.tipoVeicolo === "AUTO" ? "Modifica_Auto" : "Modifica_Moto"}
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
          <Pagination>
            {[...Array(totalPages).keys()].map((page) => (
              <Pagination.Item
                className="mt-2"
                key={page}
                active={page === currentPage}
                onClick={() => handlePageChange(page)}
              >
                {page + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </>
      )}
    </Container>
  )
}

export default AllVeicoli
