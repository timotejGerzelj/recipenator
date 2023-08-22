import { useEffect, useState } from "react";
import { Ingredient, Recipe } from "../types/interfaces";
import { getRecipes } from "../services/Recipes";
  

const RecipeFind = ({ingredientsList}) => {
    const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
    const [recipes, setRecipes] = useState<Recipe[]>([])
    const handleIngredientChange = (event) => {
        const { value, checked } = event.target;
        console.log(value, checked);
        if (checked) {
          setSelectedIngredients((prevSelected: string[]) => [...prevSelected, value]);
          console.log(selectedIngredients)
        } else {
          setSelectedIngredients((prevSelected) =>
            prevSelected.filter((ingredient) => ingredient !== value)
          );
        }

      };
    const handleGetRecipes = () => {
        let formatRequestParam = selectedIngredients.join(',')
        let recipeResponse = getRecipes(formatRequestParam);
        recipeResponse.then((resolvedRecipes) => {
            const recipes: Recipe[] = resolvedRecipes.map((recipe) => {
                return {
                  image: recipe.image.replace(/"/g, ''),
                  ingredients: recipe.ingredients,
                  label: recipe.label.replace(/"/g, ''),
                  recipe_url: recipe.recipe_url.replace(/"/g, '')
                };
              });
            setRecipes(recipes);
        })
    }

    return (
    <div className="flex">
    <div>
      <h2>Select Ingredients</h2>
      <ul>
      {ingredientsList.map((ing: Ingredient, index: number) => (
        <li key={ing.ingredient_id}>
            <label>
              <input
                type="checkbox"
                value={ing.ingredient_name}
                onChange={handleIngredientChange}
              />
              {ing.ingredient_name}
            </label>
        </li>
      ))}
      </ul>
      <h2>Selected Ingredients:</h2>
      <ul>
        {selectedIngredients.map((ingredient: string, index: number) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <button className="px-3 py-1 rounded-full text-sm bg-transparent text-gray-500 hover:underline focus:outline-none" onClick={handleGetRecipes}>Search for recipe</button>
    </div>
    <div className="ml-auto">
        <h3>Recipes</h3>
        <ul className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {recipes.map((recipe: Recipe, index: number) => (
                <li
                key={index}
                className="border rounded-lg p-4 shadow-md hover:shadow-lg transition duration-300 ease-in-out"
              >
                <img
                  src={recipe.image}
                  alt={`Recipe ${index}`}
                  className="max-w-full h-auto mx-auto mb-4"
                />
                <h2 className="text-lg font-semibold mb-2">{recipe.label}</h2>
                <p className="text-gray-600 mb-4">{recipe.ingredients.join(', ')}</p>
                <a
                  href={recipe.recipe_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  View Recipe
                </a>
              </li>
        ))}
        </ul>
    </div>
    </div>
    );
}
export default RecipeFind;