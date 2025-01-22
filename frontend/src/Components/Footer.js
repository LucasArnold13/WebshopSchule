import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <p>Account erstellen und keine Aktion mehr verpassen!</p>
            <div className="footer-info">
                <div className="contact-info">
                    <p>Webshop</p>
                    <p>+49 1573 29-20</p>
                    <p>info@mail.de</p>
                </div>
                <div className="address-info">
                    <p>Musterstraße 10</p>
                    <p>52525 Heinsberg</p>
                </div>
            </div>
            <div className="footer-links">
                <p>Impressum</p>
                <p>Datenschutz</p>
            </div>
        </footer>
    );
}

export default Footer;
