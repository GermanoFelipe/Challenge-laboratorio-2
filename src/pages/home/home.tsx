import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { getCharacters } from 'rickmortyapi';
import './Home.css';

interface Location {
    name: string;
    url: string;
}

interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: Location;
    location: Location;
    image: string;
}

const Home: React.FC = () => {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);

    const containerRef = useRef<HTMLDivElement | null>(null);

    const loadCharacters = useCallback(async () => {
        try {
            setLoading(true);
            const response = await getCharacters({ page });

            if (response.status === 200 && response.data.results) {
                const newCharacters = response.data.results.map((character: any): Character => ({
                    id: character.id,
                    name: character.name,
                    status: character.status,
                    species: character.species,
                    type: character.type,
                    gender: character.gender,
                    origin: character.origin,
                    location: character.location,
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

    const handleScroll = () => {
        if (containerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
            if (scrollTop + clientHeight >= scrollHeight - 100 && !loading) {
                setPage(prevPage => prevPage + 1);
            }
        }
    };

    return (
        <div className="app-container">
            <div className="content-container">
                <h1>Rick and Morty Characters</h1>
                {error && <p>{error}</p>}
                <div
                    ref={containerRef}
                    onScroll={handleScroll}
                    className="scroll-container"
                >
                    <ul className="character-list">
                        {characters.map((character) => (
                            <li key={character.id} className="character-item">
                                <Link to={`/character/${character.id}`}>
                                    <button className="character-button">
                                        {character.name}
                                    </button>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    {loading && <p>Loading more characters...</p>}
                </div>
            </div>
        </div>
    );
};

export default Home;
