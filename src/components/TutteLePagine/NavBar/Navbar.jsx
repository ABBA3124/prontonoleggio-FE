import LogoProntoNoleggio from "../../Immagini/imgLogoPN/ProntoNoleggioWhite.svg"
import { fetchWithToken } from "../../../../api"
import LoginModal from "../../Auth/LoginModal"
import RegisterModal from "../../Auth//RegisterModal"

import React, { useState, useEffect } from "react"
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"

const fetchUserData = async () => {
  try {
    const data = await fetchWithToken("/utente/me")
    if (data) {
    }
    return data
  } catch (error) {
    throw new Error("Effettua il login")
  }
}

const NavBar = () => {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const [userData, setUserData] = useState(null)
  const [error, setError] = useState("")
  const [anchorEl, setAnchorEl] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [adminAnchorEl, setAdminAnchorEl] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUserData()
        setUserData(data)
      } catch (error) {
        setError(error.message)
      }
    }

    fetchData()
  }, [])

  const handleLoginModalClose = () => setShowLoginModal(false)
  const handleLoginModalShow = () => setShowLoginModal(true)
  const handleRegisterModalClose = () => setShowRegisterModal(false)
  const handleRegisterModalShow = () => setShowRegisterModal(true)

  const handleLogout = () => {
    localStorage.removeItem("token")
    setUserData(null)
    setError("")
    window.location.reload()
    window.location.href = "/"
  }

  const handleProtectedLinkClick = (e) => {
    if (!userData) {
      e.preventDefault()
      setShowLoginModal(true)
    }
  }

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
    setAdminAnchorEl(null)
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleAdminMenu = (event) => {
    setAdminAnchorEl(event.currentTarget)
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Menu
      </Typography>
      <Divider />
      <List>
        <ListItem button component="a" href="/">
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component="a" href="/veicoli">
          <ListItemText primary="I Nostri Veicoli" />
        </ListItem>
        {userData?.role === import.meta.env.VITE_ROLE_VERIFICA1 && (
          <>
            <Divider />
            <ListItem button component="a" href="/superadmin/utenti/all" onClick={handleProtectedLinkClick}>
              <ListItemText primary="Tutti gli Utenti" />
            </ListItem>
            <ListItem button component="a" href="/cerca/utente/id=" onClick={handleProtectedLinkClick}>
              <ListItemText primary="Cerca Utente per ID" />
            </ListItem>
            <ListItem button component="a" href="/elimina/utente/id=" onClick={handleProtectedLinkClick}>
              <ListItemText primary="Elimina Utente per ID" />
            </ListItem>
            <Divider />
            <ListItem button component="a" href="/veicoli/all" onClick={handleProtectedLinkClick}>
              <ListItemText primary="Tutti i Veicoli" />
            </ListItem>
            <ListItem button component="a" href="/modifica/auto/id=" onClick={handleProtectedLinkClick}>
              <ListItemText primary="Modifica Auto per ID" />
            </ListItem>
            <ListItem button component="a" href="/crea/auto" onClick={handleProtectedLinkClick}>
              <ListItemText primary="Aggiungi Auto" />
            </ListItem>
            <ListItem button component="a" href="/modifica/moto/id=" onClick={handleProtectedLinkClick}>
              <ListItemText primary="Modifica Moto per ID" />
            </ListItem>
            <ListItem button component="a" href="/crea/moto" onClick={handleProtectedLinkClick}>
              <ListItemText primary="Aggiungi Moto" />
            </ListItem>
            <ListItem button component="a" href="/elimina/veicolo/id=" onClick={handleProtectedLinkClick}>
              <ListItemText primary="Elimina Veicolo per ID" />
            </ListItem>
            <Divider />
            <ListItem button component="a" href="/superadmin/prenotazioni" onClick={handleProtectedLinkClick}>
              <ListItemText primary="Tutte le Prenotazioni" />
            </ListItem>
            <ListItem button component="a" href="/modifica/prenotazione" onClick={handleProtectedLinkClick}>
              <ListItemText primary="Modifica Prenotazione" />
            </ListItem>
            <ListItem button component="a" href="/elimina/prenotazione" onClick={handleProtectedLinkClick}>
              <ListItemText primary="Elimina Prenotazione" />
            </ListItem>
          </>
        )}
        {userData && (
          <>
            <Divider />
            <ListItem button component="a" href="/profilo/me" onClick={handleProtectedLinkClick}>
              <ListItemText primary="Profilo" />
            </ListItem>
            <ListItem button component="a" href="/me/prenotazioni" onClick={handleProtectedLinkClick}>
              <ListItemText primary="Cronologia Prenotazioni" />
            </ListItem>
            <Divider />
            <ListItem button onClick={handleLogout}>
              <ListItemText primary="Logout" />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  )

  const container = window !== undefined ? () => window.document.body : undefined

  return (
    <>
      <AppBar position="static" style={{ backgroundColor: "rgba(33, 37, 41, 1)" }}>
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            color="primary"
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <img src={LogoProntoNoleggio} alt="Logo Pronto Noleggio" style={{ height: "40px", marginRight: "10px" }} />
          <Typography variant="h6" sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}>
            <Button
              color="inherit"
              href="/"
              sx={{
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              Home
            </Button>
            <Button
              color="inherit"
              href="/veicoli"
              sx={{
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              I Nostri Veicoli
            </Button>
            <Button
              color="inherit"
              href="/contattaci"
              sx={{
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              Contattaci
            </Button>
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {userData?.role === import.meta.env.VITE_ROLE_VERIFICA1 && (
              <>
                <Button
                  color="inherit"
                  aria-controls="admin-menu"
                  aria-haspopup="true"
                  onClick={handleAdminMenu}
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    },
                  }}
                >
                  Super Admin Menù
                </Button>
                <Menu
                  id="admin-menu"
                  anchorEl={adminAnchorEl}
                  keepMounted
                  open={Boolean(adminAnchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem disabled>Gestione Utenti</MenuItem>
                  <MenuItem onClick={handleClose} component="a" href="/superadmin/utenti/all">
                    Tutti gli Utenti
                  </MenuItem>
                  <MenuItem onClick={handleClose} component="a" href="/cerca/utente/id=">
                    Cerca Utente per ID
                  </MenuItem>
                  <MenuItem onClick={handleClose} component="a" href="/elimina/utente/id=">
                    Elimina Utente per ID
                  </MenuItem>
                  <Divider />
                  <MenuItem disabled>Gestione Veicoli</MenuItem>
                  <MenuItem onClick={handleClose} component="a" href="/veicoli/all">
                    Tutti i Veicoli
                  </MenuItem>
                  <MenuItem onClick={handleClose} component="a" href="/crea/auto">
                    Aggiungi Auto
                  </MenuItem>
                  <MenuItem onClick={handleClose} component="a" href="/modifica/auto/id=">
                    Modifica Auto per ID
                  </MenuItem>
                  <MenuItem onClick={handleClose} component="a" href="/crea/moto">
                    Aggiungi Moto
                  </MenuItem>
                  <MenuItem onClick={handleClose} component="a" href="/modifica/moto/id=">
                    Modifica Moto per ID
                  </MenuItem>
                  <MenuItem onClick={handleClose} component="a" href="/elimina/veicolo/id=">
                    Elimina Veicolo per ID
                  </MenuItem>
                  <Divider />
                  <MenuItem disabled>Gestione Prenotazioni</MenuItem>
                  <MenuItem onClick={handleClose} component="a" href="/superadmin/prenotazioni">
                    Tutte le Prenotazioni
                  </MenuItem>
                  <MenuItem onClick={handleClose} component="a" href="/modifica/prenotazione">
                    Modifica Prenotazione
                  </MenuItem>
                  <MenuItem onClick={handleClose} component="a" href="/elimina/prenotazione">
                    Elimina Prenotazione
                  </MenuItem>
                </Menu>
              </>
            )}
            {userData && (
              <>
                <IconButton
                  color="inherit"
                  onClick={handleMenu}
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    },
                  }}
                >
                  <Avatar src={userData.avatar} />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose} component="a" href="/profilo/me">
                    Profilo
                  </MenuItem>
                  <MenuItem onClick={handleClose} component="a" href="/me/prenotazioni">
                    Cronologia Prenotazioni
                  </MenuItem>
                  <MenuItem onClick={handleClose} component="a" href="/recensioni/me">
                    Le mie recensioni
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            )}
            {!userData && (
              <>
                <Button
                  color="inherit"
                  onClick={handleLoginModalShow}
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    },
                  }}
                >
                  Login
                </Button>
                <Button
                  color="inherit"
                  onClick={handleRegisterModalShow}
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    },
                  }}
                >
                  Registrati
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 240,
          },
        }}
      >
        {drawer}
      </Drawer>
      <LoginModal show={showLoginModal} handleClose={handleLoginModalClose} />
      <RegisterModal show={showRegisterModal} handleClose={handleRegisterModalClose} />
    </>
  )
}

export default NavBar
