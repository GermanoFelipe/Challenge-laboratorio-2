import {getCharacter} from "rickmortyapi";
import {CharacterType} from "../types.ts";

export const fetchCharacterById = async (id: number): Promise<CharacterType> => {
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