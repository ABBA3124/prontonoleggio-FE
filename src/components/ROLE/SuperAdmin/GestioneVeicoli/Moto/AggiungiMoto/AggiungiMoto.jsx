import React, { useState } from "react"
import {
  Container,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  CircularProgress,
  Alert,
  Typography,
  Box,
  Grid,
} from "@mui/material"
import { fetchWithTokenAggiungiVeicoloAuto } from "../../../../../../../api"
import { createTheme, ThemeProvider } from "@mui/material/styles"

const AggiungiMoto = () => {
  const [formData, setFormData] = useState({
    tipoVeicolo: "MOTO",
    disponibilita: "DISPONIBILE",
    nomeSede: "P.N. Milano",
    cittaSede: "Milano",
    viaSede: "Via Milano N.106 Cap 20019",
    provinciaSede: "MI",
    telefonoSede: "+39 3488637581",
    emailSede: "info@ProntoNoleggio.com",
    orariSede: "9:00-20:00",
    targa: "AB123CD",
    immagini: "url_immagine_moto",
    marca: "",
    modello: "",
    anno: "",
    categoria: "Sportiva",
    alimentazione: "Benzina",
    cambio: "Manuale",
    trazione: "Posteriore",
    cilindrata: "",
    potenzaKw: "",
    consumoCarburante: "",
    posti: "",
    tariffaGiornaliera: "",
    chilometraggio: "",
    documentiAssicurativi: "url_documenti_assicurativi_moto",
    revisione: "url_revisione_moto",
    abs: true,
    bauletto: true,
    parabrezza: true,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const capitalizeFirstLetterMarca = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
  }

  const capitalizeFirstLetterModello = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
  }

  const capitalizeFirstLetterTarga = (string) => {
    return (
      string.charAt(0).toUpperCase() +
      string.charAt(1).toUpperCase() +
      string.charAt(2) +
      string.charAt(3) +
      string.charAt(4) +
      string.charAt(5).toUpperCase() +
      string.charAt(6).toUpperCase()
    )
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]:
        type === "checkbox"
          ? checked
          : name === "marca"
          ? capitalizeFirstLetterMarca(value)
          : name === "modello"
          ? capitalizeFirstLetterModello(value)
          : name === "targa"
          ? capitalizeFirstLetterTarga(value)
          : value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      const response = await fetchWithTokenAggiungiVeicoloAuto("/veicoli/salva", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      setSuccess("Moto aggiunta con successo!")
      setError("")
      window.scrollTo(0, 0)
      setTimeout(() => {
        setSuccess("")
      }, 4000)
    } catch (error) {
      setError("Errore nell'aggiunta Della Moto.")
      setSuccess("")
      window.scrollTo(0, 0)
      setTimeout(() => {
        setError("")
      }, 4000)
    } finally {
      setLoading(false)
    }
  }

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

  return (
    <ThemeProvider theme={theme}>
      <Container className="mt-2">
        <Typography variant="h1" align="center" gutterBottom>
          Aggiungi Moto
        </Typography>
        {loading && (
          <Box display="flex" justifyContent="center" mt={3}>
            <CircularProgress />
          </Box>
        )}
        {error && (
          <Alert severity="error" className="mb-3 mb-3">
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" className="mt-3 mb-3">
            {success}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h2">Dati Sede</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Nome Sede</InputLabel>
                <Select name="nomeSede" value={formData.nomeSede} onChange={handleChange} label="Nome Sede">
                  <MenuItem value="P.N. Milano">P.N. Milano</MenuItem>
                  <MenuItem value="P.N. Roma">P.N. Roma</MenuItem>
                  <MenuItem value="P.N. Napoli">P.N. Napoli</MenuItem>
                  <MenuItem value="P.N. Messina">P.N. Messina</MenuItem>
                  <MenuItem value="P.N. Catania">P.N. Catania</MenuItem>
                  <MenuItem value="P.N. Palermo">P.N. Palermo</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Posizione Sede</InputLabel>
                <Select name="cittaSede" value={formData.cittaSede} onChange={handleChange} label="Posizione Sede">
                  <MenuItem value="Milano">Milano</MenuItem>
                  <MenuItem value="Roma">Roma</MenuItem>
                  <MenuItem value="Napoli">Napoli</MenuItem>
                  <MenuItem value="Messina">Messina</MenuItem>
                  <MenuItem value="Catania">Catania</MenuItem>
                  <MenuItem value="Palermo">Palermo</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Via Sede</InputLabel>
                <Select name="viaSede" value={formData.viaSede} onChange={handleChange} label="Via Sede">
                  <MenuItem value="Via Milano N.106 Cap 20019">Via Milano</MenuItem>
                  <MenuItem value="Via Roma N.15 Cap 00128">Via Roma</MenuItem>
                  <MenuItem value="Via Napoli N.36 Cap 80013">Via Napoli</MenuItem>
                  <MenuItem value="Via Messina N.21 Cap 98121">Via Messina</MenuItem>
                  <MenuItem value="Via Catania N.8 Cap 95100">Via Catania</MenuItem>
                  <MenuItem value="Via Palermo N.1 Cap 90121">Via Palermo</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Provincia Sede</InputLabel>
                <Select
                  name="provinciaSede"
                  value={formData.provinciaSede}
                  onChange={handleChange}
                  label="Provincia Sede"
                >
                  <MenuItem value="MI">MI</MenuItem>
                  <MenuItem value="RO">RO</MenuItem>
                  <MenuItem value="NA">NA</MenuItem>
                  <MenuItem value="ME">ME</MenuItem>
                  <MenuItem value="CA">CA</MenuItem>
                  <MenuItem value="PA">PA</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Telefono Sede</InputLabel>
                <Select name="telefonoSede" value={formData.telefonoSede} onChange={handleChange} label="Telefono Sede">
                  <MenuItem value="+39 3488637581">MI</MenuItem>
                  <MenuItem value="+39 3488637582">RO</MenuItem>
                  <MenuItem value="+39 3488637583">NA</MenuItem>
                  <MenuItem value="+39 3488637584">ME</MenuItem>
                  <MenuItem value="+39 3488637585">CA</MenuItem>
                  <MenuItem value="+39 3488637586">PA</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h2">Noleggio</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Disponibilità</InputLabel>
                <Select
                  name="disponibilita"
                  value={formData.disponibilita}
                  onChange={handleChange}
                  label="Disponibilità"
                >
                  <MenuItem value="DISPONIBILE">Disponibile</MenuItem>
                  <MenuItem value="NON_DISPONIBILE">Non Disponibile</MenuItem>
                  <MenuItem value="MANUTENZIONE">Manutenzione</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                margin="normal"
                label="Tariffa Giornaliera"
                type="number"
                placeholder="Inserisci tariffa giornaliera"
                name="tariffaGiornaliera"
                value={formData.tariffaGiornaliera}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                margin="normal"
                label="Documenti Assicurativi"
                placeholder="Inserisci documenti assicurativi"
                name="documentiAssicurativi"
                value={formData.documentiAssicurativi}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                margin="normal"
                label="Revisione"
                placeholder="Inserisci revisione"
                name="revisione"
                value={formData.revisione}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h2">Veicolo</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                margin="normal"
                label="Immagini"
                placeholder="Inserisci URL immagini"
                name="immagini"
                value={formData.immagini}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                margin="normal"
                label="Targa"
                placeholder="Inserisci targa"
                name="targa"
                value={formData.targa}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                margin="normal"
                label="Marca"
                placeholder="Inserisci marca"
                name="marca"
                value={formData.marca}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                margin="normal"
                label="Modello"
                placeholder="Inserisci modello"
                name="modello"
                value={formData.modello}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                margin="normal"
                label="Anno"
                type="number"
                placeholder="Inserisci anno"
                name="anno"
                value={formData.anno}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Categoria</InputLabel>
                <Select name="categoria" value={formData.categoria} onChange={handleChange} label="Categoria">
                  <MenuItem value="Sportiva">Sportiva</MenuItem>
                  <MenuItem value="Cruiser">Cruiser</MenuItem>
                  <MenuItem value="Touring">Touring</MenuItem>
                  <MenuItem value="Enduro">Enduro</MenuItem>
                  <MenuItem value="Naked">Naked</MenuItem>
                  <MenuItem value="Cross">Cross</MenuItem>
                  <MenuItem value="Scooter">Scooter</MenuItem>
                  <MenuItem value="Cafe Racer">Cafe Racer</MenuItem>
                  <MenuItem value="Chopper">Chopper</MenuItem>
                  <MenuItem value="Trial">Trial</MenuItem>
                  <MenuItem value="Adventure">Adventure</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                margin="normal"
                label="Posti"
                type="number"
                placeholder="Inserisci numero di posti"
                name="posti"
                value={formData.posti}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                margin="normal"
                label="Chilometraggio"
                type="number"
                placeholder="Inserisci chilometraggio"
                name="chilometraggio"
                value={formData.chilometraggio}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h2">Motore</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Alimentazione</InputLabel>
                <Select
                  name="alimentazione"
                  value={formData.alimentazione}
                  onChange={handleChange}
                  label="Alimentazione"
                >
                  <MenuItem value="Benzina">Benzina</MenuItem>
                  <MenuItem value="Diesel">Diesel</MenuItem>
                  <MenuItem value="Ibrido">Ibrido</MenuItem>
                  <MenuItem value="Elettrico">Elettrico</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Cambio</InputLabel>
                <Select name="cambio" value={formData.cambio} onChange={handleChange} label="Cambio">
                  <MenuItem value="Automatico">Automatico</MenuItem>
                  <MenuItem value="Manuale">Manuale</MenuItem>
                  <MenuItem value="Sequenziale">Sequenziale</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Trazione</InputLabel>
                <Select name="trazione" value={formData.trazione} onChange={handleChange} label="Trazione">
                  <MenuItem value="Anteriore">Anteriore</MenuItem>
                  <MenuItem value="Posteriore">Posteriore</MenuItem>
                  <MenuItem value="4x4">4x4</MenuItem>
                  <MenuItem value="Q2">Q2</MenuItem>
                  <MenuItem value="Q4">Q4</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                margin="normal"
                label="Cilindrata"
                type="number"
                placeholder="Inserisci cilindrata"
                name="cilindrata"
                value={formData.cilindrata}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                margin="normal"
                label="Potenza"
                type="number"
                placeholder="Inserisci potenza in Kw"
                name="potenzaKw"
                value={formData.potenzaKw}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                margin="normal"
                label="Consumo Carburante"
                type="number"
                placeholder="Inserisci consumo carburante"
                name="consumoCarburante"
                value={formData.consumoCarburante}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h2">Optional</Typography>
            </Grid>
            {[
              { label: "ABS", name: "abs" },
              { label: "Bauletto", name: "bauletto" },
              { label: "Parabrezza", name: "parabrezza" },
            ].map((field, index) => (
              <Grid item xs={4} key={index}>
                <FormControlLabel
                  control={<Checkbox checked={formData[field.name]} onChange={handleChange} name={field.name} />}
                  label={field.label}
                />
              </Grid>
            ))}
          </Grid>
          <Button variant="contained" color="primary" type="submit" className="mt-3 mb-3" disabled={loading}>
            Aggiungi
          </Button>
        </form>
      </Container>
    </ThemeProvider>
  )
}

export default AggiungiMoto
