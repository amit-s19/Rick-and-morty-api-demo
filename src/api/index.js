import axios from "axios";

const BASE_API_URL = "https://rickandmortyapi.com/api/";
const CHARACTER_URL = "character/?page=";
const EPISODE_URL = "episode/";

// Function to get characters pagy by page
export const getPaginatedCharacters = async (pageNo) => {
    try {
        let response = await axios.get(BASE_API_URL + CHARACTER_URL + pageNo);
        return response.data;
    } catch (err) {
        return false;
    }
}

// Function to get the count of residents in an origin or location.
export const getResidentsCount = async (url) => {
    try {
        let response = await axios.get(url);
        return response?.data?.residents?.length > 0 ? response.data.residents.length : null;
    } catch (err) {
        return false;
    }
}

// Function to get the episode names.
export const getEpisodeNames = async (episodeArray) => {
    try {
        let response = await axios.get(BASE_API_URL + EPISODE_URL + episodeArray.toString());
        return response.data;
    } catch (err) {
        return false;
    }
}