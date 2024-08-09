import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./App.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "@fortawesome/fontawesome-free/css/all.min.css"

import Navbar from "./components/TutteLePagine/NavBar/Navbar"
import NotFoundPage from "./components/NotFoundPage/NotFoundPage"
import HomePage from "./components/TutteLePagine/TuttaLaHomePage/HomePage/HomePage"
import Footer from "./components/TutteLePagine/Footer/Footer"
import ProfilePage from "./components/TutteLePagine/Profilo/ProfilePage"
import Veicoli from "./components/TutteLePagine/INostriVeicoli/INostriVeicoli"
import GetAllUtenti from "./components/ROLE/SuperAdmin/GestioneUtenti/AllUtenti/GetAllUtenti"
import CercaUtente from "./components/ROLE/SuperAdmin/GestioneUtenti/CercaUtente/CercaUtente"
import EliminaUtente from "./components/ROLE/SuperAdmin/GestioneUtenti/EliminaUtente/EliminaUtente"
import AllVeicoli from "./components/ROLE/SuperAdmin/GestioneVeicoli/AllVeicoli/AllVeicoli"
import AggiungiAuto from "./components/ROLE/SuperAdmin/GestioneVeicoli/Auto/AggiungiAuto/AggiungiAuto"
import ModificaAuto from "./components/ROLE/SuperAdmin/GestioneVeicoli/Auto/ModificaAuto/ModificaAuto"
import AggiungiMoto from "./components/ROLE/SuperAdmin/GestioneVeicoli/Moto/AggiungiMoto/AggiungiMoto"
import ModificaMoto from "./components/ROLE/SuperAdmin/GestioneVeicoli/Moto/ModificaMoto/ModificaMoto"
import EliminaVeicolo from "./components/ROLE/SuperAdmin/GestioneVeicoli/EliminaVeicolo/EliminaVeicolo"
import ModificaPrenotazione from "./components/ROLE/SuperAdmin/GestionePrenotazioni/ModificaPrenotazione/ModificaPrenotazione"
import EliminaPrenotazione from "./components/ROLE/SuperAdmin/GestionePrenotazioni/EliminaPrenotazione/EliminaPrenotazione"
import CronologiaPrenotazioni from "./components/TutteLePagine/CronologiaPrenotazioni/CronologiaPrenotazioni"
import TutteLePrenotazioni from "./components/ROLE/SuperAdmin/GestionePrenotazioni/TutteLePrenotazioni/TutteLePrenotazioni"
import LeMieRecensioni from "./components/TutteLePagine/Recensioni/LeMieRecensioni"
import Contatti from "./components/TutteLePagine/Contatti/Contatti"
import { AuthProvider } from "./components/Auth/AuthContext/AuthContext"
import RoleBasedRoute from "./components/Auth/RoleBasedRoute/RoleBasedRoute"
const Role1 = import.meta.env.VITE_ROLE_VERIFICA1
const Role2 = import.meta.env.VITE_ROLE_VERIFICA2
const Role3 = import.meta.env.VITE_ROLE_VERIFICA3

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/veicoli" element={<Veicoli />} />
          <Route path="/contattaci" element={<Contatti />} />
          <Route
            path="/profilo/me"
            element={
              <RoleBasedRoute allowedRoles={[Role3, Role2, Role1]}>
                <ProfilePage />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/recensioni/me"
            element={
              <RoleBasedRoute allowedRoles={[Role3, Role2, Role1]}>
                <LeMieRecensioni />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/me/prenotazioni"
            element={
              <RoleBasedRoute allowedRoles={[Role3, Role2, Role1]}>
                <CronologiaPrenotazioni />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/superadmin/utenti/all"
            element={
              <RoleBasedRoute allowedRoles={Role1}>
                <GetAllUtenti />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/cerca/utente/id="
            element={
              <RoleBasedRoute allowedRoles={Role1}>
                <CercaUtente />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/elimina/utente/:uId"
            element={
              <RoleBasedRoute allowedRoles={Role1}>
                <EliminaUtente />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/veicoli/all"
            element={
              <RoleBasedRoute allowedRoles={Role1}>
                <AllVeicoli />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/crea/auto"
            element={
              <RoleBasedRoute allowedRoles={Role1}>
                <AggiungiAuto />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/modifica/auto/:id"
            element={
              <RoleBasedRoute allowedRoles={Role1}>
                <ModificaAuto />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/crea/moto"
            element={
              <RoleBasedRoute allowedRoles={Role1}>
                <AggiungiMoto />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/modifica/moto/:id"
            element={
              <RoleBasedRoute allowedRoles={Role1}>
                <ModificaMoto />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/elimina/veicolo/:vId"
            element={
              <RoleBasedRoute allowedRoles={Role1}>
                <EliminaVeicolo />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/superadmin/prenotazioni"
            element={
              <RoleBasedRoute allowedRoles={Role1}>
                <TutteLePrenotazioni />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/modifica/prenotazione"
            element={
              <RoleBasedRoute allowedRoles={Role1}>
                <ModificaPrenotazione />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/elimina/prenotazione"
            element={
              <RoleBasedRoute allowedRoles={Role1}>
                <EliminaPrenotazione />
              </RoleBasedRoute>
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
