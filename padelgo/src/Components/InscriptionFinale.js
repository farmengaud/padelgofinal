import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Tapbar from './Tapbar';
import '../Style/InscriptionFinale.css';

function InscriptionTournoi() {
    const [tournoiId, setTournoiId] = useState('');
    const [equipeId, setEquipeId] = useState('');
    const [tournois, setTournois] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchTournois = async () => {
            try {
                const response = await axios.get('http://localhost:5002/api/tournoi');
                setTournois(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des tournois:', error);
            }
        };

        fetchTournois();
    }, []);

    const handleInscription = async (e) => {
    e.preventDefault();
    try {
        // Envoi direct de equipeId comme entier dans le corps de la requête
        const response = await axios.post(`http://localhost:5002/api/tournoi/${tournoiId}/addEquipe`, equipeId, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 200) {
            setMessage('Équipe ajoutée au tournoi avec succès. Pour les tournois inférieurs à P500, votre inscription est validée. Au-delà, une validation vous sera envoyée ultérieurement en fonction du poids des équipes.');
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
                            <select
                                className="input-field"
                                value={tournoiId}
                                onChange={(e) => setTournoiId(e.target.value)}
                                required
                            >
                                <option value="">Sélectionnez l'ID du tournoi</option>
                                {tournois.map((tournoi) => (
                                    <option key={tournoi.tournoiId} value={tournoi.tournoiId}>
                                        {tournoi.tournoiId} - {tournoi.categorie} - {tournoi.niveau}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="input-group">
                            <input
                                className="input-field"
                                type="number"
                                placeholder="ID de l'Équipe"
                                value={equipeId}
                                onChange={(e) => setEquipeId(e.target.value)}
                                required
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
