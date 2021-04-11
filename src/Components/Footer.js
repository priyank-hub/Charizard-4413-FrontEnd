import React from 'react';
import '../assets/footer.css';
import logo from '../assets/BookshopLogo.png';


const Footer = () => {
    return (
        <div className="col-9 col-sm footer">
            <img className="mb-2" src={logo} alt=""/>
            <small className="d-block mb-3 text-muted name">
                © Charizard Team - EECS 4413 W2021
            </small>
        </div>
    );
}

export default Footer;