import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './NavbarAdmin';
import '../Style/AfficherEquipes.css'; 

function AfficherEquipesTournoi() {
    const [tournoiId, setTournoiId] = useState('');
    const [equipes, setEquipes] = useState([]);
    const [erreur, setErreur] = useState('');

    const handleRecherche = async (e) => {
        e.preventDefault();
        setErreur('');
        if (!tournoiId) {
            setErreur('Veuillez entrer un ID de tournoi.');
            return;
        }
        try {
            const response = await axios.get(`http://localhost:5002/api/tournoi/${tournoiId}/equipes`);
            // Tri des équipes par poids (somme des classements) avant de les définir dans l'état
            const equipesTrie = response.data.sort((a, b) => (a.classementJoueur1 + a.classementJoueur2) - (b.classementJoueur1 + b.classementJoueur2));
            setEquipes(equipesTrie);
        } catch (error) {
            setErreur('Erreur lors de la récupération des équipes. Assurez-vous que l\'ID du tournoi est correct.');
            console.error(error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="form-container3">
                <h2>Rechercher les Équipes d'un Tournoi</h2>
                {erreur && <p className="error-message3">{erreur}</p>}
                <form onSubmit={handleRecherche}>
                    <input
                        type="number"
                        placeholder="ID du Tournoi"
                        value={tournoiId}
                        onChange={(e) => setTournoiId(e.target.value)}
                    />
                    <button type="submit">Rechercher</button>
                </form>
                {equipes.length > 0 && (
                    <div className="equipes-list">
                        <h3>Équipes du Tournoi:</h3>
                        <ul>
                            {equipes.map(equipe => (
                                <li key={equipe.equipeId}>
                                    <strong>ID de l'équipe:</strong> {equipe.equipeId} <br/>
                                    <strong>Nom Joueur 1:</strong> {equipe.nomJoueur1}, <strong>Classement:</strong> {equipe.classementJoueur1}, <strong>Mail:</strong> {equipe.mailJoueur1}<br/>
                                    <strong>Nom Joueur 2:</strong> {equipe.nomJoueur2}, <strong>Classement:</strong> {equipe.classementJoueur2}, <strong>Mail:</strong> {equipe.mailJoueur2}<br/>
                                    <strong>Poids de l'équipe:</strong> {equipe.classementJoueur1 + equipe.classementJoueur2}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </>
    );
}

export default AfficherEquipesTournoi;
