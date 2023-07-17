import React, { useEffect, useState } from 'react';
import { FaSearch, FaBars } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
    const [scrollY, setScrollY] = useState(0);
    const [navTransparent, setNavTransparent] = useState(false);
    const [showMenu, setShowMenu] = useState(window.innerWidth > 768);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchError, setSearchError] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        setSearchError(false);

        if (searchQuery.trim() === '') {
            return;
        }

        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/search/movie?api_key=efcc6a6fd5c585d6c01e1d3d7963da3b&query=${encodeURIComponent(
                    searchQuery
                )}`
            );

            if (!response.ok) {
                console.error('Error fetching movie data from TMDB API');
                return;
            }

            const data = await response.json();

            if (data.results && data.results.length > 0) {
                const movieId = data.results[0].id;
                navigate(`/movie/${movieId}`);
            } else {
                console.error('Filme nao Encontrado');
                setSearchError(true);
            }
        } catch (error) {
            console.error('Error fetching movie:', error);
            setSearchError(true); 
        }
    };

    const toggleMenu = () => {
        setShowMenu((prevState) => !prevState);
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        setNavTransparent(scrollY === 0 && !showMenu);
    }, [scrollY, showMenu]);

    useEffect(() => {
        const handleResize = () => {
            setShowMenu(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <nav
            style={{
                backgroundColor:
                    scrollY === 0 && window.innerWidth > 768
                        ? '#000000b8'
                        : navTransparent
                            ? 'transparent'
                            : '#000000b8',
            }}
        >
            <div className="menu-toggle icon" onClick={toggleMenu}>
                <FaBars />
            </div>
            <ul className={`menu${showMenu ? ' menuOpen' : ''}`}>
                <li>
                    <Link to="/">
                        <img
                            src="./logo.png"
                            alt="NetClone Logo"
                        />
                    </Link>
                </li>
                <li>
                    <Link to="/films">Filmes</Link>
                </li>
                <li>
                    <Link to="/series">Series</Link>
                </li>
                <li>
                    <Link to="/my-list">Minha Lista</Link>
                </li>
                <li>
                    <form onSubmit={handleSearchSubmit}>
                        <input
                            type="text"
                            placeholder="Buscar filme"
                            value={searchQuery}
                            onChange={handleInputChange}
                            className={searchError ? 'inputError' : ''}
                        />
                        <button type="submit">
                            <FaSearch />
                        </button>
                    </form>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
