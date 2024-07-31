const BASE_URL = import.meta.env.VITE_API_URL

// Funzione per effettuare una richiesta GET
export const fetchGet = async (endpoint) => {
  const token = localStorage.getItem("token")
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
  if (!response.ok) {
    throw new Error("Network response was not ok")
  }
  return response.json()
}

// Funzione per effettuare una richiesta POST
export const fetchPost = async (endpoint, data) => {
  const token = localStorage.getItem("token")
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error("Network response was not ok")
  }
  return response.json()
}

// Funzione per effettuare una richiesta PUT
export const fetchPut = async (endpoint, data) => {
  const token = localStorage.getItem("token")
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error("Network response was not ok")
  }
  return response.json()
}

// Funzione per effettuare una richiesta DELETE
export const fetchDelete = async (endpoint) => {
  const token = localStorage.getItem("token")
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
  if (!response.ok) {
    throw new Error("Network response was not ok")
  }
  return response.json()
}

//<|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||>

/* 
Funzione per effettuare una richiesta POST per la registrazione 
utilizzando l'endpoint /auth/registrati e la funzione fetchPost
*/
export const register = async (data) => {
  return fetchPost("/auth/registrati", data)
}

// Funzione per effettuare una richiesta con token di autenticazione
export const fetchWithToken = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token")
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    ...options.headers,
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    throw new Error("Network response was not ok")
  }
  return response.json()
}

// Funzione per effettuare una richiesta con token di autenticazione e gestire risposte di testo
export const fetchWithTokenAndTextResponse = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token")
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    ...options.headers,
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  })

  const responseText = await response.text()
  if (!response.ok) {
    throw new Error(responseText)
  }
  return responseText
}

// Funzione per il login con email e password e salvataggio del token in localStorage
export const login = async (data) => {
  const response = await fetchPost("/auth/login", data)
  localStorage.setItem("token", response.accessToken)
  return response
}

// Funzione per aggiornare il profilo utente
export const updateProfile = async (data) => {
  return fetchPut("/utente/me", data)
}

// Funzione per cercare veicolo per id
export const fetchVehicleDetails = async (vehicleId) => {
  return fetchWithToken(`/vehicles/${vehicleId}`)
}

// Funzione per effettuare una richiesta PUT per aggiornare una prenotazione
export const updatePrenotazione = async (prenotazioneId, data) => {
  return fetchPut(`/prenotazioni/modifica/${prenotazioneId}`, data)
}

// Funzione per effettuare una richiesta DELETE per cancellare una prenotazione
export const deletePrenotazione = async (endpoint) => {
  const token = localStorage.getItem("token")
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(errorText || "Network response was not ok")
  }
  return response.text()
}

// Funzione per effettuare una richiesta DELETE per cancellare le prenotazioni
export const deletePrenotazionii = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token")
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    ...options.headers,
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  })

  const responseText = await response.text()
  if (!response.ok) {
    throw new Error(responseText || "Network response was not ok")
  }
  return responseText
}

//-------------------------------------------------------
// Funzione per ottenere tutte le prenotazioni con paginazione
export const fetchAllPrenotazioni = async (page = 0, size = 20) => {
  const response = await fetchWithToken(`/prenotazioni/tuttelaprenotazioni?page=${page}&size=${size}`)
  return response
}

// Funzione per ottenere tutte le prenotazioni con paginazione
export const fetchMePrenotazioni = async (page = 0, size = 12) => {
  const response = await fetchWithToken(`/prenotazioni/storico?page=${page}&size=${size}`)
  return response
}
