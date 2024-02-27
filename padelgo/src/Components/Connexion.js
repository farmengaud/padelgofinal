import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Style/Inscription.css';
import logoConnexion from '../Images/LOGO2.png';
import marque from '../Images/PadelGo.png';

function Connexion() {
    const [email, setEmail] = useState('');
    const [motDePasse, setMotDePasse] = useState('');
    const [erreur, setErreur] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErreur('');

        if (!email) {
            setErreur('Veuillez saisir un e-mail');
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setErreur('Le format de l\'email est invalide.');
            return;
        }

        if (!motDePasse) {
            setErreur('Veuillez saisir un mot de passe');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5002/api/utilisateur/connexion', {
                Mail: email,
                MotDePasse: motDePasse,
            });

            if (response.status === 200 && response.data) {
                // Ici, nous supposons que l'API retourne un objet avec les clés 'nom' et 'prenom'
                // Assurez-vous que ces clés correspondent à la réponse de votre API
                localStorage.setItem('nom', response.data.nom);
                localStorage.setItem('prenom', response.data.prenom);
                localStorage.setItem('email', response.data.email); // ou utilisez 'email' si l'API ne retourne pas l'email

                // Vérifiez si l'email correspond à l'admin
                if (email === 'clubadour@gmail.com') {
                    navigate('/accueiladmin');  
                } else {
                    navigate('/accueil');
                }
            } else {
                setErreur('Connexion échouée. Veuillez vérifier vos informations.');
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setErreur('L’e-mail ou le mot de passe ne correspond pas à nos enregistrements.');
            } else {
                setErreur('Un problème est survenu lors de la connexion. Veuillez réessayer plus tard.');
            }
        }
    };

    return (
        <div className="page-container">
            <div className="marque-container">
                <img src={marque} alt="Marque PadelGo" />
            </div>
            <div className="form-container">
                <div className="logo-container">
                    <img src={logoConnexion} alt="Logo Connexion" />
                </div>
                <h2>Connexion</h2>
                {erreur && <p className="error-message">{erreur}</p>}
                <form onSubmit={handleSubmit}>
                    <input 
                        type="email" 
                        placeholder="E-mail" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input 
                        type="password" 
                        placeholder="Mot de passe" 
                        value={motDePasse}
                        onChange={(e) => setMotDePasse(e.target.value)}
                    />
                    <button type="submit">Connexion</button>
                </form>
                <p>
                    <span>Vous n'avez pas de compte ? </span>
                    <a href="/inscription">Inscription</a>
                </p>
            </div>
        </div>
    );
}

export default Connexion;
