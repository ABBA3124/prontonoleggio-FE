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
  Paper,
} from "@mui/material"
import { fetchWithTokenAggiungiVeicoloAuto } from "../../../../../../../api"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { set } from "date-fns"

const AggiungiAuto = () => {
  const [formData, setFormData] = useState({
    tipoVeicolo: "AUTO",
    disponibilita: "DISPONIBILE",
    nomeSede: "P.N. Milano",
    cittaSede: "Milano",
    viaSede: "Via Milano N.106 Cap 20019",
    provinciaSede: "MI",
    telefonoSede: "+39 3488637581",
    emailSede: "info@ProntoNoleggio.com",
    orariSede: "9:00-20:00",
    targa: "AB123CD",
    immagini: "url_immagine_auto",
    marca: "",
    modello: "",
    anno: "",
    categoria: "Utilitaria",
    alimentazione: "Benzina",
    cambio: "Automatico",
    trazione: "Anteriore",
    cilindrata: "",
    potenzaKw: "",
    consumoCarburante: "",
    posti: "",
    tariffaGiornaliera: "",
    chilometraggio: "",
    documentiAssicurativi: "url_documenti_assicurativi_auto",
    revisione: "url_revisione_auto",
    abs: false,
    porte: 5,
    capacitaBagagliaio: "",
    airbag: "",
    controlloStabilita: false,
    ariaCondizionata: false,
    sistemaNavigazione: false,
    sistemaAudio: "Base",
    bluetooth: false,
    sediliRiscaldati: false,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]:
        type === "checkbox" ? checked : name === "marca" || name === "modello" ? capitalizeFirstLetter(value) : value,
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
      setSuccess("Auto aggiunta con successo!")
      setError("")
      window.scrollTo(0, 0)
      setTimeout(() => {
        setSuccess("")
      }, 10000)
    } catch (error) {
      setError("Errore nell'aggiunta dell'auto.")
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
      <Container className="mt-5">
        <Typography variant="h1" align="center" gutterBottom>
          Aggiungi Auto
        </Typography>
        {loading && (
          <Box display="flex" justifyContent="center" mt={3}>
            <CircularProgress />
          </Box>
        )}
        {error && (
          <Alert severity="error" className="mb-3">
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" className="mt-3">
            {success}
          </Alert>
        )}
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h2">Sede</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth>
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
              <FormControl fullWidth>
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
              <FormControl fullWidth>
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
              <FormControl fullWidth>
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
            <Grid item xs={12} sm={6} md={2} className="mb-3">
              <FormControl fullWidth>
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
              <FormControl fullWidth>
                <InputLabel>Disponibilità</InputLabel>
                <Select
                  name="disponibilita"
                  value={formData.disponibilita}
                  onChange={handleChange}
                  label="Disponibilità"
                >
                  <MenuItem value="DISPONIBILE">Disponibile</MenuItem>
                  <MenuItem value="NON_DISPONIBILE">Non Disponibile</MenuItem>
                  <MenuItem value="MANUTENZIONE">In Manutenzione</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="Tariffa Giornaliera"
                name="tariffaGiornaliera"
                type="number"
                value={formData.tariffaGiornaliera}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="Documenti Assicurativi"
                name="documentiAssicurativi"
                value={formData.documentiAssicurativi}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3} className="mb-3">
              <TextField
                fullWidth
                label="Revisione"
                name="revisione"
                value={formData.revisione}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h2">Veicolo</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <TextField fullWidth label="Immagini" name="immagini" value={formData.immagini} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField fullWidth label="Targa" name="targa" value={formData.targa} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField fullWidth label="Marca" name="marca" value={formData.marca} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField fullWidth label="Modello" name="modello" value={formData.modello} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6} md={1}>
              <TextField
                fullWidth
                label="Anno"
                name="anno"
                type="number"
                value={formData.anno}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth>
                <InputLabel>Categoria</InputLabel>
                <Select name="categoria" value={formData.categoria} onChange={handleChange} label="Categoria">
                  <MenuItem value="Utilitaria">Utilitaria</MenuItem>
                  <MenuItem value="Berlina">Berlina</MenuItem>
                  <MenuItem value="Station Wagon">Station Wagon</MenuItem>
                  <MenuItem value="Monovolume">Monovolume</MenuItem>
                  <MenuItem value="Suv">Suv</MenuItem>
                  <MenuItem value="Coupé">Coupé</MenuItem>
                  <MenuItem value="Cabrio">Cabrio</MenuItem>
                  <MenuItem value="Sportiva">Sportiva</MenuItem>
                  <MenuItem value="Fuoristrada">Fuoristrada</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth>
                <InputLabel>Porte</InputLabel>
                <Select name="porte" value={formData.porte} onChange={handleChange} label="Porte">
                  <MenuItem value={5}>Cinque Porte</MenuItem>
                  <MenuItem value={3}>Tre Porte</MenuItem>
                  <MenuItem value={2}>Due Porte</MenuItem>
                  <MenuItem value={4}>Quattro Porte</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth>
                <InputLabel>Sistema Audio</InputLabel>
                <Select name="sistemaAudio" value={formData.sistemaAudio} onChange={handleChange} label="Sistema Audio">
                  <MenuItem value="Base">Base</MenuItem>
                  <MenuItem value="Premium">Premium</MenuItem>
                  <MenuItem value="Bose">Bose</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="Posti"
                name="posti"
                type="number"
                value={formData.posti}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="Chilometraggio"
                name="chilometraggio"
                type="number"
                value={formData.chilometraggio}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="Capacità Bagagliaio"
                name="capacitaBagagliaio"
                type="number"
                value={formData.capacitaBagagliaio}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3} className="mb-3">
              <TextField
                fullWidth
                label="Airbag"
                name="airbag"
                type="number"
                value={formData.airbag}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h2">Motore</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth>
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
              <FormControl fullWidth>
                <InputLabel>Cambio</InputLabel>
                <Select name="cambio" value={formData.cambio} onChange={handleChange} label="Cambio">
                  <MenuItem value="Automatico">Automatico</MenuItem>
                  <MenuItem value="Manuale">Manuale</MenuItem>
                  <MenuItem value="Sequenziale">Sequenziale</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth>
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
                label="Cilindrata"
                name="cilindrata"
                type="number"
                value={formData.cilindrata}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Potenza KW"
                name="potenzaKw"
                type="number"
                value={formData.potenzaKw}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} className="mb-3">
              <TextField
                fullWidth
                label="Consumo Carburante"
                name="consumoCarburante"
                type="number"
                value={formData.consumoCarburante}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h2">Optional</Typography>
            </Grid>
            {[
              { label: "ABS", name: "abs" },
              { label: "Controllo Stabilità", name: "controlloStabilita" },
              { label: "Aria Condizionata", name: "ariaCondizionata" },
              { label: "Sistema Navigazione", name: "sistemaNavigazione" },
              { label: "Bluetooth", name: "bluetooth" },
              { label: "Sedili Riscaldati", name: "sediliRiscaldati" },
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
        </Box>
        {loading && (
          <Box display="flex" justifyContent="center" mt={3}>
            <CircularProgress />
          </Box>
        )}
        {error && (
          <Alert severity="error" className="mb-3">
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" className="mt-3">
            {success}
          </Alert>
        )}
      </Container>
    </ThemeProvider>
  )
}

export default AggiungiAuto
