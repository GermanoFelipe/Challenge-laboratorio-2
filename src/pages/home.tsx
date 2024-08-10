import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchTeams } from '../services/apiService';

interface Team {
    _id: string;
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
                setError('Error fetching teams');
            }
        };

        loadTeams();
    }, []);

    return (
        <div>
            <h1>Euro 2024 Teams</h1>
            {error && <p>{error}</p>}
            <ul>
                {teams.map((team) => (
                    <li key={team._id}>
                        <Link to={`/team/${team._id}`}>{team.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
