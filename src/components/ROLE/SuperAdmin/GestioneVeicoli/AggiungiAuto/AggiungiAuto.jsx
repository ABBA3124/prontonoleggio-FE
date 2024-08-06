import React, { useState } from "react"
import { Form, Button, Container, Spinner, Alert, Row, Col } from "react-bootstrap"
import { fetchWithTokenAggiungiVeicoloAuto } from "../../../../../../api"

const AggiungiAuto = () => {
  const [formData, setFormData] = useState({
    marca: "",
    modello: "",
    anno: "",
    targa: "",
    tipoVeicolo: "AUTO",
    categoria: "Utilitaria",
    cilindrata: "",
    potenza: "",
    consumoCarburante: "",
    posti: "",
    tariffaGiornaliera: "",
    disponibilita: "DISPONIBILE",
    chilometraggio: "",
    posizione: "Milano",
    viaSede: "Via Milano N.106 Cap 20019",
    documentiAssicurativi: "Url_documento_assicurativo_auto",
    revisione: "url_revisione_auto",
    immagini: "url_immagine_auto",
    motorizzazione: "Benzina", //Alimentazione
    trasmissione: "Manuale", //cambio
    trazione: "Anteriore",
    porte: "5",
    capacitaBagagliaio: "",
    airbag: "",
    abs: true,
    controlloStabilita: true,
    ariaCondizionata: true,
    sistemaNavigazione: true,
    sistemaAudio: "Base",
    bluetooth: true,
    sediliRiscaldati: false,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const capitalizeFirstLetterMarca = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
  }

  const capitalizeFirstLetterModello = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
  }

  const capitalizeFirstLetterTarga = (string) => {
    return (
      string.charAt(0).toUpperCase() +
      string.charAt(1).toUpperCase() +
      string.charAt(2) +
      string.charAt(3) +
      string.charAt(4) +
      string.charAt(5).toUpperCase() +
      string.charAt(6).toUpperCase()
    )
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
          : name === "modello"
          ? capitalizeFirstLetterModello(value)
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
      const response = await fetchWithTokenAggiungiVeicoloAuto("/veicoli/salva", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      setSuccess("Auto aggiunta con successo!")
    } catch (error) {
      setError("Errore nell'aggiunta dell'auto.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Aggiungi Auto</h1>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={3}>
            <Form.Group controlId="disponibilita" className="mt-3">
              <Form.Label>Disponibilità</Form.Label>
              <Form.Control as="select" name="disponibilita" value={formData.disponibilita} onChange={handleChange}>
                <option value="DISPONIBILE">Disponibile</option>
                <option value="NON_DISPONIBILE">Non Disponibile</option>
                <option value="MANUTENZIONE">Manutenzione</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={3}>
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
          <Col md={3}>
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
          <Col md={3}>
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
          <Col md={3}>
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
          <Col md={3}>
            <Form.Group controlId="categoria" className="mt-3">
              <Form.Label>Categoria</Form.Label>
              <Form.Control as="select" name="categoria" value={formData.categoria} onChange={handleChange}>
                <option value="Utilitaria">Utilitaria</option>
                <option value="Berlina">Berlina</option>
                <option value="Station Wagon">Station Wagon</option>
                <option value="Monovolume">Monovolume</option>
                <option value="Suv">Suv</option>
                <option value="Coupé">Coupé</option>
                <option value="Cabrio">Cabrio</option>
                <option value="Sportiva">Sportiva</option>
                <option value="Fuoristrada">Fuoristrada</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={3}>
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
          <Col md={3}>
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
          <Col md={3}>
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
          <Col md={3}>
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
          <Col md={3}>
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
          <Col md={3}>
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
          <Col md={3}>
            <Form.Group controlId="posizione" className="mt-3">
              <Form.Label>Posizione Sede</Form.Label>
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
          <Col md={3}>
            <Form.Group controlId="viaSede" className="mt-3">
              <Form.Label>Via Sede Ritiro</Form.Label>
              <Form.Control as="select" name="viaSede" value={formData.viaSede} onChange={handleChange}>
                <option value="Via Milano N.106 Cap 20019">Via Milano</option>
                <option value="Via Roma N.15 Cap 00128">Via Roma</option>
                <option value="Via Napoli N.36 Cap 80013">Via Napoli</option>
                <option value="Via Messina N.21 Cap 98121">Via Messina</option>
                <option value="Via Catania N.8 Cap 95100">Via Catania</option>
                <option value="Via Palermo N.1 Cap 90121">Via Palermo</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={3}>
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
          <Col md={3}>
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
          <Col md={3}>
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
          <Col md={3}>
            <Form.Group controlId="motorizzazione" className="mt-3">
              <Form.Label>Alimentazione</Form.Label>
              <Form.Control as="select" name="motorizzazione" value={formData.motorizzazione} onChange={handleChange}>
                <option value="Benzina">Benzina</option>
                <option value="Diesel">Diesel</option>
                <option value="Ibrida">Ibrida</option>
                <option value="Elettrica">Elettrica</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="trazione" className="mt-3">
              <Form.Label>Trazione</Form.Label>
              <Form.Control as="select" name="trazione" value={formData.trazione} onChange={handleChange}>
                <option value="Anteriore">Anteriore</option>
                <option value="Posteriore">Posteriore</option>
                <option value="4x4">4x4</option>
                <option value="Q2">Q2</option>
                <option value="Q4">Q4</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="trasmissione" className="mt-3">
              <Form.Label>Cambio</Form.Label>
              <Form.Control as="select" name="trasmissione" value={formData.trasmissione} onChange={handleChange}>
                <option value="Automatico">Automatico</option>
                <option value="Manuale">Manuale</option>
                <option value="Manuale">Sequenziale</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="porte" className="mt-3">
              <Form.Label>Porte</Form.Label>
              <Form.Control type="number" as="select" name="porte" value={formData.porte} onChange={handleChange}>
                <option value="5">Cinque Porte</option>
                <option value="3">Tre Porte</option>
                <option value="2">Due Porte</option>
                <option value="4">Quattro Porte</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="capacitaBagagliaio" className="mt-3">
              <Form.Label>Capacità Bagagliaio</Form.Label>
              <Form.Control
                type="number"
                placeholder="Inserisci capacità bagagliaio"
                name="capacitaBagagliaio"
                value={formData.capacitaBagagliaio}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="airbag" className="mt-3">
              <Form.Label>Airbag</Form.Label>
              <Form.Control
                type="number"
                placeholder="Inserisci numero di airbag"
                name="airbag"
                value={formData.airbag}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="sistemaAudio" className="mt-3">
              <Form.Label>Sistema Audio</Form.Label>
              <Form.Control as="select" name="sistemaAudio" value={formData.sistemaAudio} onChange={handleChange}>
                <option value="Base">Base</option>
                <option value="Premium">Premium</option>
                <option value="Bose">Bose</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          {[
            { label: "ABS", name: "abs" },
            { label: "Controllo Stabilità", name: "controlloStabilita" },
            { label: "Aria Condizionata", name: "ariaCondizionata" },
            { label: "Sistema Navigazione", name: "sistemaNavigazione" },
            { label: "Bluetooth", name: "bluetooth" },
            { label: "Sedili Riscaldati", name: "sediliRiscaldati" },
          ].map((field, index) => (
            <Col md={3} key={index}>
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

export default AggiungiAuto
