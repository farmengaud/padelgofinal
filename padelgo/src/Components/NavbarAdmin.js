// Navbar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import '../Style/Navbar.css'; // Assurez-vous que le chemin d'accès est correct
import logoConnexion from '../Images/LOGO2.png';
import marque from '../Images/PadelGo1.png';

function Navbar() {
    return (
        <header className="navbar-header">
            <NavLink to="/AccueilAdmin" className="brand-container">
                <img src={marque} alt="PadelGo" className="brand-logo"/>
            </NavLink>
            <NavLink to="/AccueilAdmin" className="login-container">
                <img src={logoConnexion} alt="Connexion" className="login-logo"/>
            </NavLink>
        </header>
    );
}

export default Navbar;
