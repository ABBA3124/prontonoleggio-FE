import React from "react"
import Carousel from "react-material-ui-carousel"
import { Paper, Typography, Box } from "@mui/material"
import Hero1 from "../../../Immagini/imgHomePageCarousel/hero-1.jpg"
import Hero2 from "../../../Immagini/imgHomePageCarousel/hero-2.jpg"
import Hero4 from "../../../Immagini/imgHomePageCarousel/hero-4.jpg"
import "./HeroHomePage.css"
import { createTheme, ThemeProvider } from "@mui/material/styles"

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, Arial",
    h1: {
      fontFamily: "Roboto, Arial",
      fontWeight: "bold",
    },
    h6: {
      fontFamily: "Roboto, Arial",
      fontWeight: "normal",
    },
  },
})

const items = [
  {
    image: Hero1,
    caption: "Qualsiasi auto di lusso a basso prezzo",
    title: "PRONTO NOLEGGIO",
  },
  {
    image: Hero2,
    caption: "Noleggio facile e veloce",
    title: "GUIDA IL MEGLIO",
  },
  {
    image: Hero4,
    caption: "Prenotazioni online sicure",
    title: "VIAGGIA CON STILE",
  },
]

const HeroHomePage = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="hero-image">
        <Carousel
          indicators={false}
          navButtonsAlwaysVisible
          autoPlay
          animation="fade"
          duration={700}
          cycleNavigation
          sx={{ height: "100%" }}
        >
          {items.map((item, index) => (
            <Paper key={index} sx={{ position: "relative" }}>
              <img className="d-block w-100" src={item.image} alt={`Slide ${index + 1}`} />
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  textAlign: "center",
                }}
              >
                <Typography variant="h6">{item.caption}</Typography>
                <Typography variant="h1" sx={{ fontSize: { xs: "2rem", sm: "3rem", md: "4rem", lg: "5rem" } }}>
                  {item.title}
                </Typography>
              </Box>
            </Paper>
          ))}
        </Carousel>
      </div>
    </ThemeProvider>
  )
}

export default HeroHomePage
