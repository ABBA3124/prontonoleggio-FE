import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./App.css"

import Navbar from "./components/NavBar/Navbar"
import NotFoundPage from "./components/NotFoundPage/NotFoundPage"
import HomePage from "./components/HomePage/HomePage/HomePage"
import Footer from "./components/Footer/Footer"
import ProfilePage from "./components/Page/Profilo/ProfilePage"
import Veicoli from "./components/Veicoli/Veicoli"

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/profilo/me" element={<ProfilePage />} />
        <Route path="/veicoli" element={<Veicoli />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
