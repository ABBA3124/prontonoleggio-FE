import React, { useState, useEffect } from "react"
import { Form, Button, Row, Col, Container, Card } from "react-bootstrap"
import { fetchGet, fetchWithToken } from "../../../api"
import "./Veicoli.css"

const Veicoli = () => {
  //filtro veicoli
  const today = new Date().toISOString().split("T")[0]
  const [pickupDate, setPickupDate] = useState(today)
  const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
  const [dropoffDate, setDropoffDate] = useState(nextWeek)

  const [location, setLocation] = useState("")
  const [carType, setCarType] = useState("")
  const [carCategory, setCarCategory] = useState("")
  const [minPrezzo, setMinPrezzo] = useState("")
  const [maxPrezzo, setMaxPrezzo] = useState("")

  // lista veicoli
  const [veicoli, setVeicoli] = useState([])
  const [caricamento, setCaricamento] = useState(true)
  const [errore, setErrore] = useState(null)

  useEffect(() => {
    const fetchVeicoli = async () => {
      try {
        const response = await fetchWithToken("/veicoli/disponibilita/disponibili")
        setVeicoli(response.content)
        setCaricamento(false)
      } catch (error) {
        setErrore(error)
        setCaricamento(false)
      }
    }

    fetchVeicoli()
  }, [])

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
      const veicoliFiltrati = await fetchGet(`/veicoli/search?${params.toString()}`)
      setVeicoli(veicoliFiltrati.content)
      console.log("Veicoli disponibili:", veicoliFiltrati)
    } catch (error) {
      console.error("Errore nella ricerca dei veicoli:", error)
    }
  }

  const handlePrenota = (veicoloId) => {
    console.log(`Prenota veicolo con ID: ${veicoloId}`)
    // Logica per la prenotazione
  }

  const handleDettagli = (veicoloId) => {
    console.log(`Mostra dettagli veicolo con ID: ${veicoloId}`)
    // Logica per la visualizzazione dei dettagli
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
                    <option value="messina">Messina</option>
                    <option value="catania">Catania</option>
                    <option value="napoli">Napoli</option>
                    <option value="palermo">Palermo</option>
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
      <Container className="mt-5">
        {caricamento ? (
          <p>Caricamento in corso...</p>
        ) : errore ? (
          <p>Errore nel caricamento dei veicoli: {errore.message}</p>
        ) : (
          <Row>
            {veicoli.map((veicolo) => (
              <Col xs={12} sm={6} md={4} lg={3} key={veicolo.id} className="mb-4">
                <Card>
                  <Card.Img
                    variant="top"
                    src={veicolo.immagini}
                    alt={`${veicolo.marca} ${veicolo.modello}`}
                    className="vehicle-card-img"
                  />
                  <Card.Body>
                    <Card.Title>
                      {veicolo.marca} {veicolo.modello}
                    </Card.Title>
                    <Card.Text>
                      <hr />
                      <strong>Anno:</strong> {veicolo.anno} <br />
                      <strong>Categoria:</strong> {veicolo.categoria} <br />
                      <strong>Tariffa Giornaliera:</strong> €{veicolo.tariffaGiornaliera} <br />
                      <strong>Posizione:</strong> {veicolo.posizione} <br />
                      <strong>Posti:</strong> {veicolo.posti} <br />
                      <strong>Motorizzazione:</strong> {veicolo.motorizzazione} <br />
                      <strong>Trasmissione:</strong> {veicolo.trasmissione} <br />
                      <hr />
                      <strong>Disponibilità:</strong> {veicolo.disponibilita} <br />
                      <strong>Porte:</strong> {veicolo.porte} <br />
                      <strong>Aria Condizionata:</strong> {veicolo.ariaCondizionata ? "Sì" : "No"} <br />
                    </Card.Text>
                    <div className="d-flex justify-content-between">
                      <Button variant="primary" onClick={() => handlePrenota(veicolo.id)}>
                        Prenota Ora
                      </Button>
                      <Button variant="secondary" onClick={() => handleDettagli(veicolo.id)}>
                        Dettagli
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  )
}

export default Veicoli
