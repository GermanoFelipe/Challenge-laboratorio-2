import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getCharacters } from 'rickmortyapi';
import './home.css'
import {APICharacterResponse, CharacterType} from "../../types.ts";


const Home: React.FC = () => {
    const [characters, setCharacters] = useState<CharacterType[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);

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

    return (
        <div>
            <h1 className="header">RICK AND MORTY CHARACTERS</h1>
            <div>
                {error && <p>{error}</p>}
                <ul>
                    {characters.map((character) => (
                        <li key={character.id}>
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
