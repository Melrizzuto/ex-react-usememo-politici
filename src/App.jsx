import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

// ✅ Componente memoizzato: viene renderizzato solo se le props cambiano
const PoliticianCard = React.memo(({ name, image, position, biography }) => {
  console.log("Card"); // debug: stampa quando il componente viene renderizzato
  return (
    <div className="col-sm-6 col-md-4 col-lg-3">
      <div className="card h-100 shadow-sm">
        <img src={image} className="card-img-top" alt={name} />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{position}</h6>
          <p className="card-text mt-2">{biography}</p>
        </div>
      </div>
    </div>
  );
});

function App() {
  // Stato per i dati dei politici
  const [politicians, setPoliticians] = useState([]);

  // Stato per il campo di ricerca
  const [searchTerm, setSearchTerm] = useState('');

  // ✅ Effetto che recupera i dati solo al primo render
  useEffect(() => {
    axios
      .get("https://boolean-spec-frontend.vercel.app/freetestapi/politicians")
      .then((response) => {
        setPoliticians(response.data); // salva i dati nello stato
      })
      .catch((error) => {
        console.error("Richiesta dati fallita", error); // gestione errori
      });
  }, []);

  // ✅ Memoizzazione della lista filtrata dei politici
  const filteredPoliticians = useMemo(() => {
    return politicians.filter((p) =>
    (p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.biography?.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [politicians, searchTerm]);

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Politici</h1>

      {/* 🔎 Campo di ricerca */}
      <div className="d-flex justify-content-center mb-4">
        <input
          type="text"
          placeholder="Cerca per nome o biografia"
          style={{ width: '300px' }}
          className="form-control"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // aggiorna lo stato
        />
      </div>

      {/* 🧑‍💼 Lista dei politici filtrati */}
      <div className="row gy-4">
        {filteredPoliticians.length > 0 ? (
          filteredPoliticians.map((p) => (
            <PoliticianCard
              key={p.id}
              {...p} // passa tutte le props (name, image, position, biography)
            />
          ))
        ) : (
          <p className="text-center">Nessun politico trovato.</p> // messaggio se la lista è vuota
        )}
      </div>
    </div>
  );
}

export default App;
