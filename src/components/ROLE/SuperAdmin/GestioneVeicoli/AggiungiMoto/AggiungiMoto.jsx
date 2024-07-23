import React, { useState } from "react"
import { Form, Button, Container, Spinner, Alert, Row, Col } from "react-bootstrap"
import { fetchWithToken } from "../../../../../../api"

const AggiungiMoto = () => {
  const [formData, setFormData] = useState({
    marca: "",
    modello: "",
    anno: "",
    targa: "",
    tipoVeicolo: "MOTO",
    categoria: "",
    cilindrata: "",
    potenza: "",
    consumoCarburante: "",
    posti: "",
    tariffaGiornaliera: "",
    disponibilita: "",
    chilometraggio: "",
    posizione: "",
    documentiAssicurativi: "",
    revisione: "",
    immagini: "",
    bauletto: true,
    parabrezza: true,
    abs: true,
    controlloTrattamento: true,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const capitalizeFirstLetterMarca = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
  }
  const capitalizeFirstLetterTarga = (string) => {
    return string.charAt(0).toUpperCase() + string.charAt(1).toUpperCase() + string.slice(2).toLowerCase()
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]:
        type === "checkbox"
          ? checked
          : name === "marca"
          ? capitalizeFirstLetterMarca(value)
          : name === "targa"
          ? capitalizeFirstLetterTarga(value)
          : value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      const response = await fetchWithToken("/veicoli/salva", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const responseText = await response.text()

      if (response.ok) {
        setSuccess("Moto aggiunta con successo!")
      } else {
        setError(responseText)
      }
    } catch (error) {
      setError("Errore nell'aggiunta della moto.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Aggiungi Moto</h1>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={4}>
            <Form.Group controlId="disponibilita" className="mt-3">
              <Form.Label>Disponibilità</Form.Label>
              <Form.Control as="select" name="disponibilita" value={formData.disponibilita} onChange={handleChange}>
                <option value="DISPONIBILE">Disponibile</option>
                <option value="NON_DISPONIBILE">Non Disponibile</option>
                <option value="MANUTENZIONE">Manutenzione</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="marca" className="mt-3">
              <Form.Label>Marca</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci marca"
                name="marca"
                value={formData.marca}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="modello" className="mt-3">
              <Form.Label>Modello</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci modello"
                name="modello"
                value={formData.modello}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="anno" className="mt-3">
              <Form.Label>Anno</Form.Label>
              <Form.Control
                type="number"
                placeholder="Inserisci anno"
                name="anno"
                value={formData.anno}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="targa" className="mt-3">
              <Form.Label>Targa</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci targa"
                name="targa"
                value={formData.targa}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="categoria" className="mt-3">
              <Form.Label>Categoria</Form.Label>
              <Form.Control as="select" name="categoria" value={formData.categoria} onChange={handleChange}>
                <option value="Sportiva">Sportiva</option>
                <option value="Cruiser">Cruiser</option>
                <option value="Touring">Touring</option>
                <option value="Enduro">Enduro</option>
                <option value="Naked">Naked</option>
                <option value="Cross">Cross</option>
                <option value="Scooter">Scooter</option>
                <option value="Cafe Racer">Cafe Racer</option>
                <option value="Chopper">Chopper</option>
                <option value="Trial">Trial</option>
                <option value="Adventure">Adventure</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="cilindrata" className="mt-3">
              <Form.Label>Cilindrata</Form.Label>
              <Form.Control
                type="number"
                placeholder="Inserisci cilindrata"
                name="cilindrata"
                value={formData.cilindrata}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="potenza" className="mt-3">
              <Form.Label>Potenza</Form.Label>
              <Form.Control
                type="number"
                placeholder="Inserisci potenza"
                name="potenza"
                value={formData.potenza}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="consumoCarburante" className="mt-3">
              <Form.Label>Consumo Carburante</Form.Label>
              <Form.Control
                type="number"
                placeholder="Inserisci consumo carburante"
                name="consumoCarburante"
                value={formData.consumoCarburante}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="posti" className="mt-3">
              <Form.Label>Posti</Form.Label>
              <Form.Control
                type="number"
                placeholder="Inserisci numero di posti"
                name="posti"
                value={formData.posti}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="tariffaGiornaliera" className="mt-3">
              <Form.Label>Tariffa Giornaliera</Form.Label>
              <Form.Control
                type="number"
                placeholder="Inserisci tariffa giornaliera"
                name="tariffaGiornaliera"
                value={formData.tariffaGiornaliera}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="chilometraggio" className="mt-3">
              <Form.Label>Chilometraggio</Form.Label>
              <Form.Control
                type="number"
                placeholder="Inserisci chilometraggio"
                name="chilometraggio"
                value={formData.chilometraggio}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="posizione" className="mt-3">
              <Form.Label>Posizione</Form.Label>
              <Form.Control as="select" name="posizione" value={formData.posizione} onChange={handleChange}>
                <option value="Milano">Milano</option>
                <option value="Roma">Roma</option>
                <option value="Napoli">Napoli</option>
                <option value="Messina">Messina</option>
                <option value="Catania">Catania</option>
                <option value="Palermo">Palermo</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="documentiAssicurativi" className="mt-3">
              <Form.Label>Documenti Assicurativi</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci documenti assicurativi"
                name="documentiAssicurativi"
                value={formData.documentiAssicurativi}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="revisione" className="mt-3">
              <Form.Label>Revisione</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci revisione"
                name="revisione"
                value={formData.revisione}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="immagini" className="mt-3">
              <Form.Label>Immagini</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci URL immagini"
                name="immagini"
                value={formData.immagini}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Row>
            {[
              { label: "Bauletto", name: "bauletto" },
              { label: "Parabrezza", name: "parabrezza" },
              { label: "ABS", name: "abs" },
              { label: "Controllo Trattamento", name: "controlloTrattamento" },
            ].map((field, index) => (
              <Col md={12} key={index}>
                <Form.Group controlId={field.name} className="mt-3">
                  <Form.Check
                    type="checkbox"
                    label={field.label}
                    name={field.name}
                    checked={formData[field.name]}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            ))}
          </Row>
        </Row>
        <Button variant="primary" type="submit" className="mt-3 mb-3" disabled={loading}>
          Aggiungi
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

export default AggiungiMoto
