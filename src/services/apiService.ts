const API_HOST = 'euro-20242.p.rapidapi.com';
const API_KEY = '4a6a34ad94msh3fedc546dc8e251p1e9559jsna20c719aec5c';

export const fetchTeams = async (): Promise<any> => {
    const url = `https://${API_HOST}/teams`; // Cambia este endpoint al correcto

    const headers = {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': API_HOST,
        'Content-Type': 'application/json',
    };

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers,
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, details: ${errorText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching teams:', error);
        throw error;
    }
};