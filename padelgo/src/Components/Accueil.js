import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import Tapbar from './Tapbar';
import '../Style/Accueil.css';

function Accueil() {
    const [utilisateur, setUtilisateur] = useState({
        nom: localStorage.getItem('nom') || '',
        prenom: localStorage.getItem('prenom') || '',
    });

    useEffect(() => {
        // Si les informations de l'utilisateur ne sont pas déjà stockées, faites une requête pour les obtenir
        if (!utilisateur.nom || !utilisateur.prenom) {
            // Assurez-vous de définir correctement l'adresse e-mail ici
            const email = localStorage.getItem('email');
            if (email) {
                const fetchUserData = async () => {
                    try {
                        const response = await axios.get(`http://localhost:5002/api/utilisateur/getNomPrenomParEmail?email=${email}`);
                        localStorage.setItem('nom', response.data.nom);
                        localStorage.setItem('prenom', response.data.prenom);
                        setUtilisateur({
                            nom: response.data.nom,
                            prenom: response.data.prenom
                        });
                    } catch (error) {
                        console.error('Erreur lors de la récupération des données utilisateur:', error);
                    }
                };

                fetchUserData();
            }
        }
    }, []); // Le tableau de dépendances vide indique que cet effet ne s'exécutera qu'une fois après le premier rendu

    return (
        <>
            <Navbar />
            <div className="rectangle">
                {/* Affichez le message de bienvenue si le nom et le prénom sont définis */}
                {utilisateur.nom && utilisateur.prenom && (
                    <div className="texte-sur-image">Bonjour {utilisateur.prenom} {utilisateur.nom}</div>
                )}
            </div>
            <Tapbar />
        </>
    );
}

export default Accueil;