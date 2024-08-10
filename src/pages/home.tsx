import React, { useEffect, useState } from 'react';
import { fetchPlayers } from '../services/apiService';

interface Player {
    id: number;
    name: string;
    position: string;
}

const Home: React.FC = () => {
    const [players, setPlayers] = useState<Player[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadPlayers = async () => {
            try {
                const data = await fetchPlayers();
                setPlayers(data);
                setError(null);
            } catch (error) {
                console.error('Error fetching players:', error);
                setError('Error fetching players');
            }
        };

        loadPlayers();
    }, []);

    return (
        <div>
            <h1>Premier League Players</h1>
            {error && <p>{error}</p>}
            <ul>
                {players.map(player => (
                    <li key={player.id}>{player.name} - {player.position}</li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
