import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCharacters } from 'rickmortyapi';

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

    useEffect(() => {
        const loadCharacters = async () => {
            try {
                const response = await getCharacters();

                if (response.status === 200 && response.data.results) {
                    const characterList = response.data.results.map((character: any): Character => ({
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
                    setCharacters(characterList);
                    setError(null);

                } else {
                    throw new Error('Invalid response data');
                }
            } catch (error) {
                console.error('Error fetching characters:', error);
                setError('Error fetching characters');
            }
        };

        loadCharacters();
    }, []);

    return (
        <div>
            <h1>Rick and Morty Characters</h1>
            {error && <p>{error}</p>}
            <ul>
                {characters.map((character) => (
                    <li key={character.id}>
                        <Link to={`/character/${character.id}`}>
                            <button>{character.name}</button>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
