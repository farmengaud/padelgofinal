import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Tapbar from './Tapbar';
import '../Style/InscriptionFinale.css';

function InscriptionTournoi() {
  const [tournoiId, setTournoiId] = useState('');
  const [equipeId, setEquipeId] = useState('');
  const [message, setMessage] = useState('');

  const handleInscription = async (e) => {
    e.preventDefault();
    try {
      // Assurez-vous que le format de la requête correspond à ce que le backend attend
      const response = await axios.post(`http://localhost:5002/api/tournoi/${tournoiId}/addEquipe`, equipeId, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        setMessage('Équipe ajoutée au tournoi avec succès.');
      } else {
        setMessage('Erreur lors de l\'ajout de l\'équipe au tournoi.');
      }
    } catch (error) {
      setMessage('Erreur lors de l\'inscription: ' + (error.response?.data || error.message));
    }
  };

  return (
    <>
      <Navbar />
      <div className="page-container">
        <div className="form-container">
          <h2>Inscription à un Tournoi</h2>
          <form onSubmit={handleInscription}>
            <div className="input-group">
              <input
                className="input-field"
                type="number"
                placeholder="ID du Tournoi"
                value={tournoiId}
                onChange={(e) => setTournoiId(e.target.value)}
              />
            </div>
            <div className="input-group">
              <input
                className="input-field"
                type="number"
                placeholder="ID de l'Équipe"
                value={equipeId}
                onChange={(e) => setEquipeId(e.target.value)}
              />
            </div>
            <div className="button-group">
              <button className="submit-button" type="submit">Inscrire l'équipe</button>
            </div>
            {message && <p className="valid-message">{message}</p>}
          </form>
        </div>
      </div>
      <Tapbar />
    </>
  );
}

export default InscriptionTournoi;
