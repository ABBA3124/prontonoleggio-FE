import React from "react"
import { Container, Typography, Box, Button } from "@mui/material"
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline"
import { createTheme, ThemeProvider } from "@mui/material/styles"

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, Arial",
  },
})

const NotFoundPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="80vh"
          textAlign="center"
          sx={{
            p: 4,
          }}
        >
          <Typography variant="h1" component="h1" sx={{ fontWeight: "bold", mb: 2 }}>
            404 Not Found
            <ErrorOutlineIcon sx={{ fontSize: 80, color: "error.main", mb: 3, ms: 3 }} />
          </Typography>
          <Typography variant="body1" component="p" sx={{ mb: 3, color: "text.secondary" }} className="fs-5">
            La pagina che stai cercando non esiste. Potrebbe essere stata rimossa, rinominata o potrebbe non essere
            temporaneamente disponibile.
          </Typography>
          <Typography variant="body2" component="p" sx={{ mb: 3, color: "text.secondary" }} className="fs-6">
            Verifica di aver digitato correttamente l'indirizzo, oppure torna alla homepage.
          </Typography>
          <Button variant="contained" color="primary" href="/" sx={{ mt: 2 }}>
            Torna alla Homepage
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default NotFoundPage
