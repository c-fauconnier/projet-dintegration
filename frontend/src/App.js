import React from 'react';
import BarNav from './Components/Navbar/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CookieConsent from 'react-cookie-consent';

function App() {

  return (
    <div className="App">
      <BarNav/>
      <ToastContainer/>
      <CookieConsent
        buttonText="Je comprends"
        style={{ background: "#2B373B" }}
        buttonStyle={{ color: "#4e503b", fontSize: "20px", background: "#5db674" }}
      >
        Bangoo utilise des cookies afin d'améliorer l'expérience utilisateur. Voir nos <a href='/GPU'>Mentions légales</a> pour plus d'informations.
      </CookieConsent>
    </div>
  );
}

export default App;
