import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCharacterById } from '../../services/apiService.ts';

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
    episode: string[];
    image: string;
}

const Character: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [character, setCharacter] = useState<Character | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadCharacter = async () => {
            if (id) {
                try {
                    const data = await fetchCharacterById(Number(id));
                    setCharacter(data);
                    setError(null);
                } catch (error) {
                    console.error('Error fetching character:', error);
                    setError('Error fetching character');
                }
            }
        };

        loadCharacter();
    }, [id]);

    const extractEpisodeNumber = (url: string): string => {
        const parts = url.split('/');
        return parts[parts.length - 1];
    };

    return (
        <div>
            <h1>Character Details</h1>
            {error && <p>{error}</p>}
            {character ? (
                <div>
                    <img src={character.image} alt={character.name} style={{ width: '200px', height: 'auto' }} />
                    <ul>
                        <li><strong>Name:</strong> {character.name}</li>
                        <li><strong>Status:</strong> {character.status}</li>
                        <li><strong>Species:</strong> {character.species}</li>
                        <li><strong>Type:</strong> {character.type}</li>
                        <li><strong>Gender:</strong> {character.gender}</li>
                        <li><strong>Origin:</strong> {character.origin.name}</li>
                        <li><strong>Location:</strong> {character.location.name}</li>
                        <li><strong>Episodes:</strong>
                            <ul>
                                {character.episode.map((episode, index) => (
                                    <li key={index}>Episode {extractEpisodeNumber(episode)}</li>
                                ))}
                            </ul>
                        </li>
                    </ul>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Character;
