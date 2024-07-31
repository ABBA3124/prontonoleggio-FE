import React, { useState } from "react"
import {
  Typography,
  Button,
  Avatar,
  Box,
  Modal,
  Grid,
  Paper,
  Link,
  TextField,
  CssBaseline,
  Alert,
  IconButton,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import CloseIcon from "@mui/icons-material/Close"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { register } from "../../../api"

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="http://localhost:5173/">
        Pronto Noleggio
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  )
}

const theme = createTheme()

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
    <ThemeProvider theme={theme}>
      <Modal open={show} onClose={handleClose}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid item xs={false} sm={12} md={7} lg={2} />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            lg={12}
            xl={12}
            component={Paper}
            elevation={6}
            square
            sx={{ overflow: "auto", maxHeight: "100vh" }}
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "relative",
              }}
            >
              <IconButton
                onClick={handleClose}
                sx={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                }}
              >
                <CloseIcon />
              </IconButton>
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Registrati
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ width: "50%", mt: 1 }}>
                {error && (
                  <Alert severity="error" sx={{ width: "100%", mt: 2 }}>
                    {error}
                  </Alert>
                )}
                {success && (
                  <Alert severity="success" sx={{ width: "100%", mt: 2 }}>
                    {success}
                  </Alert>
                )}
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="nome"
                  label="Nome"
                  name="nome"
                  autoComplete="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="cognome"
                  label="Cognome"
                  name="cognome"
                  autoComplete="cognome"
                  value={cognome}
                  onChange={(e) => setCognome(e.target.value)}
                />
                <FormControl component="fieldset" sx={{ mt: 2 }}>
                  <FormLabel component="legend">Sesso</FormLabel>
                  <RadioGroup
                    row
                    aria-label="sesso"
                    name="sesso"
                    value={sesso}
                    onChange={(e) => setSesso(e.target.value)}
                  >
                    <FormControlLabel value="MASCHIO" control={<Radio />} label="Maschio" />
                    <FormControlLabel value="FEMMINA" control={<Radio />} label="Femmina" />
                    <FormControlLabel value="ALTRO" control={<Radio />} label="Altro" />
                  </RadioGroup>
                </FormControl>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="telefono"
                  label="Telefono"
                  name="telefono"
                  autoComplete="telefono"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="indirizzo"
                  label="Indirizzo"
                  name="indirizzo"
                  autoComplete="indirizzo"
                  value={indirizzo}
                  onChange={(e) => setIndirizzo(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="numeroCivico"
                  label="Numero Civico"
                  name="numeroCivico"
                  autoComplete="numeroCivico"
                  value={numeroCivico}
                  onChange={(e) => setNumeroCivico(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="citta"
                  label="Città"
                  name="citta"
                  autoComplete="citta"
                  value={citta}
                  onChange={(e) => setCitta(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="cap"
                  label="CAP"
                  name="cap"
                  autoComplete="cap"
                  value={cap}
                  onChange={(e) => setCap(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="provincia"
                  label="Provincia"
                  name="provincia"
                  autoComplete="provincia"
                  value={provincia}
                  onChange={(e) => setProvincia(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="nazione"
                  label="Nazione"
                  name="nazione"
                  autoComplete="nazione"
                  value={nazione}
                  onChange={(e) => setNazione(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="dataNascita"
                  label="Data di Nascita"
                  type="date"
                  name="dataNascita"
                  autoComplete="dataNascita"
                  value={dataNascita}
                  onChange={(e) => setDataNascita(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="codiceFiscale"
                  label="Codice Fiscale"
                  name="codiceFiscale"
                  autoComplete="codiceFiscale"
                  value={codiceFiscale}
                  onChange={(e) => setCodiceFiscale(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="patente"
                  label="Patente"
                  name="patente"
                  autoComplete="patente"
                  value={patente}
                  onChange={(e) => setPatente(e.target.value)}
                />
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                  Registrati
                </Button>
                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Modal>
    </ThemeProvider>
  )
}

export default RegisterModal
