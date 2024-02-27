import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Tapbar from './Tapbar';
import '../Style/Accueil.css';

function Accueil() {
    const [utilisateur, setUtilisateur] = useState({
        nom: '',
        prenom: '',
    });

    useEffect(() => {
         console.log('Effect exécuté');
        const nomLocal = localStorage.getItem('nom');
        const prenomLocal = localStorage.getItem('prenom');

        // Mise à jour de l'état avec les valeurs du stockage local si elles existent
        if (nomLocal && prenomLocal) {
            setUtilisateur({
                nom: nomLocal,
                prenom: prenomLocal
            });
        } else {
            const email = localStorage.getItem('email');
            console.log('Email extrait du localStorage:', email);
            if (email) {
                console.log('Email récupéré:', email);
                const fetchUserData = async () => {
                    try {
                        const response = await axios.get(`http://localhost:5002/api/utilisateur/getNomPrenomParEmail?email=${email}`);
                        console.log('Réponse de l\'API:', response.data);
                        localStorage.setItem('nom', response.data.nom);
                        localStorage.setItem('prenom', response.data.prenom);
                        setUtilisateur({
                            nom: response.data.nom,
                            prenom: response.data.prenom
                        });
                        console.log('Utilisateur mis à jour:', { nom: response.data.nom, prenom: response.data.prenom }); // Ce log vous montre les nouvelles valeurs de l'utilisateur
                    } catch (error) {
                        console.error('Erreur lors de la récupération des données utilisateur:', error);
                    }
                };
                

                fetchUserData( );
                
            }
        }
    }, []); // Le tableau de dépendances vide indique que cet effet ne s'exécutera qu'une fois après le premier rendu

    return (
        <>
            <Navbar />
            <div className="rectangle">
                {utilisateur.nom && utilisateur.prenom ? (
                    <div className="texte-sur-image">Bonjour {utilisateur.prenom} {utilisateur.nom}</div>
                ) : (
                    <div className="texte-sur-image">Chargement...</div>
                )}
            </div>
            <Tapbar />
        </>
    );
}

export default Accueil;
