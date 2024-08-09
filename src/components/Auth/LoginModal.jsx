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
  Checkbox,
  FormControlLabel,
  TextField,
  CssBaseline,
  Alert,
  IconButton,
} from "@mui/material"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { login } from "../../../api"
import CloseIcon from "@mui/icons-material/Close"
import RegisterModal from "./RegisterModal"

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="/">
        Pronto Noleggio
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  )
}

const theme = createTheme()

const LoginModal = ({ show, handleClose }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showRegisterModal, setShowRegisterModal] = useState(false)

  const handleLoginModalClose = () => setShowLoginModal(false)
  const handleLoginModalShow = () => setShowLoginModal(true)
  const handleRegisterModalClose = () => setShowRegisterModal(false)
  const handleRegisterModalShow = () => {
    setShowRegisterModal(true)
    handleClose()
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const result = await login({ email, password })
      if (result) {
        setError("")
        setEmail("")
        setPassword("")
        handleClose()
        window.location.reload()
        console.log("Login effettuato con successo!")
      }
    } catch (error) {
      setError("Login fallito!")
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Modal open={show} onClose={handleClose}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid item xs={false} sm={4} md={7} />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
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
                Login
              </Typography>
              {error && (
                <Alert severity="error" sx={{ width: "100%", mt: 2 }}>
                  {error}
                </Alert>
              )}
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Indirizzo Email"
                  name="email"
                  autoComplete="email"
                  autoFocus
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
                <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                  Login
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Hai dimenticato la password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#registrati" variant="body2" onClick={handleRegisterModalShow}>
                      {"Non hai un account? Registrati"}
                    </Link>
                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Modal>
      <RegisterModal
        show={showRegisterModal}
        handleClose={handleLoginModalClose}
        handleOpenLogin={handleLoginModalShow} // Aggiungi questa prop
      />
    </ThemeProvider>
  )
}

export default LoginModal
