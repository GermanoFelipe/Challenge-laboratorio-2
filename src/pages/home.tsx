import React, { useEffect, useState } from 'react';
import { fetchTeams } from '../services/apiService';

interface Team {
    id: number;
    name: string;
}

const Home: React.FC = () => {
    const [teams, setTeams] = useState<Team[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadTeams = async () => {
            try {
                const data = await fetchTeams();
                console.log('Teams data:', data);
                setTeams(data);
                setError(null);
            } catch (error) {
                console.error('Error fetching teams:', error);
            }
        };

        loadTeams();
    }, []);

    return (
        <div>
            <h1>Euro 2024 Teams</h1>
            {error && <p>{error}</p>}
            <ul>
                {teams.map(team => (
                    <li key={team.id}>{team.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
