// Tournoi.js
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Assurez-vous que axios est installé
import '../Style/Tournoi.css';
import Tapbar from './Tapbar';
import Navbar from './Navbar';

function Tournoi() {
    const [tournois, setTournois] = useState([]);

    useEffect(() => {
        // Fonction pour récupérer les tournois depuis l'API
        const fetchTournois = async () => {
            try {
                // Remplacez 'votre_api_url' par l'URL de votre API
                const result = await axios.get('http://localhost:5002/api/tournoi');
                setTournois(result.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des tournois:', error);
                // Gérer l'erreur comme vous le souhaitez
            }
        };

        fetchTournois();
    }, []);

    return (
        <div className="tournois-container">
            {tournois.map(tournoi => (
                <div key={tournoi.tournoiId} className="tournoi-card">
                    <div className="tournoi-info">
                        <h3>{tournoi.categorie}</h3>
                        <h2>{tournoi.niveau}</h2>
                        <h2>{tournoi.nombreEquipe} équipe{tournoi.nombreEquipe > 1 ? 's' : ''}</h2>
                        <h2> id tournoi: {tournoi.tournoiId}</h2>

                        <p>{new Date(tournoi.date).toLocaleDateString()}</p>
                        {/* Ajoutez plus d'informations si nécessaire */}
                    </div>
                </div>
            ))}
            <Navbar/>
            <Tapbar/>
        </div>
    );
}

export default Tournoi;
