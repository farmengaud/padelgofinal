import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './NavbarAdmin';
import { useNavigate } from 'react-router-dom';
import '../Style/AfficherEquipes.css'; 

function SuppressionTournoi() {
    const [tournoiId, setTournoiId] = useState('');
    const [erreur, setErreur] = useState('');
    const navigate = useNavigate();

    const handleSuppression = async (e) => {
        e.preventDefault();
        if (!tournoiId) {
            setErreur('Veuillez entrer un ID de tournoi.');
            return;
        }
        try {
            // Confirmation avant suppression
            if (window.confirm('Êtes-vous sûr de vouloir supprimer ce tournoi ?')) {
                await axios.delete(`http://localhost:5002/api/tournoi/${tournoiId}`);
                alert('Tournoi supprimé avec succès.');
                navigate('/accueiladmin'); // Redirection vers la page d'accueil de l'administration après la suppression
            }
        } catch (error) {
            setErreur('Erreur lors de la suppression du tournoi. Assurez-vous que l\'ID du tournoi est correct.');
            console.error(error);
        }
    };
    const handleBackToAdmin = () => {
        navigate('/accueiladmin');
    };

    return (
        <>
            <Navbar />
            <div className="form-container3">
                <h2>Supprimer un Tournoi</h2>
                {erreur && <p className="error-message3">{erreur}</p>}
                <form onSubmit={handleSuppression}>
                    <input
                        type="number"
                        placeholder="ID du Tournoi à supprimer"
                        value={tournoiId}
                        onChange={(e) => setTournoiId(e.target.value)}
                    />
                    <button type="submit">Supprimer</button>
                    <button className="back-to-admin-button" onClick={handleBackToAdmin}>Retour</button>
                </form>
            </div>
        </>
    );
}

export default SuppressionTournoi;
