import { Recipe, SelectedRecipe } from "../types/interfaces";

const API_BASE_URL = 'http://localhost:8080/api'; // Replace with your API base URL



export async function getRecipes(data_to_send: string) : Promise<Recipe[]> {
    try {
        console.log(data_to_send, " send data");
        const response = await fetch(`${API_BASE_URL}/ingredients/recipes/${data_to_send}`);
        if (!response.ok) {
            throw new Error('Failed to fetch pantry ingredients');
        }
        const data = await response.json();
        console.log(data);
        return data;
    }
    catch(error){
        console.log(data_to_send, " send data");
        throw error;
    }
}
export async function getSelectedRecipes() : Promise<SelectedRecipe[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/recipes`);
        if (!response.ok) {
            throw new Error('Failed to fetch SelectedRecipes');
        }
        const data = await response.json();
        console.log(data);
        return data;
    }
    catch(error){
        throw error;
    }
}

export async function postSelectedRecipes(recipes: SelectedRecipe[]) : Promise<SelectedRecipe[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/recipes/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(recipes),
        });
        if (!response.ok) {
          throw new Error('Failed to create Selected Recipes');
        }
        const createdRecipes = await response.json();
        console.log("Hello, ", createdRecipes);
        return createdRecipes;
      } catch (error) {
        throw error;
      }
}

export async function deleteRecipe(id: string) {
    try {
        const response = await fetch(`${API_BASE_URL}/recipes//${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to delete ingredient');
        }
        return response;
    }
    catch (error) {
        console.error('Error deleting ingredient', error);
        throw error;
    }
}