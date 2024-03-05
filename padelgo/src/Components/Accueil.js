import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Tapbar from './Tapbar';
import { useNavigate } from 'react-router-dom';
import '../Style/Accueil.css';

function Accueil() {
    const [utilisateur, setUtilisateur] = useState({ nom: '', prenom: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const nomLocal = localStorage.getItem('nom');
        const prenomLocal = localStorage.getItem('prenom');
        if (nomLocal && prenomLocal) {
            setUtilisateur({ nom: nomLocal, prenom: prenomLocal });
        } else {
            const email = localStorage.getItem('email');
            if (email) {
                const fetchUserData = async () => {
                    try {
                        const response = await axios.get(`http://localhost:5002/api/utilisateur/getNomPrenomParEmail?email=${email}`);
                        localStorage.setItem('nom', response.data.nom);
                        localStorage.setItem('prenom', response.data.prenom);
                        setUtilisateur({ nom: response.data.nom, prenom: response.data.prenom });
                    } catch (error) {
                        console.error('Erreur lors de la récupération des données utilisateur:', error);
                    }
                };
                fetchUserData();
            }
        }
    }, []);

    const handleLogout = () => {
        if (window.confirm("Êtes-vous sûr de vouloir vous déconnecter ?")) {
            localStorage.removeItem('nom');
            localStorage.removeItem('prenom');
            localStorage.removeItem('email');
            navigate('/connexion');
        }
    };

    return (
        <>
            <Navbar />
            <div className="rectangle">
                {utilisateur.nom && utilisateur.prenom ? (
                    <>
                        <div className="texte-sur-image">Salut {utilisateur.prenom} bienvenue sur PadelGo</div>
                        <button onClick={handleLogout} className="logout-button">Se déconnecter</button>
                    </>
                ) : (
                    <div className="texte-sur-image">Chargement...</div>
                )}
            </div>
            {/* Section d'informations */}
            <div className="info-section">
                <h2>À propos de PadelGo</h2>
                <p>Bienvenue sur PadelGo, la plateforme dédiée aux passionnés de padel. Rejoignez notre communauté et découvrez les tournois du club de l'Adour, inscrivez votre équipe et venez gagner des tournois prestigieux.</p>
            </div>
            <Tapbar />
        </>
    );
}

export default Accueil;
