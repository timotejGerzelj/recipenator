import { PantryIngredient } from "../types/interfaces";

const API_BASE_URL = 'http://localhost:8080/api'; // Replace with your API base URL




export async function getPantryIngredients(): Promise<PantryIngredient[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/pantry/ingredients`);
        if (!response.ok) {
            throw new Error('Failed to fetch pantry ingredients');
        }
        const data = await response.json();
        return data;
    }
    catch(error){
        throw error;
    }
};