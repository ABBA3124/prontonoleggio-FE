import React, { useState } from "react"
import { Form, Button, Row, Col, Container } from "react-bootstrap"
import { fetchGet } from "../../../../api"

const FiltraVeicoliPage = () => {
  const today = new Date().toISOString().split("T")[0]
  const [pickupDate, setPickupDate] = useState(today)
  const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
  const [dropoffDate, setDropoffDate] = useState(nextWeek)

  const [location, setLocation] = useState("")
  const [carType, setCarType] = useState("")
  const [carCategory, setCarCategory] = useState("")
  const [minPrezzo, setMinPrezzo] = useState("")
  const [maxPrezzo, setMaxPrezzo] = useState("")

  const handleFilter = async (e) => {
    e.preventDefault()
    const params = new URLSearchParams()

    if (location) params.append("posizione", location)
    if (pickupDate) params.append("dataInizio", pickupDate)
    if (dropoffDate) params.append("dataFine", dropoffDate)
    if (carType) params.append("tipoVeicolo", carType)
    if (carCategory) params.append("categoria", carCategory)
    if (minPrezzo) params.append("minPrezzo", minPrezzo)
    if (maxPrezzo) params.append("maxPrezzo", maxPrezzo)

    try {
      const veicoli = await fetchGet(`/veicoli/search?${params.toString()}`)
      console.log("Veicoli disponibili:", veicoli)
    } catch (error) {
      console.error("Errore nella ricerca dei veicoli:", error)
    }
  }

  return (
    <div className="">
      <div className="rounded-5 bg-secondary m-4 p-3 ">
        <Container className="pickup-wrapper wow fadeInUp mt-4">
          <Form onSubmit={handleFilter}>
            <Row>
              <Col xs={12} sm={12} md={12} lg={12} xl={4}>
                <Form.Group controlId="formLocation">
                  <Form.Label>Località:</Form.Label>
                  <Form.Control as="select" value={location} onChange={(e) => setLocation(e.target.value)}>
                    <option value="">Tutte</option>
                    <option value="milano">Milano</option>
                    <option value="roma">Roma</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col xs={12} sm={6} md={6} lg={6} xl={4}>
                <Form.Group controlId="formPickupDate">
                  <Form.Label>Data Inizio:</Form.Label>
                  <Form.Control type="date" value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} />
                </Form.Group>
              </Col>
              <Col xs={12} sm={6} md={6} lg={6} xl={4}>
                <Form.Group controlId="formDropoffDate">
                  <Form.Label>Data Fine:</Form.Label>
                  <Form.Control type="date" value={dropoffDate} onChange={(e) => setDropoffDate(e.target.value)} />
                </Form.Group>
              </Col>
              <Col xs={12} sm={12} md={6} lg={12} xl={6}>
                <Form.Group controlId="formCarType">
                  <Form.Label>Tipo Veicolo:</Form.Label>
                  <Form.Control as="select" value={carType} onChange={(e) => setCarType(e.target.value)}>
                    <option value="">Tutti</option>
                    <option value="AUTO">Auto</option>
                    <option value="MOTO">Moto</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col xs={12} sm={12} md={6} lg={12} xl={6}>
                <Form.Group controlId="formCarCategory">
                  <Form.Label>Categoria Veicolo:</Form.Label>
                  <Form.Control as="select" value={carCategory} onChange={(e) => setCarCategory(e.target.value)}>
                    <option value="">Tutti</option>
                    <option value="Utilitaria">Utilitaria</option>
                    <option value="sportiva">Sportiva</option>
                    <option value="suv">SUV</option>
                    <option value="berlina">Berlina</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col xs={12} sm={6} md={6} lg={6} xl={6}>
                <Form.Group controlId="formMinPrezzo">
                  <Form.Label>Prezzo Minimo:</Form.Label>
                  <Form.Control
                    type="number"
                    value={minPrezzo}
                    onChange={(e) => setMinPrezzo(e.target.value)}
                    placeholder="Prezzo minimo"
                  />
                </Form.Group>
              </Col>
              <Col xs={12} sm={6} md={6} lg={6} xl={6}>
                <Form.Group controlId="formMaxPrezzo">
                  <Form.Label>Prezzo Massimo:</Form.Label>
                  <Form.Control
                    type="number"
                    value={maxPrezzo}
                    onChange={(e) => setMaxPrezzo(e.target.value)}
                    placeholder="Prezzo massimo"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button variant="primary" type="submit" className="mt-3">
              Filtra
            </Button>
          </Form>
        </Container>
      </div>
    </div>
  )
}

export default FiltraVeicoliPage
