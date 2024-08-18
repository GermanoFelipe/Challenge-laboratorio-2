import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCharacters } from 'rickmortyapi';
import './home.css';
import { APICharacterResponse, CharacterType } from '../../types.ts';

const Home: React.FC = () => {
    const [characters, setCharacters] = useState<CharacterType[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filteredCharacters, setFilteredCharacters] = useState<CharacterType[]>([]);

    const navigate = useNavigate();

    const loadCharacters = useCallback(async () => {
        try {
            setLoading(true);
            const response = await getCharacters({ page });

            if (response.status === 200 && response.data.results) {
                const newCharacters = response.data.results.map((character: APICharacterResponse): CharacterType => ({
                    id: character.id,
                    name: character.name,
                    status: character.status,
                    species: character.species,
                    type: character.type,
                    gender: character.gender,
                    origin: character.origin,
                    location: character.location,
                    episode: character.episode,
                    image: character.image,
                }));
                setCharacters(prevCharacters => [...prevCharacters, ...newCharacters]);
                setError(null);
            } else {
                throw new Error('Invalid response data');
            }
        } catch (error) {
            console.error('Error fetching characters:', error);
            setError('Error fetching characters');
        } finally {
            setLoading(false);
        }
    }, [page]);

    useEffect(() => {
        loadCharacters();
    }, [loadCharacters]);

    const handleScroll = useCallback(() => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && !loading) {
            setPage(prevPage => prevPage + 1);
        }
    }, [loading]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    const handleSearch = () => {
        const results = characters.filter(character =>
            character.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredCharacters(results);

        if (results.length === 1) {
            navigate(`/character/${results[0].id}`);
        }
    };

    return (
        <div>
            <h1 className="header">RICK AND MORTY CHARACTERS</h1>
            <div className="searchBar">
                <div className="wrap">
                    <div className="search">
                        <input
                            type="text"
                            className="searchTerm"
                            placeholder="Search for a character..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button className="searchButton" onClick={handleSearch}>
                            <i className="fa fa-search">🔍</i>
                        </button>
                    </div>
                </div>
            </div>
            <div className="scrollable-dropdown">
                {error && <p>{error}</p>}
                <ul>
                    {(filteredCharacters.length > 0 ? filteredCharacters : characters).map((character, index) => (
                        <li key={`${character.id}-${index}`}>
                            <Link to={`/character/${character.id}`}>
                                <button className="btn">{character.name}</button>
                            </Link>
                        </li>
                    ))}
                </ul>
                {loading && <p>Loading more characters...</p>}
            </div>
        </div>
    );
};

export default Home;
