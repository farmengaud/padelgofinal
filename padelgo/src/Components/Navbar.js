// Navbar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import '../Style/Navbar.css';
import logoConnexion from '../Images/LOGO2.png';
import marque from '../Images/PadelGo1.png';

function Navbar() {
    return (
        <header className="navbar-header">
            <NavLink to="/accueil" className="brand-container">
                <img src={marque} alt="PadelGo" className="brand-logo"/>
            </NavLink>
            <NavLink to="/accueil" className="login-container">
                <img src={logoConnexion} alt="Connexion" className="login-logo"/>
            </NavLink>
        </header>
    );
}

export default Navbar;
