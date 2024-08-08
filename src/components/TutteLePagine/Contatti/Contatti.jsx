import React, { useEffect, useState } from "react"
import { Container, Grid, Paper, Typography, TextField, Button, Box } from "@mui/material"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { fetchWithToken } from "../../../../api"

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, Arial",
    h1: {
      fontSize: "2.5rem",
      fontWeight: "bold",
      textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
      color: "#333",
    },
    h2: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
      color: "#333",
      marginBottom: "16px",
    },
    body1: {
      fontSize: "1rem",
      color: "#424242",
    },
  },
  palette: {
    primary: {
      main: "#0d47a1",
    },
    secondary: {
      main: "#1565c0",
    },
  },
})

const Contatti = () => {
  const [userData, setUserData] = useState(null)
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
      }
    }

    fetchData()
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Container className="mt-4">
        <Typography variant="h1" component="h1" className="mt-2 mb-4 text-center">
          Contattaci
        </Typography>
        <Grid container spacing={4}>
          <Grid item md={6}>
            <Paper elevation={3} style={{ padding: "24px", backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
              <Typography variant="h2" component="h2">
                Informazioni di Contatto
              </Typography>
              <Typography variant="body1">
                <strong>Indirizzo:</strong> Via XX Settembre, Patti, Italy 98066
              </Typography>
              <Typography variant="body1">
                <strong>Telefono:</strong> +39 3488637581
              </Typography>
              <Typography variant="body1">
                <strong>Email:</strong>{" "}
                <a href="mailto:info@ProntoNoleggio.com" style={{ color: "#0d47a1" }}>
                  info@ProntoNoleggio.com
                </a>
              </Typography>
              <hr />
              <Typography variant="h2" component="h2">
                Orari di Apertura
              </Typography>
              <Typography variant="body1">
                <strong>Lunedì - Venerdì: </strong>9:00 - 20:00
                <br />
                <strong>Sabato: </strong>9:00 - 18:00
                <br />
                <strong>Domenica: </strong>Chiuso
              </Typography>
              <hr />
            </Paper>
          </Grid>
          <Grid item md={6}>
            <Paper elevation={3} style={{ padding: "24px", backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
              <Typography variant="h2" component="h2">
                Invia un Messaggio
              </Typography>
              <form>
                <TextField
                  id="formName"
                  label="Nome Completo"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                  value={userData ? `${userData.nome} ${userData.cognome}` : "Inserisci il tuo nome e cognome*"}
                />
                <TextField
                  id="formEmail"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  type="email"
                  required
                  value={userData ? userData.email : "Inserisci la tua email*"}
                />
                <TextField
                  id="formMessage"
                  label="Messaggio"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  multiline
                  rows={3}
                  required
                />
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  sx={{
                    marginTop: "16px",
                    transition: "background-color 0.3s, transform 0.3s",
                    "&:hover": {
                      backgroundColor: "#0c6abf",
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  Invia
                </Button>
              </form>
            </Paper>
          </Grid>
        </Grid>
        <Box mt={4} className="mb-5">
          <Typography variant="h2" component="h2">
            Dove Siamo
          </Typography>
          <iframe
            title="Google Maps"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3138.085618326148!2d14.962444076317416!3d38.138202091141636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13169c43232474b5%3A0x5d1746ba15b3ab5a!2sVia%20XX%20Settembre%2C%2098066%20Patti%20ME!5e0!3m2!1sit!2sit!4v1723110845005!5m2!1sit!2sit"
            width="100%"
            height="450"
            style={{ border: 0, borderRadius: "8px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default Contatti
