export interface Location {
    name: string;
    url: string;
}

export interface CharacterType {
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

export interface APICharacterResponse {
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