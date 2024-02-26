import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import Tapbar from './Tapbar';
import '../Style/AjoutEquipe.css'; // Assurez-vous d'avoir les styles nécessaires pour votre formulaire

function Insc() {
    const [nomJoueur1, setNomJoueur1] = useState('');
    const [classementJoueur1, setClassementJoueur1] = useState('');
    const [mailJoueur1, setMailJoueur1] = useState('');
    const [nomJoueur2, setNomJoueur2] = useState('');
    const [classementJoueur2, setClassementJoueur2] = useState('');
    const [mailJoueur2, setMailJoueur2] = useState('');
    const [erreur, setErreur] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const afficherErreur = (message) => {
        setErreur(message);
        setTimeout(() => {
            setErreur(''); // Efface le message d'erreur après 3 secondes
        }, 3000); // 3000 millisecondes = 3 secondes
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nomJoueur1 || !classementJoueur1 || !mailJoueur1 || !nomJoueur2 || !classementJoueur2 || !mailJoueur2) {
            afficherErreur('Tous les champs sont obligatoires.');
            return;
        }

        const equipeData = {
            NomJoueur1: nomJoueur1,
            ClassementJoueur1: parseInt(classementJoueur1),
            MailJoueur1: mailJoueur1,
            NomJoueur2: nomJoueur2,
            ClassementJoueur2: parseInt(classementJoueur2),
            MailJoueur2: mailJoueur2
        };

        try {
            const response = await axios.post('http://localhost:5002/api/equipe', equipeData);
            
            if (response.status === 201) {
                setMessage(`Vous êtes l'équipe numéro ${response.data.equipeId}`);
            } else {
                // Gérer d'autres réponses du serveur
            }
        } catch (error) {
            setErreur('Une erreur est survenue lors de la création de l\'équipe.');
        }
    };
    const handleSuivant = () => {
        navigate('/inscriptionfinale');
    }

    return (
        <>
            <Navbar />
            <div className = "all">
            <div className="form-containerr">
                <h2>Créer une équipe</h2>
                {erreur && <p className="error-message">{erreur}</p>}

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Nom du Joueur 1"
                        value={nomJoueur1}
                        onChange={(e) => setNomJoueur1(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Classement du Joueur 1"
                        value={classementJoueur1}
                        onChange={(e) => setClassementJoueur1(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Email du Joueur 1"
                        value={mailJoueur1}
                        onChange={(e) => setMailJoueur1(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Nom du Joueur 2"
                        value={nomJoueur2}
                        onChange={(e) => setNomJoueur2(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Classement du Joueur 2"
                        value={classementJoueur2}
                        onChange={(e) => setClassementJoueur2(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Email du Joueur 2"
                        value={mailJoueur2}
                        onChange={(e) => setMailJoueur2(e.target.value)}
                    />
                    <button type="submit">Créer l'équipe</button>
                </form>

                {message && <p className="success-message">{message}</p>}
                <button 
                    className="button-suivant" 
                    onClick={handleSuivant} 
                    disabled={!message} // Le bouton est désactivé tant qu'un message de succès n'est pas affiché
                >
                    Suivant
                </button>
                
                <Tapbar />
            </div>
            <div className="footerr">
                <p>Retrouvez votre classement mis à jour tous les premiers mardi du mois sur <a href="https://tenup.fft.fr/">tenup.fft.fr</a>.</p>
            </div>
        </div>
        </>
    );
}

export default Insc;
