import {getCharacter} from "rickmortyapi";

export interface Location {
    name: string;
    url: string;
}

export interface Character {
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

export const fetchCharacterById = async (id: number): Promise<Character> => {
    try {
        const response = await getCharacter(id);
        if (response.status === 200 && response.data) {
            return response.data;
        } else {
            throw new Error(`Failed to fetch character with ID: ${id}`);
        }
    } catch (error) {
        console.error('Error fetching character by ID:', error);
        throw error;
    }
};