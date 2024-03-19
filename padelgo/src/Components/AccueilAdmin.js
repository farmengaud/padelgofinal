import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './NavbarAdmin';

import '../Style/AccueilAdmin.css'; 

function AccueilAdmin() {
    const navigate = useNavigate();

    const handleNavigateToCreationTournoi = () => {
        navigate('/creationtournoi'); 
    };

    const handleNavigateToAfficherEquipesTournoi = () => {
        navigate('/afficherequipestournoi'); 
    };

    const handleNavigateToUpdateClassement = () => {
        navigate('/updateclassement');
    };

    const handleNavigateToSuppressionTournoi = () => {
        navigate('/suppressiontournoi'); 
    };

    return (
        <>
            <Navbar />
            <div className="accueil-admin-container">
                <button className="nouveau-tournoi-btn" onClick={handleNavigateToCreationTournoi}>
                    Nouveau Tournoi
                </button>
                <button className="afficher-equipes-btn" onClick={handleNavigateToAfficherEquipesTournoi}>
                    Afficher les équipes 
                </button>
                <button className="update-classement-btn" onClick={handleNavigateToUpdateClassement}>
                    Modifier un classement 
                </button>
                <button className="supprimer-tournoi-btn" onClick={handleNavigateToSuppressionTournoi}>
                    Supprimer un tournoi
                </button>
            </div>
        </>
    );
}

export default AccueilAdmin;
