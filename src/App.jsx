import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [politicians, setPoliticians] = useState([])

  useEffect(() => {
    axios
      .get("https://boolean-spec-frontend.vercel.app/freetestapi/politicians")
      .then(response => {
        setPoliticians(response.data)
      })
      .catch(error => {
        console.error("Errore nel recupero dei dati:", error)
      })
  }, [])

  return (
    <div>
      <h1>Politici</h1>
      <div>
        {politicians.map((politician) => (
          <div key={politician.id}>
            <img src={politician.image} alt={politician.name} />
            <h2>{politician.name}</h2>
            <h4>{politician.position}</h4>
            <p>{politician.biography}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
