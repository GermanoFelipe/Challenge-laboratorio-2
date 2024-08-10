import React from 'react';
import { useParams } from 'react-router-dom';

const TeamPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    return (
        <div>
            <h2>Team Details</h2>
            <p>Team ID: {id}</p>
        </div>
    );
};

export default TeamPage;
