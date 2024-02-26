// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Inscription from './Components/Inscription';
import Connexion from './Components/Connexion';
import AjoutEquipe from './Components/AjoutEquipe';
import Tournoi from './Components/Tournoi';
import Accueil from './Components/Accueil';
import InscriptionTournoi from './Components/InscriptionTournoi';
import CreationTournoi from './Components/CreationTournoi';
import AccueilAdmin from './Components/AccueilAdmin';
import InscriptionFinale from './Components/InscriptionFinale';
import AfficherEquipesTournoi from './Components/AfficherEquipesTournoi';
import UpdateClassement from './Components/UpdateClassement';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/inscription" element={<Inscription />} />
                <Route path="/connexion" element={<Connexion />} />
                <Route path="/ajoutequipe" element={<AjoutEquipe />} />
                <Route path="/tournoi" element={<Tournoi />} />
                <Route path="/accueil" element={<Accueil/>} />
                <Route path="/" element={<Inscription />} />
                <Route path="/creationtournoi" element={<CreationTournoi/>} />
                <Route path="/accueiladmin" element={<AccueilAdmin/>} />
                <Route path="/inscriptiontournoi" element={<InscriptionTournoi />} />
                <Route path="/inscriptionfinale" element={<InscriptionFinale />} />
                <Route path="/afficherequipestournoi" element={<AfficherEquipesTournoi />} />
                <Route path="/updateclassement" element={<UpdateClassement />} />
            </Routes>
        </Router>
    );
}

export default App;
