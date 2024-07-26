import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./App.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import "bootstrap/dist/css/bootstrap.min.css"

import Navbar from "./components/NavBar/Navbar"
import NotFoundPage from "./components/NotFoundPage/NotFoundPage"
import HomePage from "./components/HomePage/HomePage/HomePage"
import Footer from "./components/Footer/Footer"
import ProfilePage from "./components/Page/Profilo/ProfilePage"
import Veicoli from "./components/Page/INostriVeicoli/INostriVeicoli"
import GetAllUtenti from "./components/ROLE/SuperAdmin/GestioneUtenti/AllUtenti/GetAllUtenti"
import CercaUtente from "./components/ROLE/SuperAdmin/GestioneUtenti/CercaUtente/CercaUtente"
import EliminaUtente from "./components/ROLE/SuperAdmin/GestioneUtenti/EliminaUtente/EliminaUtente"
import AllVeicoli from "./components/ROLE/SuperAdmin/GestioneVeicoli/AllVeicoli/AllVeicoli"
import ModificaAuto from "./components/ROLE/SuperAdmin/GestioneVeicoli/ModificaAuto/ModificaAuto"
import ModificaMoto from "./components/ROLE/SuperAdmin/GestioneVeicoli/ModificaMoto/ModificaMoto"
import AggiungiAuto from "./components/ROLE/SuperAdmin/GestioneVeicoli/AggiungiAuto/AggiungiAuto"
import AggiungiMoto from "./components/ROLE/SuperAdmin/GestioneVeicoli/AggiungiMoto/AggiungiMoto"
import EliminaVeicolo from "./components/ROLE/SuperAdmin/GestioneVeicoli/EliminaVeicolo/EliminaVeicolo"
import ModificaPrenotazione from "./components/ROLE/SuperAdmin/GestionePrenotazioni/ModificaPrenotazione/ModificaPrenotazione"
import EliminaPrenotazione from "./components/ROLE/SuperAdmin/GestionePrenotazioni/EliminaPrenotazione/EliminaPrenotazione"
import CronologiaPrenotazioni from "./components/Page/CronologiaPrenotazioni/CronologiaPrenotazioni"

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/profilo/me" element={<ProfilePage />} />
        <Route path="/veicoli" element={<Veicoli />} />
        <Route path="/superadmin/utenti/all" element={<GetAllUtenti />} />
        <Route path="/cerca/utente/id=" element={<CercaUtente />} />
        <Route path="/elimina/utente/:uId" element={<EliminaUtente />} />
        <Route path="/veicoli/all" element={<AllVeicoli />} />
        <Route path="/modifica/auto/:id" element={<ModificaAuto />} />
        <Route path="/modifica/moto/:id" element={<ModificaMoto />} />
        <Route path="/crea/auto" element={<AggiungiAuto />} />
        <Route path="/crea/moto" element={<AggiungiMoto />} />
        <Route path="/elimina/veicolo/:vId" element={<EliminaVeicolo />} />
        <Route path="/modifica/prenotazione" element={<ModificaPrenotazione />} />
        <Route path="/elimina/prenotazione" element={<EliminaPrenotazione />} />
        <Route path="/me/prenotazioni" element={<CronologiaPrenotazioni />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
