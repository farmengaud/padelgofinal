import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './NavbarAdmin';

import '../Style/AccueilAdmin.css'; // Assurez-vous que le fichier CSS existe et contient le style pour le bouton

function AccueilAdmin() {
    const navigate = useNavigate();

    const handleNavigateToCreationTournoi = () => {
        navigate('/creationtournoi'); // Mettez ici le chemin correct vers votre page de création de tournoi
    };

    const handleNavigateToAfficherEquipesTournoi = () => {
        navigate('/afficherequipestournoi'); // Mettez ici le chemin correct vers votre page AfficherEquipesTournoi
    };

    const handleNavigateToUpdateClassement = () => {
        navigate('/updateclassement'); // Mettez ici le chemin correct vers votre page de mise à jour de classement
    };

    const handleNavigateToSuppressionTournoi = () => {
        navigate('/suppressiontournoi'); // Mettez ici le chemin correct vers votre page de suppression de tournoi
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
