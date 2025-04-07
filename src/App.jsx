import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [politicians, setPoliticians] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios
      .get("https://boolean-spec-frontend.vercel.app/freetestapi/politicians")
      .then((response) => {
        setPoliticians(response.data);
      })
      .catch((error) => {
        console.error("Richiesta dati fallita", error);
      });
  }, []);

  // Funzione per filtrare i politici in base al termine di ricerca
  const filteredPoliticians = politicians.filter((p) =>
    p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.biography?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Politici</h1>

      {/* Campo di ricerca */}
      <div className="d-flex justify-content-center mb-4">
        <input
          type="text"
          placeholder="Cerca per nome o biografia"
          style={{ width: '300px' }}
          className="form-control"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Lista dei politici */}
      <div className="row gy-4">
        {filteredPoliticians.length > 0 ? (
          filteredPoliticians.map((p) => (
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
          ))
        ) : (
          <p className="text-center">Nessun politico trovato.</p>
        )}
      </div>
    </div>
  );
}

export default App;
