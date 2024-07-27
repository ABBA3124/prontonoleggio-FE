import React, { useState, useEffect } from "react"
import { Button, Container, Nav, Navbar, NavDropdown, Offcanvas, Image } from "react-bootstrap"
import { fetchWithToken } from "../../../api"
import RegisterModal from "../Auth/RegisterModal"
import LoginModal from "../Auth/LoginModal"
import LogoProntoNoleggio from "./img/ProntoNoleggioWhite.svg"

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
  const expand = "md"
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const [userData, setUserData] = useState(null)
  const [error, setError] = useState("")

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

  const ROLE1 = import.meta.env.VITE_ROLE_VERIFICA1
  const ROLE2 = import.meta.env.VITE_ROLE_VERIFICA2
  const verificaRuolo1 = userData?.role === ROLE1
  const verificaRuolo2 = userData?.role === ROLE2
  const verificaRuolo12 = userData?.role === ROLE2 || userData?.role === ROLE1

  return (
    <>
      <Navbar expand={expand} className="bg-dark">
        <Container fluid>
          <Navbar.Brand href="/" className="text-white">
            <div className="d-flex align-items-center">
              <img src={LogoProntoNoleggio} alt="Logo Pronto Noleggio" />
              <span className="fw-bold"></span>
            </div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>Menu</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="d-flex ">
              <Nav className="justify-content-end flex-grow-1 pe-3 d-flex align-items-center">
                <Nav.Link href="/" className="text-white">
                  Home
                </Nav.Link>
                <Nav.Link href="/veicoli" className="text-white">
                  I Nostri Veicoli
                </Nav.Link>
                {/* {verificaRuolo2 && (
                  <NavDropdown
                    title={<span className="text-white">Admin Menù</span>}
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                    className="custom-nav-dropdown"
                    align="end"
                  >
                    <NavDropdown.Header>Gestione Utenti</NavDropdown.Header>
                    <NavDropdown.Item href="/" onClick={handleProtectedLinkClick}>
                      Cerca Utente per ID
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Header>Gestione Veicoli</NavDropdown.Header>
                    <NavDropdown.Item href="/" onClick={handleProtectedLinkClick}>
                      Tutti i Veicoli
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Header>Gestione Prenotazioni</NavDropdown.Header>
                    <NavDropdown.Item href="/" onClick={handleProtectedLinkClick}>
                      Modifica Prenotazione
                    </NavDropdown.Item>
                  </NavDropdown>
                )} */}
                {verificaRuolo1 && (
                  <NavDropdown
                    title={<span className="text-white">Super Admin Menù</span>}
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                    className="custom-nav-dropdown"
                    align="end"
                  >
                    <NavDropdown.Header>Gestione Utenti</NavDropdown.Header>
                    <NavDropdown.Item href="/superadmin/utenti/all" onClick={handleProtectedLinkClick}>
                      Tutti gli Utenti
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/cerca/utente/id=" onClick={handleProtectedLinkClick}>
                      Cerca Utente per ID
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/elimina/utente/id=" onClick={handleProtectedLinkClick}>
                      Elimina Utente per ID
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Header>Gestione Veicoli</NavDropdown.Header>
                    <NavDropdown.Item href="/veicoli/all" onClick={handleProtectedLinkClick}>
                      Tutti i Veicoli
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/modifica/auto/id=" onClick={handleProtectedLinkClick}>
                      Modifica Auto per ID
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/modifica/moto/id=" onClick={handleProtectedLinkClick}>
                      Modifica Moto per ID
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/crea/auto" onClick={handleProtectedLinkClick}>
                      Aggiungi Auto
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/crea/moto" onClick={handleProtectedLinkClick}>
                      Aggiungi Moto
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/elimina/veicolo/id=" onClick={handleProtectedLinkClick}>
                      Elimina Veicolo per ID
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Header>Gestione Prenotazioni</NavDropdown.Header>
                    <NavDropdown.Item href="/superadmin/prenotazioni" onClick={handleProtectedLinkClick}>
                      Tutte le Prenotazioni
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/modifica/prenotazione" onClick={handleProtectedLinkClick}>
                      Modifica Prenotazione
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/elimina/prenotazione" onClick={handleProtectedLinkClick}>
                      Elimina Prenotazione
                    </NavDropdown.Item>
                  </NavDropdown>
                )}
                {userData && (
                  <NavDropdown
                    title={
                      <span className="text-white">
                        <Image src={userData.avatar} height={30} width={30} className="rounded" />
                      </span>
                    }
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                    className="custom-nav-dropdown"
                    align="end"
                  >
                    <NavDropdown.Item href="/profilo/me" onClick={handleProtectedLinkClick}>
                      Profilo
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/me/prenotazioni" onClick={handleProtectedLinkClick}>
                      Cronologia Prenotazioni
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/" onClick={handleLogout}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                )}
              </Nav>
              <div className="d-flex align-items-center justify-content-end ">
                {!userData ? (
                  <>
                    <Button variant="primary" onClick={handleLoginModalShow}>
                      Login
                    </Button>
                    <Button variant="secondary" onClick={handleRegisterModalShow} className="ms-2">
                      Registrati
                    </Button>
                  </>
                ) : (
                  <div></div>
                )}
              </div>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      <LoginModal show={showLoginModal} handleClose={handleLoginModalClose} />
      <RegisterModal show={showRegisterModal} handleClose={handleRegisterModalClose} />
    </>
  )
}

export default NavBar
