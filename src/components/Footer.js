import React from 'react';
import './Footer.css'

function Footer() {
    return (
        <footer>
            <div className="footer-links">
                <ul>
                    <li>
                        <p>Perguntas Frequentes</p>
                    </li>
                    <li>
                        <p>Centro de Ajuda</p>
                    </li>
                    <li>
                        <p>Termos de Uso</p>
                    </li>
                    <li>
                        <p>Privacidade</p>
                    </li>
                </ul>
            </div>
            <div className="social-media-links">
                <ul>
                    <li>
                        <p>
                            <i className="fab fa-facebook-f">Facebook</i>
                        </p>
                    </li>
                    <li>
                        <p>
                            <i className="fab fa-twitter">Twitter</i>
                        </p>
                    </li>
                    <li>
                        <p>
                            <i className="fab fa-instagram">Instagram</i>
                        </p>
                    </li>
                </ul>
            </div>
            <div className="netflix-info">
                <p>© {new Date().getFullYear()} Netflix, Inc.</p>
            </div>
        </footer>
    );
}

export default Footer;
