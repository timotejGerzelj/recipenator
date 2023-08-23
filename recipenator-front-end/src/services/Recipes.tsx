import { Recipe } from "../types/interfaces";

const API_BASE_URL = 'http://localhost:8080/api'; // Replace with your API base URL



export async function getRecipes(data_to_send: string) : Promise<Recipe[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/ingredients/recipes/${data_to_send}`);
        if (!response.ok) {
            throw new Error('Failed to fetch pantry ingredients');
        }
        const data = await response.json();
        console.log(data);
        return data;
    }
    catch(error){
        throw error;
    }
}

export async function newSelectedRecipe() {}

export async function deleteRecipe() {}