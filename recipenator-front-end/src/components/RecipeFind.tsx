import {  useState } from "react";
import { Ingredient, Recipe } from "../types/interfaces";
import { getRecipes } from "../services/Recipes";
import { useIngredientsStore } from "../App";
  

const RecipeFind = () => {
    const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
    const {ingredients} = useIngredientsStore();
    const [selectedRecipes, setSelectedRecipes] = useState<number[]>([]);
    const [recipes, setRecipes] = useState<Recipe[]>([])
    const handleIngredientChange = (event: any) => {
        const { value, checked } = event.target;
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
    const handleRecipeSelect = (index: number) => {
      if (selectedRecipes.includes(index)) {
        setSelectedRecipes(selectedRecipes.filter((i) => i !== index));
      } else {
        setSelectedRecipes([...selectedRecipes, index]);
      }
    };
    const handleRecipesSubmit = (recipes: Recipe[]) => {

    }

    return (
    <div className="flex">
    <div className="sticky absolute inset-0 w-full h-full h-screen">
      <h2>Select Ingredients</h2>
      <ul className="flex flex-col overflow-hidden font-poppins">
      {ingredients.map((ing: Ingredient, index: number) => (
        <li className="flex flex-col p-4 border-4 border-slate-950 rounded-lg mb-4 hover:bg-slate-50 transition" key={ing.ingredient_id}>
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
      <ul className="flex flex-col overflow-hidden font-poppins">
        {selectedIngredients.map((ingredient: string, index: number) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <button className="fixed w-auto bottom-0 left-0 mb-4 ml-4 px-3 py-2 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded focus:outline-none focus:ring focus:border-blue-300 transition" onClick={handleGetRecipes}>Search for recipe</button>
    </div>
    <div className="ml-auto">
        <h3>Recipes</h3>
        <ul className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {recipes.map((recipe: Recipe, index: number) => (
                <li
                key={index}
                className={`border rounded-lg p-4 shadow-md ${
                  selectedRecipes.includes(index) ? "bg-blue-100" : "bg-white"
                } hover:shadow-lg transition duration-300 ease-in-out`}>
                <img
                  src={recipe.image}
                  alt={`Recipe ${index}`}
                  className="max-w-full h-auto mx-auto mb-4"
                />
                <h2 className="text-lg font-semibold mb-2">{recipe.label}</h2>
                <p className="text-gray-600 mb-4">{recipe.ingredients.join(', ')}</p>
                <button
                className={`px-2 py-1 text-sm border ${
                  selectedRecipes.includes(index)
                    ? "bg-blue-500 text-white"
                    : "border-gray-300 text-gray-500"
                } rounded focus:outline-none focus:ring focus:border-blue-300 transition`}
                onClick={() => handleRecipeSelect(index)}
              >
                {selectedRecipes.includes(index) ? "Selected" : "Select"}
              </button>
                <a
                  href={recipe.recipe_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline">
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