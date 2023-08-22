import { Ingredient, newIngredient } from "../types/interfaces";

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


export async function postIngredient(newIngredient: newIngredient) : Promise<Ingredient> {
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
    console.log("Hello, ", createdIngredient);
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

export async function updateIngredient(updatedIngredient: Ingredient) : Promise<Ingredient> {
    console.log("Ingredient to: ", updatedIngredient);
    try {
        const response = await fetch(`${API_BASE_URL}/ingredient`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedIngredient),
        });

        if (!response.ok) {
            throw new Error('Failed to update ingredient');
        }
        console.log(response)
        return updatedIngredient;
    } catch (error) {
        console.error('Error updating ingredient', error);
        throw error;
    }
}