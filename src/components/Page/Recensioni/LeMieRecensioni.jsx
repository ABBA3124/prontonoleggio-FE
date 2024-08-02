import React, { useEffect, useState } from "react"
import { fetchWithToken, fetchPut, fetchPost } from "../../../../api"
import {
  Container,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  Avatar,
  Box,
  TextField,
  IconButton,
  Button,
  Snackbar,
} from "@mui/material"
import StarIcon from "@mui/icons-material/Star"
import StarBorderIcon from "@mui/icons-material/StarBorder"
import RateReviewIcon from "@mui/icons-material/RateReview"
import EditIcon from "@mui/icons-material/Edit"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import MuiAlert from "@mui/material/Alert"

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, Arial",
  },
})

const RecensioneUtente = () => {
  const [recensione, setRecensione] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editing, setEditing] = useState(false)
  const [creating, setCreating] = useState(false)
  const [rating, setRating] = useState(0)
  const [titolo, setTitolo] = useState("")
  const [commento, setCommento] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [utenteId, setUtenteId] = useState("")

  useEffect(() => {
    fetchRecensione()
  }, [])

  const fetchRecensione = async () => {
    try {
      const data = await fetchWithToken("/recensioni/me")
      if (data.length > 0) {
        setRecensione(data[0])
        setRating(data[0].rating)
        setTitolo(data[0].titolo)
        setCommento(data[0].commento)
        setUtenteId(data[0].utente.id)
      } else {
        setRecensione(null)
      }
    } catch (error) {
      console.error("Fetch error:", error.message)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = () => {
    setEditing(true)
  }

  const handleCancelEdit = () => {
    setEditing(false)
    setRating(recensione.rating)
    setTitolo(recensione.titolo)
    setCommento(recensione.commento)
  }

  const handleSaveEdit = async () => {
    try {
      const updatedReview = await fetchPut(`/recensioni/update/${recensione.id}`, {
        rating,
        titolo,
        commento,
      })
      setRecensione(updatedReview)
      setEditing(false)
      setSuccessMessage("Recensione aggiornata con successo!")
    } catch (error) {
      console.error("Update error:", error.message)
      setError(error.message)
    }
  }

  const handleCreate = () => {
    setCreating(true)
  }

  const handleCancelCreate = () => {
    setCreating(false)
    setRating(0)
    setTitolo("")
    setCommento("")
  }

  const handleSaveCreate = async () => {
    try {
      const newReview = await fetchPost(`/recensioni/create`, {
        utenteId,
        rating,
        titolo,
        commento,
      })
      setRecensione(newReview)
      setCreating(false)
      setSuccessMessage("Recensione creata con successo!")
    } catch (error) {
      console.error("Create error:", error.message)
      setError(error.message)
    }
  }

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

  return (
    <ThemeProvider theme={theme}>
      <Container className="mb-5">
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : !recensione ? (
          <>
            <Typography variant="h6" align="center" className="mt-5">
              Nessuna recensione trovata.
            </Typography>
            <Typography variant="h6" align="center" className="mt-3">
              <Button variant="contained" color="primary" onClick={handleCreate}>
                Scrivi una recensione
              </Button>
            </Typography>
            {creating && (
              <Box mt={4}>
                <TextField
                  fullWidth
                  label="Titolo"
                  value={titolo}
                  onChange={(e) => setTitolo(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Commento"
                  value={commento}
                  onChange={(e) => setCommento(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  {[1, 2, 3, 4, 5].map((value) => (
                    <IconButton key={value} onClick={() => setRating(value)}>
                      {value <= rating ? (
                        <StarIcon sx={{ color: "gold", mr: 0.5 }} />
                      ) : (
                        <StarBorderIcon sx={{ color: "gold", mr: 0.5 }} />
                      )}
                    </IconButton>
                  ))}
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Button variant="contained" color="primary" onClick={handleSaveCreate}>
                    Salva
                  </Button>
                  <Button variant="outlined" color="secondary" onClick={handleCancelCreate}>
                    Annulla
                  </Button>
                </Box>
              </Box>
            )}
          </>
        ) : (
          <>
            <Box sx={{ textAlign: "center", mb: 4 }} className="mt-4">
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
                <RateReviewIcon fontSize="large" sx={{ color: "primary.main" }} />
                Recensione Utente
              </Typography>
            </Box>
            <Snackbar
              open={Boolean(successMessage)}
              autoHideDuration={6000}
              onClose={() => setSuccessMessage("")}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <MuiAlert
                onClose={() => setSuccessMessage("")}
                severity="success"
                elevation={6}
                variant="filled"
                sx={{ width: "100%" }}
              >
                {successMessage}
              </MuiAlert>
            </Snackbar>
            <Card sx={{ borderRadius: 2, boxShadow: 3, "&:hover": { boxShadow: 6 }, overflow: "hidden" }}>
              <CardContent sx={{ backgroundColor: "#f9f9f9" }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Avatar
                    src={recensione.utente.avatar}
                    alt={`${recensione.utente.nome} ${recensione.utente.cognome}`}
                    sx={{ mr: 2 }}
                  />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                      {recensione.utente.nome} {recensione.utente.cognome}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {new Date(recensione.dataCreazione).toLocaleDateString()}
                    </Typography>
                  </Box>
                  <IconButton onClick={handleEdit} sx={{ ml: "auto" }}>
                    <EditIcon />
                  </IconButton>
                </Box>
                {editing ? (
                  <Box>
                    <TextField
                      fullWidth
                      label="Titolo"
                      value={titolo}
                      onChange={(e) => setTitolo(e.target.value)}
                      sx={{ mb: 2 }}
                    />
                    <TextField
                      fullWidth
                      label="Commento"
                      value={commento}
                      onChange={(e) => setCommento(e.target.value)}
                      sx={{ mb: 2 }}
                    />
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      {[1, 2, 3, 4, 5].map((value) => (
                        <IconButton key={value} onClick={() => setRating(value)}>
                          {value <= rating ? (
                            <StarIcon sx={{ color: "gold", mr: 0.5 }} />
                          ) : (
                            <StarBorderIcon sx={{ color: "gold", mr: 0.5 }} />
                          )}
                        </IconButton>
                      ))}
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Button variant="contained" color="primary" onClick={handleSaveEdit}>
                        Salva
                      </Button>
                      <Button variant="outlined" color="secondary" onClick={handleCancelEdit}>
                        Annulla
                      </Button>
                    </Box>
                  </Box>
                ) : (
                  <>
                    <Typography variant="h5" component="div" sx={{ fontWeight: "bold", mb: 1 }}>
                      {recensione.titolo}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                      {recensione.commento}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      {renderRating(recensione.rating)}
                      <Typography variant="h6" sx={{ ml: 1 }}>
                        {recensione.rating}/5
                      </Typography>
                    </Box>
                  </>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </Container>
    </ThemeProvider>
  )
}

export default RecensioneUtente
