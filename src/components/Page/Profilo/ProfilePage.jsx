import React, { createContext, useContext, useEffect, useState } from "react"
import { Container, Row, Col, Card, Spinner, Table, Button, Form, Alert, Modal } from "react-bootstrap"
import { fetchWithToken, updateProfile, fetchWithTokenAndTextResponse } from "../../../../api"
import { useNavigate } from "react-router-dom"

const UserContext = createContext()

const ProfileProvider = ({ children }) => {
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchWithToken("/utente/me")
        setUserData(data)
      } catch (error) {
        setError("Errore durante il caricamento del profilo. Per favore, effettua il login.")
        setSuccess("")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <UserContext.Provider value={{ userData, setUserData, loading, error, success, setError, setSuccess }}>
      {children}
    </UserContext.Provider>
  )
}

const ProfilePage = () => (
  <ProfileProvider>
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <UserProfile />
        </Col>
      </Row>
    </Container>
  </ProfileProvider>
)

const UserProfile = () => {
  const { userData, loading, error } = useContext(UserContext)

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    )
  }

  if (error || !userData) {
    return (
      <Container className="py-5 text-center">
        <p>{error || "Errore nel caricamento dei dati utente."}</p>
      </Container>
    )
  }

  return (
    <Card>
      <Card.Header className="bg-primary text-white text-center">
        <h3>Profilo Utente</h3>
      </Card.Header>
      <Card.Body>
        <div className="text-center mb-4">
          <img src={userData.avatar} alt="Avatar" className="rounded-circle" width="120" height="120" />
        </div>
        <Card.Title className="text-center">
          {userData.nome} {userData.cognome}
        </Card.Title>
        <Card.Text className="text-center text-muted">{userData.username}</Card.Text>
        <hr />
        <UserInfo userData={userData} />
      </Card.Body>
    </Card>
  )
}

const UserInfo = ({ userData }) => {
  const { setUserData, setError, setSuccess } = useContext(UserContext)
  const [formData, setFormData] = useState({ ...userData })
  const [editing, setEditing] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const [errore, setErrore] = useState("")
  const [tuttook, setTuttoOk] = useState("")
  const [loading, setLoading] = useState(false)

  const deleteProfile = async (password) => {
    setLoading(true)
    try {
      const responseText = await fetchWithTokenAndTextResponse("/utente/me", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      })
      setTuttoOk(responseText)
      setErrore("")
      setPassword("")
      setTimeout(() => {
        localStorage.removeItem("token")
        setUserData(null)
        navigate("/")
        window.location.reload()
      }, 2000)
    } catch (error) {
      setErrore("Errore durante l'eliminazione del profilo")
      setTuttoOk("")
      setPassword("")
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteProfile = async (e) => {
    e.preventDefault()
    await deleteProfile(password)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const completeFormData = {
      nome: formData.nome || userData.nome,
      cognome: formData.cognome || userData.cognome,
      sesso: formData.sesso || userData.sesso,
      username: formData.username || userData.username,
      email: formData.email || userData.email,
      password: formData.password || userData.password,
      telefono: formData.telefono || userData.telefono,
      indirizzo: formData.indirizzo || userData.indirizzo,
      numeroCivico: formData.numeroCivico || userData.numeroCivico,
      citta: formData.citta || userData.citta,
      cap: formData.cap || userData.cap,
      provincia: formData.provincia || userData.provincia,
      nazione: formData.nazione || userData.nazione,
      dataNascita: userData.dataNascita,
      codiceFiscale: userData.codiceFiscale,
      patente: userData.patente,
    }

    console.log("Submitting data: ", completeFormData)

    try {
      const updatedData = await updateProfile(completeFormData)
      setUserData(updatedData)
      setSuccess("Profilo aggiornato con successo!")
      setError("")
      setEditing(false)
    } catch (error) {
      setError("Errore nell'aggiornamento del profilo.")
      setSuccess("")
    }
  }

  const ROLE1 = import.meta.env.VITE_ROLE_VERIFICA1
  const ROLE2 = import.meta.env.VITE_ROLE_VERIFICA2

  return (
    <Card.Text>
      {editing ? (
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nome</Form.Label>
            <Form.Control type="text" name="nome" value={formData.nome} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Cognome</Form.Label>
            <Form.Control type="text" name="cognome" value={formData.cognome} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Telefono</Form.Label>
            <Form.Control type="text" name="telefono" value={formData.telefono} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Indirizzo</Form.Label>
            <Form.Control type="text" name="indirizzo" value={formData.indirizzo} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Numero Civico</Form.Label>
            <Form.Control type="text" name="numeroCivico" value={formData.numeroCivico} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Città</Form.Label>
            <Form.Control type="text" name="citta" value={formData.citta} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>CAP</Form.Label>
            <Form.Control type="text" name="cap" value={formData.cap} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Provincia</Form.Label>
            <Form.Control type="text" name="provincia" value={formData.provincia} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Nazione</Form.Label>
            <Form.Control type="text" name="nazione" value={formData.nazione} onChange={handleChange} />
          </Form.Group>
          <div className="d-flex justify-content-between">
            <Button variant="secondary" onClick={() => setEditing(false)}>
              Annulla
            </Button>
            <Button variant="primary" type="submit">
              Salva
            </Button>
          </div>
        </Form>
      ) : (
        <Table striped bordered hover>
          <tbody>
            {userData?.role === ROLE1 && <UserDetail label="Ruolo" value={userData.role} />}
            {userData?.role === ROLE2 && <UserDetail label="Ruolo" value={userData.role} />}
            {userData?.role === ROLE1 && userData?.role === ROLE2 && <UserDetail label="ID" value={userData.id} />}
            <UserDetail label="Email" value={userData.email} />
            <UserDetail label="Età" value={userData.eta} />
            <UserDetail label="Data di Nascita" value={new Date(userData.dataNascita).toLocaleDateString()} />
            <UserDetail label="Sesso" value={userData.sesso} />
            <UserDetail label="Telefono" value={userData.telefono} />
            <UserDetail label="Indirizzo" value={`${userData.indirizzo}, ${userData.numeroCivico}`} />
            <UserDetail label="Città" value={`${userData.citta} - ${userData.cap} (${userData.provincia})`} />
            <UserDetail label="Nazione" value={userData.nazione} />
            <UserDetail label="Codice Fiscale" value={userData.codiceFiscale} />
            <UserDetail label="Patente" value={userData.patente} />
          </tbody>
        </Table>
      )}
      <Button variant="primary" className="mt-3" onClick={() => setEditing(true)}>
        Modifica Profilo
      </Button>
      <Button variant="danger" className="ms-2 mt-3" onClick={() => setShowModal(true)}>
        Elimina Profilo
      </Button>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Conferma Eliminazione Profilo</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleDeleteProfile}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Inserisci la password per confermare</Form.Label>
              <Form.Control
                placeholder="Password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <div>
              {tuttook && (
                <Alert variant="success" className="mt-3">
                  {tuttook}
                </Alert>
              )}
            </div>
            <div>
              {errore && (
                <Alert variant="danger" className="mt-3">
                  {errore}
                </Alert>
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Annulla
            </Button>
            <Button variant="danger" type="submit">
              Elimina Profilo
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Card.Text>
  )
}

const UserDetail = ({ label, value }) => (
  <tr>
    <td>
      <strong>{label}</strong>
    </td>
    <td>{value}</td>
  </tr>
)

export default ProfilePage
