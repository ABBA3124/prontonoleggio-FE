import React, { useState } from "react"
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import { fetchGet } from "../../../../api"
import "./FiltraVeicoli.css"

const FiltraVeicoli = () => {
  const today = new Date().toISOString().split("T")[0]
  const [pickupDate, setPickupDate] = useState(today)
  const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
  const [dropoffDate, setDropoffDate] = useState(nextWeek)

  const [location, setLocation] = useState("")
  const [carType, setCarType] = useState("")
  const [carCategory, setCarCategory] = useState("")
  const [minPrezzo, setMinPrezzo] = useState("")
  const [maxPrezzo, setMaxPrezzo] = useState("")

  const handleFilter = async (e) => {
    e.preventDefault()
    const params = new URLSearchParams()

    if (location) params.append("posizione", location)
    if (pickupDate) params.append("dataInizio", pickupDate)
    if (dropoffDate) params.append("dataFine", dropoffDate)
    if (carType) params.append("tipoVeicolo", carType)
    if (carCategory) params.append("categoria", carCategory)
    if (minPrezzo) params.append("minPrezzo", minPrezzo)
    if (maxPrezzo) params.append("maxPrezzo", maxPrezzo)

    try {
      const veicoli = await fetchGet(`/veicoli/search?${params.toString()}`)
      console.log("Veicoli disponibili:", veicoli)
    } catch (error) {
      console.error("Errore nella ricerca dei veicoli:", error)
    }
  }

  return (
    <Box
      sx={{
        position: "absolute",
        top: { xs: "2%", sm: "55%", md: "55%", lg: "33%", xl: "40%" },
        left: "50%",
        transform: {
          xs: "translate(-50%, 25%)",
          sm: "translate(-50%, -55%)",
          md: "translate(-50%, -35%)",
          lg: "translate(-50%, 70%)",
          xl: "translate(-50%, 78%)",
        },

        color: "#ffffff",
        textAlign: "center",
        zIndex: 2,
        background: "color: #ffffff",
        padding: "0px",
        borderRadius: "10px",
      }}
    >
      <Container className="pickup-wrapper wow fadeInUp mt-4">
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          color="text.primary"
          sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 1 }}
        >
          <SearchIcon fontSize="large" />
          Cerca Veicoli
        </Typography>
        <form onSubmit={handleFilter}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth variant="outlined" sx={{ bgcolor: "white", borderRadius: 1 }}>
                <InputLabel>Località</InputLabel>
                <Select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  label="Località"
                  sx={{ color: "#000" }}
                >
                  <MenuItem value="">Tutte</MenuItem>
                  <MenuItem value="milano">Milano</MenuItem>
                  <MenuItem value="roma">Roma</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Data Inizio"
                type="date"
                fullWidth
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{ bgcolor: "white", borderRadius: 1 }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Data Fine"
                type="date"
                fullWidth
                value={dropoffDate}
                onChange={(e) => setDropoffDate(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{ bgcolor: "white", borderRadius: 1 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth variant="outlined" sx={{ bgcolor: "white", borderRadius: 1 }}>
                <InputLabel>Tipo Veicolo</InputLabel>
                <Select
                  value={carType}
                  onChange={(e) => setCarType(e.target.value)}
                  label="Tipo Veicolo"
                  sx={{ color: "#000" }}
                >
                  <MenuItem value="">Tutti</MenuItem>
                  <MenuItem value="AUTO">Auto</MenuItem>
                  <MenuItem value="MOTO">Moto</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth variant="outlined" sx={{ bgcolor: "white", borderRadius: 1 }}>
                <InputLabel>Categoria Veicolo</InputLabel>
                <Select
                  value={carCategory}
                  onChange={(e) => setCarCategory(e.target.value)}
                  label="Categoria Veicolo"
                  sx={{ color: "#000" }}
                >
                  <MenuItem value="">Tutti</MenuItem>
                  <MenuItem value="Utilitaria">Utilitaria</MenuItem>
                  <MenuItem value="Sportiva">Sportiva</MenuItem>
                  <MenuItem value="SUV">SUV</MenuItem>
                  <MenuItem value="Berlina">Berlina</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Prezzo Minimo"
                type="number"
                fullWidth
                value={minPrezzo}
                onChange={(e) => setMinPrezzo(e.target.value)}
                placeholder="Prezzo minimo"
                sx={{ bgcolor: "white", borderRadius: 1 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Prezzo Massimo"
                type="number"
                fullWidth
                value={maxPrezzo}
                onChange={(e) => setMaxPrezzo(e.target.value)}
                placeholder="Prezzo massimo"
                sx={{ bgcolor: "white", borderRadius: 1 }}
              />
            </Grid>
          </Grid>
          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Button variant="contained" color="primary" type="submit">
              Filtra
            </Button>
          </Box>
        </form>
      </Container>
    </Box>
  )
}

export default FiltraVeicoli
