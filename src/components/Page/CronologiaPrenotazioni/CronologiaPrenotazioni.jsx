import React, { useState, useEffect } from "react"
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Modal,
  TextField,
  Alert,
  Pagination,
  CircularProgress,
  Box,
  Stack,
  IconButton,
} from "@mui/material"
import { format } from "date-fns"
import { updatePrenotazione, deletePrenotazione, fetchMePrenotazioni } from "../../../../api"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import EventIcon from "@mui/icons-material/Event"
import EuroIcon from "@mui/icons-material/Euro"

const CronologiaPrenotazioni = () => {
  const [prenotazioni, setPrenotazioni] = useState([])
  const [caricamento, setCaricamento] = useState(true)
  const [errore, setErrore] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedPrenotazione, setSelectedPrenotazione] = useState(null)
  const [modificaDataInizio, setModificaDataInizio] = useState("")
  const [modificaDataFine, setModificaDataFine] = useState("")
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [totalElements, setTotalElements] = useState(0)

  useEffect(() => {
    const fetchPrenotazioni = async () => {
      try {
        const response = await fetchMePrenotazioni(page)
        setPrenotazioni(response.content)
        setTotalPages(response.page.totalPages)
        setTotalElements(response.page.totalElements)
        setCaricamento(false)
      } catch (error) {
        setErrore("Errore durante il caricamento della cronologia delle tue prenotazioni.")
        setCaricamento(false)
      }
    }

    fetchPrenotazioni()
  }, [page])

  const handleModifica = (prenotazione) => {
    setSelectedPrenotazione(prenotazione)
    setModificaDataInizio(prenotazione.dataInizio)
    setModificaDataFine(prenotazione.dataFine)
    setShowModal(true)
  }

  const handleElimina = async () => {
    try {
      await deletePrenotazione(`/prenotazioni/cancella/${selectedPrenotazione.id}`)
      setPrenotazioni(prenotazioni.filter((prenotazione) => prenotazione.id !== selectedPrenotazione.id))
      setSuccess("Prenotazione eliminata con successo.")
      setError("")
      setTimeout(() => {
        setError("")
        setSuccess("")
        setTotalElements(totalElements - 1)
        setShowDeleteModal(false)
      }, 1500)
    } catch (error) {
      setSuccess("")
      setError("Errore durante l'eliminazione della prenotazione.")
      setTimeout(() => {
        setShowDeleteModal(false)
        setError("")
        setSuccess("")
      }, 1500)
    }
  }

  const handleSubmitModifica = async () => {
    try {
      const updatedPrenotazione = {
        veicoloId: selectedPrenotazione.veicolo.id,
        dataInizio: modificaDataInizio,
        dataFine: modificaDataFine,
      }
      await updatePrenotazione(selectedPrenotazione.id, updatedPrenotazione)
      setPrenotazioni(
        prenotazioni.map((prenotazione) =>
          prenotazione.id === selectedPrenotazione.id ? { ...prenotazione, ...updatedPrenotazione } : prenotazione
        )
      )
      setSuccess("Prenotazione modificata con successo.")
      setError("")
      setTimeout(() => {
        setShowModal(false)
        setError("")
        setSuccess("")
      }, 1500)
    } catch (error) {
      setError("Errore durante la modifica della prenotazione.")
      setSuccess("")
      setTimeout(() => {
        setShowModal(false)
        setError("")
        setSuccess("")
      }, 1500)
    }
  }

  const handlePageChange = (event, value) => {
    setPage(value - 1)
  }

  const calculateTotal = (prenotazione) => {
    const startDate = new Date(prenotazione.dataInizio)
    const endDate = new Date(prenotazione.dataFine)
    const diffTime = Math.abs(endDate - startDate)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    const total = diffDays * prenotazione.veicolo.tariffaGiornaliera
    return { totalDays: diffDays, totalAmount: total.toLocaleString("it-IT", { style: "currency", currency: "EUR" }) }
  }

  if (caricamento) {
    return (
      <Container className="py-5 text-center">
        <CircularProgress />
      </Container>
    )
  }

  if (errore) {
    return (
      <Container className="py-5 text-center">
        <Alert severity="error">{errore}</Alert>
      </Container>
    )
  }

  return (
    <Container>
      <Typography
        className="mt-4"
        variant="h4"
        gutterBottom
        align="center"
        sx={{ mb: 4, fontWeight: "bold", color: "#007bff" }}
      >
        Cronologia Prenotazioni {totalElements > 0 && `(${totalElements})`}
      </Typography>

      {prenotazioni.length === 0 ? (
        <Alert severity="info">Nessuna prenotazione trovata.</Alert>
      ) : (
        <Grid container spacing={3}>
          {prenotazioni.map((prenotazione) => {
            const { totalDays, totalAmount } = calculateTotal(prenotazione)
            return (
              <Grid item xs={12} sm={6} md={4} key={prenotazione.id}>
                <Card
                  sx={{
                    borderRadius: 2,
                    boxShadow: 3,
                    "&:hover": { boxShadow: 6 },
                    overflow: "hidden",
                    position: "relative",
                    transition: "transform 0.2s",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="280"
                    image={prenotazione.veicolo.immagini}
                    alt={`${prenotazione.veicolo.marca} ${prenotazione.veicolo.modello}`}
                    sx={{ filter: "brightness(0.85)" }}
                  />
                  <CardContent sx={{ position: "relative", flexGrow: 1 }}>
                    <Box sx={{ position: "absolute", top: 8, right: 8 }}>
                      <IconButton color="primary" onClick={() => handleModifica(prenotazione)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        sx={{ color: "red" }}
                        onClick={() => {
                          setSelectedPrenotazione(prenotazione)
                          setShowDeleteModal(true)
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                    <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: "bold" }}>
                      {prenotazione.veicolo.marca} {prenotazione.veicolo.modello}
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        <EventIcon fontSize="small" sx={{ mr: 0.5, color: "primary.main" }} />
                        <span style={{ fontWeight: "bold", marginRight: 4 }}>Numero Prenotazione:</span>{" "}
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        <span fontSize="small" style={{ fontWeight: "bold" }}>
                          {prenotazione.id}
                        </span>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        <EventIcon fontSize="small" sx={{ mr: 0.5, color: "primary.main" }} />
                        <span style={{ fontWeight: "bold", marginRight: 4 }}>Anno:</span> {prenotazione.veicolo.anno}
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        <EventIcon fontSize="small" sx={{ mr: 0.5, color: "primary.main" }} />
                        <span style={{ fontWeight: "bold", marginRight: 4 }}>Categoria:</span>{" "}
                        {prenotazione.veicolo.categoria}
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        <EuroIcon fontSize="small" sx={{ mr: 0.5, color: "success.main" }} />
                        <span style={{ fontWeight: "bold", marginRight: 4 }}>Tariffa Giornaliera:</span>{" "}
                        {prenotazione.veicolo.tariffaGiornaliera}€
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        <EuroIcon fontSize="small" sx={{ mr: 0.5, color: "success.main" }} />
                        <span style={{ fontWeight: "bold", marginRight: 4 }}>Totale:</span> {totalAmount} {"("}
                        {totalDays} giorni/o {")"}
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        <EventIcon fontSize="small" sx={{ mr: 0.5, color: "primary.main" }} />
                        <span style={{ fontWeight: "bold", marginRight: 4 }}>Prenotata Il:</span>{" "}
                        {format(new Date(prenotazione.dataCreazione), "dd/MM/yyyy HH:mm")}
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        <EventIcon fontSize="small" sx={{ mr: 0.5, color: "primary.main" }} />
                        <span style={{ fontWeight: "bold", marginRight: 4 }}>Data Inizio:</span>{" "}
                        {format(new Date(prenotazione.dataInizio), "dd/MM/yyyy")}
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        <EventIcon fontSize="small" sx={{ mr: 0.5, color: "primary.main" }} />
                        <span style={{ fontWeight: "bold", marginRight: 4 }}>Data Fine:</span>{" "}
                        {format(new Date(prenotazione.dataFine), "dd/MM/yyyy")}
                      </Box>
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "space-between", mt: "auto" }}></CardActions>
                </Card>
              </Grid>
            )
          })}
        </Grid>
      )}
      <Box my={4} display="flex" justifyContent="center">
        <Pagination count={totalPages} page={page + 1} onChange={handlePageChange} variant="outlined" color="primary" />
      </Box>
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <Box sx={{ p: 4, backgroundColor: "white", borderRadius: 1, maxWidth: 400, mx: "auto", mt: 5 }}>
          <Typography variant="h6" gutterBottom>
            Modifica Prenotazione
          </Typography>
          <Stack spacing={2}>
            <TextField
              label="Data Inizio"
              type="date"
              value={modificaDataInizio}
              onChange={(e) => setModificaDataInizio(e.target.value)}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="Data Fine"
              type="date"
              value={modificaDataFine}
              onChange={(e) => setModificaDataFine(e.target.value)}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
            {success && <Alert severity="success">{success}</Alert>}
            {error && <Alert severity="error">{error}</Alert>}
          </Stack>
          <Box mt={2} display="flex" justifyContent="space-between">
            <Button variant="contained" color="primary" onClick={handleSubmitModifica}>
              Salva Modifiche
            </Button>
            <Button variant="outlined" color="secondary" onClick={() => setShowModal(false)}>
              Annulla
            </Button>
          </Box>
        </Box>
      </Modal>
      <Modal open={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <Box sx={{ p: 4, backgroundColor: "white", borderRadius: 1, maxWidth: 400, mx: "auto", mt: 5 }}>
          <Typography variant="h6" gutterBottom>
            Conferma Eliminazione
          </Typography>
          <Typography variant="body1">Sei sicuro di voler eliminare questa prenotazione?</Typography>
          {success && <Alert severity="success">{success}</Alert>}
          {error && <Alert severity="error">{error}</Alert>}
          <Box mt={2} display="flex" justifyContent="space-between">
            <Button variant="contained" color="secondary" onClick={handleElimina}>
              Elimina
            </Button>
            <Button variant="outlined" color="primary" onClick={() => setShowDeleteModal(false)}>
              Annulla
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  )
}

export default CronologiaPrenotazioni
