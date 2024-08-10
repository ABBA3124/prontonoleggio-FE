import React, { useEffect, useState } from "react"
import { fetchWithToken } from "../../../../api"
import { Container, Grid, Card, CardContent, Typography, CircularProgress, Alert, Avatar, Box } from "@mui/material"
import StarIcon from "@mui/icons-material/Star"
import StarBorderIcon from "@mui/icons-material/StarBorder"
import RateReviewIcon from "@mui/icons-material/RateReview"
import { createTheme, ThemeProvider } from "@mui/material/styles"

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, Arial",
    fontFamily: "Poppins, Arial",
    h4: {
      fontFamily: "Roboto, Arial",
      fontWeight: "bold",
    },
  },
})

const AllRecensioni = () => {
  const [recensioni, setRecensioni] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchRecensioni = async () => {
      try {
        const data = await fetchWithToken("/recensioni/all")
        setRecensioni(data)
      } catch (error) {
        console.error("Fetch error:", error.message)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchRecensioni()
  }, [])

  const renderRating = (rating) => {
    const stars = []
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<StarIcon key={i} sx={{ color: "gold", mr: 0.5 }} />)
      } else {
        stars.push(<StarBorderIcon key={i} sx={{ color: "gold", mr: 0.5 }} />)
      }
    }
    return stars
  }

  if (loading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    )
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error">{error}</Alert>
      </Container>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Box
          sx={{
            textAlign: "center",
            mb: 4,
            pb: 2,
            borderBottom: "2px solid",
            borderColor: "primary.main",
          }}
        >
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            color="text.primary"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
              textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
            }}
          >
            <RateReviewIcon fontSize="large" sx={{ color: "primary.main", fontSize: "2.5rem" }} />
            Recensioni
          </Typography>
        </Box>
        <Grid container spacing={3}>
          {recensioni.map((recensione) => (
            <Grid item xs={12} sm={6} md={4} key={recensione.id}>
              <Card
                sx={{
                  borderRadius: 2,
                  boxShadow: 3,
                  "&:hover": { boxShadow: 6 },
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%", // Imposta l'altezza della carta per essere uguale in tutte le carte
                }}
              >
                <CardContent sx={{ backgroundColor: "#f9f9f9", flexGrow: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Avatar
                      src={recensione.utente.avatar}
                      alt={`${recensione.utente.nome} ${recensione.utente.cognome}`}
                      sx={{ mr: 2 }}
                    />
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                        {recensione.utente.nome} {recensione.utente.cognome}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        <strong>Pubblicata il: </strong>
                        {new Date(recensione.dataCreazione).toLocaleDateString()}
                      </Typography>
                      {recensione.dataModifica !== null && (
                        <Typography variant="body2" color="textSecondary">
                          <strong>Ultima Modifica: </strong> {new Date(recensione.dataModifica).toLocaleDateString()}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                  <Typography variant="h5" component="div" sx={{ fontWeight: "bold", mb: 1 }}>
                    {recensione.titolo}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                    {recensione.commento}
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="textSecondary">
                      <strong>Veicolo Noleggiato: </strong> {recensione.prenotazione.veicolo.marca}{" "}
                      {recensione.prenotazione.veicolo.modello}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      <strong>Data Inizio/Fine Noleggio</strong>{" "}
                      {new Date(recensione.prenotazione.dataInizio).toLocaleDateString()}
                      {" - "}
                      {new Date(recensione.prenotazione.dataFine).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      <strong>Sede: </strong> {recensione.prenotazione.veicolo.nomeSede}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    {renderRating(recensione.rating)}
                    <Typography variant="h6" sx={{ ml: 1 }}>
                      {recensione.rating}/5
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  )
}

export default AllRecensioni
