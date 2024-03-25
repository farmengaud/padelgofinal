// consultation des tournois 
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Style/Tournoi.css';
import Tapbar from './Tapbar';
import Navbar from './Navbar';

function Tournoi() {
    const [tournois, setTournois] = useState([]);

    useEffect(() => {
        const fetchTournois = async () => {
            try {
                const result = await axios.get('http://localhost:5002/api/tournoi');
                const tournoisData = result.data;

                const tournoisWithEquipes = await Promise.all(tournoisData.map(async (tournoi) => {
                    const response = await axios.get(`http://localhost:5002/api/tournoi/${tournoi.tournoiId}/equipes`);
                    return { ...tournoi, nombreEquipesInscrites: response.data.length };
                }));

                // Filtre uniquement les tournois de niveaux spécifiques en fonction du nombre d'équipes inscrites
                const tournoisAFiltrer = tournoisWithEquipes.filter(tournoi => {
                    return ['P25', 'P100', 'P250'].includes(tournoi.niveau) ? 
                        tournoi.nombreEquipesInscrites < tournoi.nombreEquipe : true;
                });

                setTournois(tournoisAFiltrer);
            } catch (error) {
                console.error('Erreur lors de la récupération des tournois:', error);
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
                        <h2>Id tournoi: {tournoi.tournoiId}</h2>
                        <p>{new Date(tournoi.date).toLocaleDateString()}</p>
                    </div>
                </div>
            ))}
            <Navbar />
            <Tapbar />
        </div>
    );
}

export default Tournoi;
