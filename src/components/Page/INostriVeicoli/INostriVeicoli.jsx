import React, { useState, useEffect } from "react"
import {
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  CircularProgress,
  Alert,
  Pagination,
  Modal,
  Box,
  Typography,
} from "@mui/material"
import { fetchGet, fetchWithToken } from "../../../../api"
import { format } from "date-fns"
import SearchIcon from "@mui/icons-material/Search"
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar"
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import CancelIcon from "@mui/icons-material/Cancel"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation"
import EventIcon from "@mui/icons-material/Event"
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"
import AirIcon from "@mui/icons-material/Air"

const Veicoli = () => {
  const today = new Date().toISOString().split("T")[0]
  const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
  const [pickupDate, setPickupDate] = useState(today)
  const [dropoffDate, setDropoffDate] = useState(nextWeek)

  const [location, setLocation] = useState("")
  const [carType, setCarType] = useState("")
  const [carCategory, setCarCategory] = useState("")
  const [minPrezzo, setMinPrezzo] = useState("")
  const [maxPrezzo, setMaxPrezzo] = useState("")

  const [veicoli, setVeicoli] = useState([])
  const [caricamento, setCaricamento] = useState(true)
  const [errore, setErrore] = useState(null)
  const [user, setUser] = useState(null)
  const [prenotazioneSuccesso, setPrenotazioneSuccesso] = useState("")
  const [prenotazioneErrore, setPrenotazioneErrore] = useState("")

  const [showModal, setShowModal] = useState(false)
  const [selectedVeicolo, setSelectedVeicolo] = useState(null)

  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const size = 16

  const [totalElements, setTotalElements] = useState(0)

  const [totaleGiorni, setTotaleGiorni] = useState(0)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const fetchUtente = async () => {
      try {
        const user = await fetchWithToken("/utente/me")
        setUser(user)
      } catch (error) {
        setErrore("Errore durante il caricamento del profilo.")
      }
    }
    fetchUtente()
    fetchVeicoli()
  }, [page, pickupDate, dropoffDate, location, carType, carCategory, minPrezzo, maxPrezzo])

  const fetchVeicoli = async () => {
    const params = new URLSearchParams()
    if (pickupDate) params.append("dataInizio", pickupDate)
    if (dropoffDate) params.append("dataFine", dropoffDate)
    if (location) params.append("posizione", location)
    if (carType) params.append("tipoVeicolo", carType)
    if (carCategory) params.append("categoria", carCategory)
    if (minPrezzo) params.append("minPrezzo", minPrezzo)
    if (maxPrezzo) params.append("maxPrezzo", maxPrezzo)

    try {
      const veicoliFiltrati = await fetchGet(`/veicoli/search?page=${page}&size=${size}&${params.toString()}`)
      setTotalPages(veicoliFiltrati.page.totalPages)
      setVeicoli(veicoliFiltrati.content)
      setTotalElements(veicoliFiltrati.page.totalElements)
      setCaricamento(false)
    } catch (error) {
      console.error("Errore nella ricerca dei veicoli:", error)
      setErrore("Errore durante il caricamento dei veicoli.")
      setCaricamento(false)
    }
  }

  const handleFilter = (e) => {
    e.preventDefault()
    setPage(0)
  }

  const handlePrenota = (veicolo) => {
    setSelectedVeicolo(veicolo)
    setShowModal(true)
  }

  const handleDettagli = (veicoloId) => {
    console.log(`Mostra dettagli veicolo con ID: ${veicoloId}`)
  }

  const handleSubmitPrenotazione = async () => {
    if (!user) {
      setPrenotazioneErrore("Utente non trovato.")
      return
    }

    const prenotazione = {
      veicoloId: selectedVeicolo.id,
      utenteId: user.id,
      dataInizio: pickupDate,
      dataFine: dropoffDate,
    }

    try {
      await fetchWithToken("/prenotazioni/crea", {
        method: "POST",
        body: JSON.stringify(prenotazione),
      })
      setPrenotazioneSuccesso("Prenotazione effettuata con successo!")
      setPrenotazioneErrore("")
      setPage(0)
      fetchVeicoli()
      setTimeout(() => {
        setShowModal(false)
        setPrenotazioneSuccesso("")
        setPrenotazioneErrore("")
      }, 1000)
    } catch (error) {
      setPrenotazioneErrore("Veicolo non disponibile per la data selezionata.")
      setPrenotazioneSuccesso("")
      fetchVeicoli()
      setTimeout(() => {
        setShowModal(false)
        setPrenotazioneSuccesso("")
        setPrenotazioneErrore("")
      }, 1500)
    }
  }

  const handlePageChange = (newPage) => {
    setPage(newPage)
  }

  const handleReset = (e) => {
    e.preventDefault()
    setPickupDate(today)
    setDropoffDate(nextWeek)
    setLocation("")
    setCarType("")
    setCarCategory("")
    setMinPrezzo("")
    setMaxPrezzo("")
    setPage(0)
    fetchVeicoli()
  }

  const handleDateChange = (setter) => (e) => {
    const newDate = e.target.value
    setter(newDate)

    if (setter === setPickupDate && newDate >= dropoffDate) {
      const nextDay = new Date(newDate)
      nextDay.setDate(nextDay.getDate() + 1)
      setDropoffDate(nextDay.toISOString().split("T")[0])
    } else if (setter === setDropoffDate) {
      if (newDate === pickupDate || newDate < pickupDate) {
        const nextDay = new Date(pickupDate)
        nextDay.setDate(nextDay.getDate() + 1)
        setDropoffDate(nextDay.toISOString().split("T")[0])
      }
    }
  }

  useEffect(() => {
    if (selectedVeicolo) {
      const startDate = new Date(pickupDate)
      let endDate = new Date(dropoffDate)
      let diffTime = Math.abs(endDate - startDate)
      let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

      if (diffDays === 0) {
        endDate.setDate(endDate.getDate() + 1)
        setDropoffDate(endDate.toISOString().split("T")[0])
        diffTime = Math.abs(endDate - startDate)
        diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      }
      setTotaleGiorni(diffDays)
      setTotal(
        (diffDays * selectedVeicolo.tariffaGiornaliera).toLocaleString("it-IT", { style: "currency", currency: "EUR" })
      )
    }
  }, [pickupDate, dropoffDate, selectedVeicolo])

  return (
    <Container>
      <Box className="rounded-5 p-4 filter-form-container shadow" sx={{ mb: 5 }}>
        <Typography variant="h4" align="center" gutterBottom>
          <SearchIcon fontSize="large" /> Cerca Veicoli ({totalElements} trovati)
        </Typography>
        <form onSubmit={handleFilter}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Località</InputLabel>
                <Select value={location} onChange={(e) => setLocation(e.target.value)}>
                  <MenuItem value="">Tutte</MenuItem>
                  <MenuItem value="Milano">Milano</MenuItem>
                  <MenuItem value="Roma">Roma</MenuItem>
                  <MenuItem value="Napoli">Napoli</MenuItem>
                  <MenuItem value="Messina">Messina</MenuItem>
                  <MenuItem value="Catania">Catania</MenuItem>
                  <MenuItem value="Palermo">Palermo</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Data Inizio"
                type="date"
                fullWidth
                value={pickupDate}
                onChange={handleDateChange(setPickupDate)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Data Fine"
                type="date"
                fullWidth
                value={dropoffDate}
                onChange={handleDateChange(setDropoffDate)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <FormControl fullWidth>
                <InputLabel>Tipo Veicolo</InputLabel>
                <Select value={carType} onChange={(e) => setCarType(e.target.value)}>
                  <MenuItem value="">Tutti</MenuItem>
                  <MenuItem value="AUTO">Auto</MenuItem>
                  <MenuItem value="MOTO">Moto</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <FormControl fullWidth>
                <InputLabel>Categoria Veicolo</InputLabel>
                <Select value={carCategory} onChange={(e) => setCarCategory(e.target.value)}>
                  <MenuItem value="">Tutti</MenuItem>
                  <MenuItem value="Utilitaria">Utilitaria</MenuItem>
                  <MenuItem value="Sportiva">Sportiva</MenuItem>
                  <MenuItem value="Suv">SUV</MenuItem>
                  <MenuItem value="Berlina">Berlina</MenuItem>
                  <MenuItem value="Moto">Moto</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                label="Prezzo Minimo"
                type="number"
                fullWidth
                value={minPrezzo}
                onChange={(e) => setMinPrezzo(e.target.value)}
                placeholder="Prezzo minimo"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                label="Prezzo Massimo"
                type="number"
                fullWidth
                value={maxPrezzo}
                onChange={(e) => setMaxPrezzo(e.target.value)}
                placeholder="Prezzo massimo"
              />
            </Grid>
          </Grid>
          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Button variant="contained" color="secondary" onClick={handleReset}>
              Resetta
            </Button>
          </Box>
        </form>
      </Box>
      <Container>
        {caricamento ? (
          <Box textAlign="center" py={5}>
            <CircularProgress />
          </Box>
        ) : errore ? (
          <Alert severity="error">{errore}</Alert>
        ) : (
          <Grid container spacing={4}>
            {veicoli.map((veicolo) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={veicolo.id}>
                <Card
                  className="vehicle-card shadow-sm h-100"
                  sx={{
                    borderRadius: 2,
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: 6,
                    },
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <CardMedia
                    component="img"
                    alt={`${veicolo.marca} ${veicolo.modello}`}
                    height="200"
                    image={veicolo.immagini}
                    sx={{ filter: "brightness(0.85)" }}
                  />
                  <CardContent sx={{ paddingBottom: "16px" }}>
                    <Typography variant="h6" component="div" sx={{ fontWeight: "bold", mb: 1 }}>
                      {veicolo.marca} {veicolo.modello}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1, color: "text.secondary" }}>
                      <strong>Tipo Veicolo: </strong>
                      {veicolo.tipoVeicolo === "MOTO" ? (
                        <TwoWheelerIcon sx={{ verticalAlign: "middle", color: "primary.main" }} />
                      ) : veicolo.tipoVeicolo === "AUTO" ? (
                        <DirectionsCarIcon sx={{ verticalAlign: "middle", color: "primary.main" }} />
                      ) : (
                        ""
                      )}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1, color: "text.secondary" }}>
                      <strong>Categoria: </strong>
                      {veicolo.categoria}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1, color: "text.secondary" }}>
                      <strong>
                        <LocalGasStationIcon sx={{ verticalAlign: "middle", color: "primary.main" }} /> Chilometraggio
                        Illimitato
                      </strong>
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1, color: "text.secondary" }}>
                      <strong>
                        <AirIcon sx={{ verticalAlign: "middle", color: "primary.main" }} /> Aria Condizionata:{" "}
                      </strong>
                      {veicolo.ariaCondizionata ? (
                        <CheckCircleIcon sx={{ color: "success.main", verticalAlign: "middle" }} />
                      ) : (
                        <CancelIcon sx={{ color: "error.main", verticalAlign: "middle" }} />
                      )}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ mb: 1, color: "text.secondary", display: "flex", alignItems: "center" }}
                    >
                      <i className="bi bi-person-fill" style={{ marginRight: "4px", color: "primary.main" }}></i>
                      <strong>Posti:</strong>
                      <span style={{ marginLeft: "4px" }}>{veicolo.posti}</span>
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{ mb: 1, color: "text.secondary", display: "flex", alignItems: "center" }}
                    >
                      <i className="bi bi-shield-shaded" style={{ marginRight: "4px", color: "primary.main" }}></i>
                      <strong>Copertura contro danni e furto</strong>
                    </Typography>

                    <hr />
                    <Typography
                      variant="body2"
                      sx={{ mb: 1, color: "text.secondary", display: "flex", alignItems: "center" }}
                    >
                      <LocationOnIcon sx={{ mr: 0.5, color: "primary.main" }} />
                      <strong>Località di ritiro: </strong>
                      <span style={{ marginLeft: "4px" }}>
                        {veicolo.posizione}, {veicolo.viaSede}
                      </span>
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ mb: 1, color: "text.secondary", display: "flex", alignItems: "center" }}
                    >
                      <AttachMoneyIcon sx={{ mr: 0.5, color: "primary.main" }} />
                      <strong>Tariffa giornaliera: </strong> {veicolo.tariffaGiornaliera} € /giorno
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "space-between", padding: 2 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handlePrenota(veicolo)}
                      sx={{
                        transition: "background-color 0.3s, transform 0.3s",
                        "&:hover": {
                          backgroundColor: "darkblue",
                          transform: "scale(1.05)",
                        },
                        display: "flex",
                        alignItems: "center",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <i className="bi bi-calendar-check" style={{ marginRight: "8px", flexShrink: 0 }}></i>
                      Prenota Ora
                    </Button>

                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleDettagli(veicolo.id)}
                      sx={{
                        transition: "background-color 0.3s, transform 0.3s",
                        "&:hover": {
                          backgroundColor: "lightgrey",
                          transform: "scale(1.05)",
                        },
                      }}
                    >
                      Dettagli
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
        <Pagination
          count={totalPages}
          page={page + 1}
          onChange={(event, value) => handlePageChange(value - 1)}
          sx={{ mt: 3, display: "flex", justifyContent: "center" }}
          className="mb-3"
        />
      </Container>
      {selectedVeicolo && (
        <Modal open={showModal} onClose={() => setShowModal(false)} aria-labelledby="modal-title" centered>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
            }}
          >
            <Typography id="modal-title" variant="h6" component="h2">
              Conferma Prenotazione
            </Typography>
            <Container>
              <Grid container spacing={2}>
                <Grid item xs={12} className="text-center mb-3">
                  <Typography variant="h6" component="p" className="mb-3 text-center price-info">
                    {selectedVeicolo.marca} {selectedVeicolo.modello}
                  </Typography>
                  <img
                    src={selectedVeicolo.immagini}
                    className="vehicle-card-img rounded-5 mb-3"
                    style={{ width: "100%" }}
                    alt={`${selectedVeicolo.marca} ${selectedVeicolo.modello}`}
                  />
                  <Box className="d-flex justify-content-around mb-3 date-container">
                    <Box className="text-center date-info">
                      <Typography variant="body2" component="p">
                        <strong>Data Inizio:</strong>
                      </Typography>
                      <Typography variant="body2" component="p">
                        {format(new Date(pickupDate), "dd/MM/yyyy")}
                      </Typography>
                    </Box>
                    <Box className="text-center date-info">
                      <Typography variant="body2" component="p">
                        <strong>Data Fine:</strong>
                      </Typography>
                      <Typography variant="body2" component="p">
                        {format(new Date(dropoffDate), "dd/MM/yyyy")}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="body2" component="p" className="mb-3 date-container text-center price-info">
                    Totale {total} iva inclusa
                    <Typography variant="body2" component="p" className="fs-6">
                      per {totaleGiorni} giorni/o
                    </Typography>
                  </Typography>
                  <Box className="confirm-message mb-3">
                    <Typography variant="body2" component="p" className="m-0">
                      <i className="bi bi-question-circle-fill me-2"></i>
                      Vuoi confermare la prenotazione di questo veicolo?
                    </Typography>
                  </Box>
                  {prenotazioneErrore && <Alert severity="error">{prenotazioneErrore}</Alert>}
                  {prenotazioneSuccesso && <Alert severity="success">{prenotazioneSuccesso}</Alert>}
                </Grid>
              </Grid>
            </Container>
            <Box className="d-flex justify-content-between">
              <Button variant="outlined" color="secondary" onClick={() => setShowModal(false)}>
                Annulla
              </Button>
              <Button variant="contained" color="primary" onClick={handleSubmitPrenotazione}>
                Conferma Prenotazione
              </Button>
            </Box>
          </Box>
        </Modal>
      )}
    </Container>
  )
}

export default Veicoli
