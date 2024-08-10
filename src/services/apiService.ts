export const fetchPlayers = async () => {
    const apiKey = '4a6a34ad94msh3fedc546dc8e251p1e9559jsna20c719aec5c'
    try {
        const response = await fetch('https://premier-league-players1.p.rapidapi.com/players', {
            method: 'GET',
            headers: {
                'x-rapidapi-key': apiKey,
                'x-rapidapi-host': 'premier-league-players1.p.rapidapi.com'
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`HTTP error! status: ${response.status}, details: ${errorText}`);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching players:', error);
        throw error;
    }
};
