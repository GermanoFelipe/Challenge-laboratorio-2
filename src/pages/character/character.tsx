import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCharacterById } from '../../services/apiService.ts';
import { CharacterType } from '../../types.ts';

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
        <div style={{ padding: '10px', fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
            <h1 style={{ textAlign: 'center' }}>Character Details</h1>
            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
            {character ? (
                <div style={{ textAlign: 'center' }}>
                    <img
                        src={character.image}
                        alt={character.name}
                        style={{
                            width: '100%',
                            maxWidth: '300px',
                            height: 'auto',
                            borderRadius: '10px',
                            marginBottom: '20px'
                        }}
                    />
                    <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left' }}>
                        <li><strong>Name and status: </strong>
                            {character.name + ", " + character.status}</li>
                        <li><strong>Species and type: </strong>
                            {character.gender + " " +character.species + ", " + character.type}</li>
                        <li><strong>Origin and location: </strong>
                            {character.origin.name + ", " + character.location.name}</li>
                        <li><strong>Episodes: </strong>
                            <ul style={{ listStyle: 'none', paddingLeft: '15px' }}>
                                {character.episode.map((episode, index) => (
                                    <li key={index}>Episode {extractEpisodeNumber(episode)}</li>
                                ))}
                            </ul>
                        </li>
                    </ul>
                </div>
            ) : (
                <p style={{ textAlign: 'center' }}>Loading...</p>
            )}
        </div>
    );
};

export default Character;
