import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Tapbar from './Tapbar';
import '../Style/InscriptionTournoi.css';

function HomePage() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="page-container">
        <div className="form-container">
          <button className="button" onClick={() => navigate('/ajoutequipe')}>
            Ajouter mon équipe
          </button>
          <button className="button" onClick={() => navigate('/inscriptionfinale')}>
            S'inscrire à un tournoi
          </button>
        </div>
      </div>
      <Tapbar />
    </>
  );
}

export default HomePage;
