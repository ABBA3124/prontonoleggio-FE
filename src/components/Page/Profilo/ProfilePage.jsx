import React, { createContext, useContext, useEffect, useState } from "react"
import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  CircularProgress,
  Button,
  TextField,
  Typography,
  Alert,
  Modal,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material"
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
    <Container sx={{ mt: 4 }}>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={8} lg={6}>
          <UserProfile />
        </Grid>
      </Grid>
    </Container>
  </ProfileProvider>
)

const UserProfile = () => {
  const { userData, loading, error } = useContext(UserContext)

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <CircularProgress />
      </Container>
    )
  }

  if (error || !userData) {
    return (
      <Container className="py-5 text-center">
        <Typography color="error">{error || "Errore nel caricamento dei dati utente."}</Typography>
      </Container>
    )
  }

  return (
    <Card className="mt-3 mb-5" sx={{ borderRadius: 2, boxShadow: 3 }}>
      <CardHeader title="Profilo Utente" sx={{ backgroundColor: "#1976d2", color: "#fff", textAlign: "center" }} />
      <CardContent>
        <Box display="flex" justifyContent="center" mb={4}>
          <img
            src={userData.avatar}
            alt="Avatar"
            style={{ borderRadius: "50%", width: 120, height: 120, boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
          />
        </Box>
        <Typography variant="h5" align="center" sx={{ fontWeight: "bold" }}>
          {userData.nome} {userData.cognome}
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary">
          {userData.username}
        </Typography>
        <hr />
        <UserInfo userData={userData} />
      </CardContent>
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
    <CardContent>
      {editing ? (
        <form onSubmit={handleSubmit}>
          <TextField margin="normal" fullWidth label="Nome" name="nome" value={formData.nome} onChange={handleChange} />
          <TextField
            margin="normal"
            fullWidth
            label="Cognome"
            name="cognome"
            value={formData.cognome}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Telefono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Indirizzo"
            name="indirizzo"
            value={formData.indirizzo}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Numero Civico"
            name="numeroCivico"
            value={formData.numeroCivico}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Città"
            name="citta"
            value={formData.citta}
            onChange={handleChange}
          />
          <TextField margin="normal" fullWidth label="CAP" name="cap" value={formData.cap} onChange={handleChange} />
          <TextField
            margin="normal"
            fullWidth
            label="Provincia"
            name="provincia"
            value={formData.provincia}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Nazione"
            name="nazione"
            value={formData.nazione}
            onChange={handleChange}
          />
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button variant="outlined" color="secondary" onClick={() => setEditing(false)}>
              Annulla Modifiche
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Salva Modifiche
            </Button>
          </Box>
        </form>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
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
            </TableBody>
          </Table>
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button variant="contained" color="primary" onClick={() => setEditing(true)}>
              Modifica Profilo
            </Button>
            <Button variant="contained" color="error" onClick={() => setShowModal(true)}>
              Elimina Profilo
            </Button>
          </Box>
        </TableContainer>
      )}
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <Box sx={{ ...modalStyle, width: 400 }}>
          <Typography variant="h6" component="h2">
            Conferma Eliminazione Profilo
          </Typography>
          <form onSubmit={handleDeleteProfile}>
            <TextField
              margin="normal"
              fullWidth
              label="Inserisci la password per confermare"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {tuttook && (
              <Alert severity="success" sx={{ mt: 2 }}>
                {tuttook}
              </Alert>
            )}
            {errore && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {errore}
              </Alert>
            )}
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Button variant="outlined" color="secondary" onClick={() => setShowModal(false)}>
                Annulla
              </Button>
              <Button variant="contained" color="error" type="submit">
                Elimina Profilo
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </CardContent>
  )
}

const UserDetail = ({ label, value }) => (
  <TableRow>
    <TableCell>
      <Typography variant="subtitle2" component="span">
        <strong>{label}</strong>
      </Typography>
    </TableCell>
    <TableCell>
      <Typography variant="body2" component="span">
        {value}
      </Typography>
    </TableCell>
  </TableRow>
)

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
}

export default ProfilePage
