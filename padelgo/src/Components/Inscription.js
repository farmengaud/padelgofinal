import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Style/Inscription.css';
import logoConnexion from '../Images/LOGO2.png';
import marque from '../Images/PadelGo.png';

function Inscription() {
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [motDePasse, setMotDePasse] = useState('');
    const [classement, setClassement] = useState('');
    const [error, setError] = useState(''); 

    const navigate = useNavigate();

    const handleInscription = async () => {
        setError(''); 

        if (!nom || !prenom || !email || !motDePasse || !classement) {
            setError('Tous les champs sont obligatoires.');
            return;
        }

        // Validation simple de l'email
        if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Le format de l\'email est invalide.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5002/api/utilisateur/inscription', {
                Nom: nom,
                Prenom: prenom,
                Mail: email,
                MotDePasse: motDePasse,
                Classement: classement,
            });

            if (response.status === 200) {
                navigate('/connexion');
            } else {
                setError('Connexion échouée. Veuillez vérifier vos informations.');
            }
        } catch (error) {
            if (error.response && error.response.status === 409) {
                // Gestion spécifique de l'erreur "e-mail déjà utilisé"
                setError('Cette adresse e-mail est déjà utilisée.');
            } else {
                setError('Une erreur est survenue lors de l\'inscription.');
            }
            console.error('Erreur lors de l\'inscription:', error.response || error);
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
                <h2>Inscription</h2>
                {error && <p className="error-message">{error}</p>}
                <input type="text" placeholder="Prenom" value={prenom} onChange={e => setPrenom(e.target.value)} />
                <input type="text" placeholder="Nom" value={nom} onChange={e => setNom(e.target.value)} />
                <input type="text" placeholder="Classement" value={classement} onChange={e => setClassement(e.target.value)} />
                <input type="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} />
                <input type="password" placeholder="Mot de passe" value={motDePasse} onChange={e => setMotDePasse(e.target.value)} />
                <button onClick={handleInscription}>Inscription</button>
                <p>
                    Vous avez déjà un compte ? <a href="/connexion">Connexion</a>
                </p>
            </div>
        </div>
    );
}

export default Inscription;
