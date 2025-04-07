import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [politicians, setPoliticians] = useState([])

  useEffect(() => {
    axios
      .get("https://boolean-spec-frontend.vercel.app/freetestapi/politicians")
      .then((response) => {
        setPoliticians(response.data)
        console.log(response.data)
      })
      .catch((error) => {
        console.error("Richiesta dati fallita", error)
      })
  }, [])

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Politici</h1>
      <div className="row gy-4">
        {politicians.map((p) => (
          <div className="col-sm-6 col-md-4 col-lg-3" key={p.id}>
            <div className="card h-100 shadow-sm">
              <img src={p.image} className="card-img-top" alt={p.name} />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{p.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{p.position}</h6>
                <p className="card-text mt-2">{p.biography}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App