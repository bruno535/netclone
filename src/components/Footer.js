import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <footer>
            <div className="footer-links">
                <ul>
                    <li>
                        <a href="/">Perguntas Frequentes</a>
                    </li>
                    <li>
                        <a href="/">Centro de Ajuda</a>
                    </li>
                    <li>
                        <a href="/">Termos de Uso</a>
                    </li>
                    <li>
                        <a href="/">Privacidade</a>
                    </li>
                </ul>
            </div>
            <div className="social-media-links">
                <ul>
                    <li>
                        <a href="/">
                            <i className="fab fa-facebook-f"></i> Facebook
                        </a>
                    </li>
                    <li>
                        <a href="/">
                            <i className="fab fa-twitter"></i> Twitter
                        </a>
                    </li>
                    <li>
                        <a href="/">
                            <i className="fab fa-instagram"></i> Instagram
                        </a>
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
