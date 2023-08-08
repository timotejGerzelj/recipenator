import React, { useState } from 'react';
import { Recipe } from '../types/interfaces';



interface UpdateRecipeProps {
  recipe: Recipe;
  onCancel: () => void;
  recipes: Recipe[];
  onRecipeUpdate: (updatedRecipe: Recipe) => void;
}


const UpdateRecipe = ({ recipe, onCancel, onRecipeUpdate }) => {
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
  const [updatedName, setUpdatedName] = useState(recipe.name);
  const [updatedIngredients, setUpdatedIngredients] = useState(recipe.ingredients);
  const [updatedInstructions, setUpdatedInstructions] = useState(recipe.instructions);

const handleUpdate = (e: React.FormEvent) => {
  e.preventDefault();
  const updatedRecipe: Recipe = {
    ...recipe,
    name: updatedName,
    ingredients: updatedIngredients,
    instructions: updatedInstructions,
  }
  updateRecipeItem(updatedRecipe);
}

async function updateRecipeItem(item: Recipe) {
  console.log("data", item)
  try {
    // Make the API call to your Rust backend here
    const response = await fetch(`http://localhost:8080/api/recipes/${item.id}/recipe`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });

    if (response.ok) {
      // Handle successful response, e.g., show a success message
      console.log('Form submitted successfully!');
      onRecipeUpdate(item);
      setEditingRecipe(null);
    } else {
      // Handle error response, e.g., show an error message
      console.error('Failed to submit form.');
    }
  } catch (error) {
    // Handle network errors or other exceptions
    console.error('An error occurred while submitting the form:', error);
  }
};

  return (
    <div>
      <form onSubmit={handleUpdate}>
        <label>
          Name:
          <input type="text" value={updatedName} onChange={(e) => setUpdatedName(e.target.value)} />
        </label>
        <label>
          Ingredients:
          <input type="text" value={updatedIngredients} onChange={(e) => setUpdatedIngredients(e.target.value)} />
        </label>
        <label>
          Instructions:
          <input type="text" value={updatedInstructions} onChange={(e) => setUpdatedInstructions(e.target.value)} />
        </label>
        <button type="submit">Update</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>

    </div>
  );
};

export default UpdateRecipe;