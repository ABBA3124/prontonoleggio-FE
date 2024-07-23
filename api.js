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
