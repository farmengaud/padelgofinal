import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './NavbarAdmin';
import '../Style/UpdateClassement.css';


function UpdateClassement() {
  const [equipeId, setEquipeId] = useState('');
  const [classementJoueur1, setClassementJoueur1] = useState('');
  const [classementJoueur2, setClassementJoueur2] = useState('');
  const [message, setMessage] = useState('');
  const [erreur, setErreur] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!equipeId || !classementJoueur1 || !classementJoueur2) {
      setErreur('Tous les champs sont obligatoires.');
      return;
    }

    try {
      const response = await axios.put(`http://localhost:5002/api/equipe/${equipeId}/updateClassement`, {
        ClassementJoueur1: parseInt(classementJoueur1),
        ClassementJoueur2: parseInt(classementJoueur2),
      });

      if (response.status === 204) {
        setMessage('Les classements ont été mis à jour avec succès.');
        setErreur('');
      }
    } catch (error) {
      setMessage('');
      setErreur('Une erreur est survenue lors de la mise à jour des classements.');
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="form-container4">
        <h2>Mettre à jour les classements</h2>
        {message && <div className="success-message">{message}</div>}
        {erreur && <div className="error-message">{erreur}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            placeholder="ID de l'équipe"
            value={equipeId}
            onChange={(e) => setEquipeId(e.target.value)}
          />
          <input
            type="number"
            placeholder="Nouveau classement Joueur 1"
            value={classementJoueur1}
            onChange={(e) => setClassementJoueur1(e.target.value)}
          />
          <input
            type="number"
            placeholder="Nouveau classement Joueur 2"
            value={classementJoueur2}
            onChange={(e) => setClassementJoueur2(e.target.value)}
          />
          <button type="submit">Mettre à jour</button>
        </form>
      </div>
    </>
  );
}

export default UpdateClassement;
