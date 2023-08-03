import React, { useState, useEffect } from 'react';
import UpdateRecipe from './UpdateRecipe';

interface Recipe {
    id: string,
    name: string,
    instructions: string,
    ingredients: string,
}



const ListRecipes = ({recipes}) => {
    const [data, setData] = useState<Recipe[]>([]);
    const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
    useEffect(() => {
        setData(recipes);
      }, []);
    async function handleDelete(id: string) {
        try {
            // Make the API call to delete the recipe by its ID
            const response = await fetch(`http://localhost:8080/api/recipes/${id}/recipe`, {
              method: 'DELETE',
            });
      
            if (response.ok) {
              // Remove the deleted recipe from the list
              setData(data.filter(recipe => recipe.id !== id));
            }
          } catch (error) {
            console.error('Error deleting recipe:', error);
          }
    }

    const handleRecipeUpdate = (updatedRecipe: Recipe) => {
        // Update the recipes array in the parent component
        const updatedRecipes = recipes.map((recipe) => (recipe.id === updatedRecipe.id ? updatedRecipe : recipe));
        setData(updatedRecipes); // Assuming you have a setRecipes function to update the state
      };


    return (
        <div>
            <h1>All recipes</h1>
            <ul>
            {data.map((item, index) => (
                <>
                <li key={index}>
                <p>{item.name}</p>
                <p>{item.ingredients}</p>
                <p>{item.instructions}</p>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
                <button onClick={() => setEditingRecipe(item)}>Update</button>
                    {editingRecipe?.id === item.id && (
                    <UpdateRecipe
                        recipe={item}
                        onCancel={() => setEditingRecipe(null)}
                        onRecipeUpdate={handleRecipeUpdate}
              />
            )}
                </li>
                <p>------------------------------------------</p>
                </>

            ))}
            </ul>
        </div>
    )
}

export default ListRecipes;