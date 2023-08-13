import { Ingredient } from "../types/interfaces";

const API_BASE_URL = 'http://localhost:8080/api'; // Replace with your API base URL




export async function getIngredients(): Promise<Ingredient[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/ingredients`);
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
};


export async function postIngredient(newIngredient: Ingredient) : Promise<Ingredient> {
  try {
    const response = await fetch(`${API_BASE_URL}/ingredient`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newIngredient),
    });

    if (!response.ok) {
      throw new Error('Failed to create ingredient');
    }

    const createdIngredient = await response.json();
    return createdIngredient;
  } catch (error) {
    throw error;
  }
}

export async function deleteIngredient(id: string) {
    try {
        const response = await fetch(`${API_BASE_URL}/ingredient/${id}`, {
              method: 'DELETE',
        });
        return response;
    }
    catch (error) {
        console.error('Error deleting ingredient', error);
    }
}