// création tournoi administrateur
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Style/Inscription.css';
import logoConnexion from '../Images/LOGO2.png';
import Navbar from './Navbar';

function Creation() {
    const [categorie, setCategorie] = useState('');
    const [niveau, setNiveau] = useState('');
    const [date, setDate] = useState('');
    const [nombreEquipe, setNombreEquipe] = useState('');
    const [error, setError] = useState(''); // Ajout d'un état pour gérer les erreurs
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Réinitialisation des messages d'erreur
        setError('');

        // Vérification des champs requis
        if (!categorie || !niveau || !date || !nombreEquipe) {
            setError('Tous les champs sont obligatoires.');
            return;
        }

        // Conversion du nombre d'équipes en nombre
        const nombreEquipeParsed = parseInt(nombreEquipe, 10);
        if (isNaN(nombreEquipeParsed)) {
            setError('Le nombre d\'équipes doit être un nombre valide.');
            return;
        }

        // Création de l'objet du nouveau tournoi
        const nouveauTournoi = {
            Categorie: categorie,
            Niveau: niveau,
            Date: date,
            NombreEquipe: nombreEquipeParsed,
        };

        try {
            // Envoi de la requête POST à l'API
            const response = await axios.post('http://localhost:5002/api/tournoi', nouveauTournoi);

            // Redirection vers la page d'accueil de l'administrateur après la création
            navigate('/accueiladmin');
        } catch (error) {
            // Gestion des erreurs
            setError('Une erreur est survenue lors de la création du tournoi. Veuillez réessayer.');
            console.error('Erreur lors de la création du tournoi:', error.response || error);
        }
    };
const handleBackToAdmin = () => {
        navigate('/accueiladmin');
    };
    return (
        <div className="form-container">
            <Navbar />
            <div className="logo-container">
                <img src={logoConnexion} alt="Logo Connexion" />
            </div>
            <h2>Nouveau Tournoi</h2>
            {error && <p className="error-message">{error}</p>} {/* Affichage du message d'erreur */}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Catégorie"
                    value={categorie}
                    onChange={(e) => setCategorie(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Niveau"
                    value={niveau}
                    onChange={(e) => setNiveau(e.target.value)}
                />
                <input
                    type="date"
                    placeholder="Date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Nombre d'équipes"
                    value={nombreEquipe}
                    onChange={(e) => setNombreEquipe(e.target.value)}
                />
                <button type="submit">Création du tournoi</button>
            </form>
            <button className="back-to-admin-button" onClick={handleBackToAdmin}>Retour</button>
        </div>
    );
}

export default Creation;
