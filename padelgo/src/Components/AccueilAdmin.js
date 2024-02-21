import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

import '../Style/AccueilAdmin.css'; // Assurez-vous que le fichier CSS existe et contient le style pour le bouton

function AccueilAdmin() {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/creationtournoi'); // Mettez ici le chemin correct vers votre page de création de tournoi
    };

    return (
        <>
            <Navbar />
            <div className="accueil-admin-container">
                <button className="nouveau-tournoi-btn" onClick={handleNavigate}>
                    Nouveau Tournoi
                </button>
            </div>

        </>
    );
}

export default AccueilAdmin;
