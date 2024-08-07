import React, { useState } from "react"
import { Form, Button, Container, Spinner, Alert, Row, Col } from "react-bootstrap"
import { fetchWithTokenAggiungiVeicoloAuto } from "../../../../../../api"

const AggiungiMoto = () => {
  const [formData, setFormData] = useState({
    tipoVeicolo: "MOTO",
    disponibilita: "DISPONIBILE",
    nomeSede: "Pronto Noleggio Milano",
    cittaSede: "Milano",
    viaSede: "Via Milano N.106 Cap 20019",
    provinciaSede: "MI",
    telefonoSede: "+39 3488637581",
    emailSede: "info@ProntoNoleggio.com",
    orariSede: "9:00-20:00",
    targa: "AB123CD",
    immagini: "url_immagine_moto",
    marca: "",
    modello: "",
    anno: "",
    categoria: "Sportiva",
    alimentazione: "Benzina",
    cambio: "Manuale",
    trazione: "Posteriore",
    cilindrata: "",
    potenzaKw: "",
    consumoCarburante: "",
    posti: "",
    tariffaGiornaliera: "",
    chilometraggio: "",
    documentiAssicurativi: "url_documenti_assicurativi_moto",
    revisione: "url_revisione_moto",
    abs: true,
    bauletto: true, // Solo per MOTO
    parabrezza: true, // Solo per MOTO
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
      setSuccess("Moto aggiunta con successo!")
    } catch (error) {
      setError("Errore nell'aggiunta Della Moto.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Aggiungi Moto</h1>
      <Form onSubmit={handleSubmit}>
        <Row>
          {/* <---------- Sede Veicolo ----------> */}
          <h1 className="">Dati Sede</h1>
          <Col md={2}>
            <Form.Group controlId="nomeSede" className="mt-3">
              <Form.Label>Nome Sede</Form.Label>
              <Form.Control as="select" name="nomeSede" value={formData.cittanomeSedeSede} onChange={handleChange}>
                <option value="P.N. Milano">P.N. Milano</option>
                <option value="P.N. Roma">P.N. Roma</option>
                <option value="P.N. Napoli">P.N. Napoli</option>
                <option value="P.N. Messina">P.N. Messina</option>
                <option value="P.N. Catania">P.N. Catania</option>
                <option value="P.N. Palermo">P.N. Palermo</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group controlId="cittaSede" className="mt-3">
              <Form.Label>Posizione Sede </Form.Label>
              <Form.Control as="select" name="cittaSede" value={formData.cittaSede} onChange={handleChange}>
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
            <Form.Group controlId="viaSede" className="mt-3">
              <Form.Label>Via Sede</Form.Label>
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
          <Col md={2}>
            <Form.Group controlId="provinciaSede" className="mt-3">
              <Form.Label>Provincia Sede</Form.Label>
              <Form.Control as="select" name="provinciaSede" value={formData.provinciaSede} onChange={handleChange}>
                <option value="MI">MI</option>
                <option value="RO">RO</option>
                <option value="NA">NA</option>
                <option value="ME">ME</option>
                <option value="CA">CA</option>
                <option value="PA">PA</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group controlId="telefonoSede" className="mt-3">
              <Form.Label>Telefono Sede</Form.Label>
              <Form.Control as="select" name="telefonoSede" value={formData.telefonoSede} onChange={handleChange}>
                <option value="+39 3488637581">MI</option>
                <option value="+39 3488637582">RO</option>
                <option value="+39 3488637583">NA</option>
                <option value="+39 3488637584">ME</option>
                <option value="+39 3488637585">CA</option>
                <option value="+39 3488637586">PA</option>
              </Form.Control>
            </Form.Group>
          </Col>

          {/* <---------- Dati Veicolo ----------> */}
          <h1 className="mt-2">Dati Veicolo</h1>
          <Col md={2}>
            <Form.Group controlId="disponibilita" className="mt-3">
              <Form.Label>Disponibilità</Form.Label>
              <Form.Control as="select" name="disponibilita" value={formData.disponibilita} onChange={handleChange}>
                <option value="DISPONIBILE">Disponibile</option>
                <option value="NON_DISPONIBILE">Non Disponibile</option>
                <option value="MANUTENZIONE">Manutenzione</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={2}>
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
          <Col md={2}>
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
          <Col md={2}>
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
          <Col md={2}>
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
          <Col md={2}>
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
          <Col md={2}>
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
          <Col md={2}>
            <Form.Group controlId="alimentazione" className="mt-3">
              <Form.Label>Alimentazione</Form.Label>
              <Form.Control as="select" name="alimentazione" value={formData.alimentazione} onChange={handleChange}>
                <option value="Benzina">Benzina</option>
                <option value="Diesel">Diesel</option>
                <option value="Ibrida">Ibrida</option>
                <option value="Elettrica">Elettrica</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group controlId="cambio" className="mt-3">
              <Form.Label>Cambio</Form.Label>
              <Form.Control as="select" name="cambio" value={formData.cambio} onChange={handleChange}>
                <option value="Automatico">Automatico</option>
                <option value="Manuale">Manuale</option>
                <option value="Manuale">Sequenziale</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={2}>
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
          <Col md={2}>
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
          <Col md={2}>
            <Form.Group controlId="potenzaKw" className="mt-3">
              <Form.Label>Potenza</Form.Label>
              <Form.Control
                type="number"
                placeholder="Inserisci potenza in Kw"
                name="potenzaKw"
                value={formData.potenzaKw}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={2}>
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
          <Col md={2}>
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
          <Col md={2}>
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
          <Col md={2}>
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
          <Col md={2}>
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
          <Col md={2}>
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
          <Col md={12}>
            {[
              { label: "ABS", name: "abs" },
              { label: "Bauletto", name: "bauletto" },
              { label: "Parabrezza", name: "parabrezza" },
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
          </Col>
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
