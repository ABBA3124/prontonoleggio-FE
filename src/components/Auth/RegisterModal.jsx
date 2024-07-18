import React, { useState } from "react"
import { Modal, Button, Form, Alert } from "react-bootstrap"
import { register } from "../../../api.js"

const RegisterModal = ({ show, handleClose }) => {
  const [nome, setNome] = useState("")
  const [cognome, setCognome] = useState("")
  const [sesso, setSesso] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [telefono, setTelefono] = useState("")
  const [indirizzo, setIndirizzo] = useState("")
  const [numeroCivico, setNumeroCivico] = useState("")
  const [citta, setCitta] = useState("")
  const [cap, setCap] = useState("")
  const [provincia, setProvincia] = useState("")
  const [nazione, setNazione] = useState("")
  const [dataNascita, setDataNascita] = useState("")
  const [codiceFiscale, setCodiceFiscale] = useState("")
  const [patente, setPatente] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleSubmit = async (event) => {
    event.preventDefault()
    const userData = {
      nome,
      cognome,
      sesso,
      username,
      email,
      password,
      telefono,
      indirizzo,
      numeroCivico,
      citta,
      cap,
      provincia,
      nazione,
      dataNascita,
      codiceFiscale,
      patente,
    }

    try {
      const result = await register(userData)
      if (result) {
        console.log("Registrazione eseguita con successo!")
        setSuccess("Registrazione eseguita con successo!")
        setError("")
        setNome("")
        setCognome("")
        setSesso("")
        setUsername("")
        setEmail("")
        setPassword("")
        setTelefono("")
        setIndirizzo("")
        setNumeroCivico("")
        setCitta("")
        setCap("")
        setProvincia("")
        setNazione("")
        setDataNascita("")
        setCodiceFiscale("")
        setPatente("")
        handleClose()
      }
    } catch (error) {
      setError("Registrazione fallita!")
      setSuccess("")
    }
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Registrati</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formNome">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              placeholder="Inserisci Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formCognome">
            <Form.Label>Cognome</Form.Label>
            <Form.Control
              type="text"
              placeholder="Inserisci Cognome"
              value={cognome}
              onChange={(e) => setCognome(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formSesso">
            <Form.Label>Sesso</Form.Label>
            <Form.Control
              type="text"
              placeholder="Inserisci MASCHIO, FEMMINA O ALTRO"
              value={sesso}
              onChange={(e) => setSesso(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Inserisci Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Inserisci Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formTelefono">
            <Form.Label>Telefono</Form.Label>
            <Form.Control
              type="text"
              placeholder="Inserisci Telefono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formIndirizzo">
            <Form.Label>Indirizzo</Form.Label>
            <Form.Control
              type="text"
              placeholder="Inserisci Indirizzo"
              value={indirizzo}
              onChange={(e) => setIndirizzo(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formNumeroCivico">
            <Form.Label>Numero Civico</Form.Label>
            <Form.Control
              type="text"
              placeholder="Inserisci Numero Civico"
              value={numeroCivico}
              onChange={(e) => setNumeroCivico(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formCitta">
            <Form.Label>Città</Form.Label>
            <Form.Control
              type="text"
              placeholder="Inserisci Città"
              value={citta}
              onChange={(e) => setCitta(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formCap">
            <Form.Label>CAP</Form.Label>
            <Form.Control
              type="text"
              placeholder="Inserisci CAP"
              value={cap}
              onChange={(e) => setCap(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formProvincia">
            <Form.Label>Provincia</Form.Label>
            <Form.Control
              type="text"
              placeholder="Inserisci Provincia"
              value={provincia}
              onChange={(e) => setProvincia(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formNazione">
            <Form.Label>Nazione</Form.Label>
            <Form.Control
              type="text"
              placeholder="Inserisci Nazione"
              value={nazione}
              onChange={(e) => setNazione(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formDataNascita">
            <Form.Label>Data di Nascita</Form.Label>
            <Form.Control
              type="date"
              placeholder="Inserisci Data di Nascita"
              value={dataNascita}
              onChange={(e) => setDataNascita(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formCodiceFiscale">
            <Form.Label>Codice Fiscale</Form.Label>
            <Form.Control
              type="text"
              placeholder="Inserisci Codice Fiscale"
              value={codiceFiscale}
              onChange={(e) => setCodiceFiscale(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPatente">
            <Form.Label>Patente</Form.Label>
            <Form.Control
              type="text"
              placeholder="Inserisci Patente"
              value={patente}
              onChange={(e) => setPatente(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Registrati
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default RegisterModal
