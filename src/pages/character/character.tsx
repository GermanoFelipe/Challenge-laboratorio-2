import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCharacterById } from '../../services/apiService.ts';
import { CharacterType } from '../../types.ts';
import './character.css';

const Character: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [character, setCharacter] = useState<CharacterType | null>(null);
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
            <h1 className="sub-header">Character Details</h1>
            {error && <p className="error">{error}</p>}
            {character ? (
                <div className="character-container">

                    <img src={character.image} alt={character.name} className="character-image"/>

                    <ul className="character-details">

                        <li><strong>Name and status: </strong>
                            {character.name + ", " + character.status}</li>

                        <li><strong>Species and type: </strong>
                            {character.gender + " " + character.species + ", " + character.type}</li>

                        <li><strong>Origin and location: </strong>
                            {character.origin.name + ", " + character.location.name}</li>

                        <li><strong>Episodes: </strong>
                            <ul className="episodes-list">
                                {character.episode.map((episode, index) => (
                                    <li key={index}>Episode {extractEpisodeNumber(episode)}</li>
                                ))}
                            </ul>
                        </li>

                    </ul>
                </div>
            ) : (
                <p className="loading-text">Loading...</p>
            )}
        </div>
    );
};

export default Character;
