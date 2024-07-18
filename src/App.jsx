import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./App.css"

import Navbar from "./components/NavBar/Navbar"
import NotFoundPage from "./components/NotFoundPage/NotFoundPage"
import HomePage from "./components/HomePage/HomePage"
import Footer from "./components/Footer/Footer"

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
