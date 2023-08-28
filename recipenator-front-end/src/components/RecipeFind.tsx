import {  useState } from "react";
import { Recipe, SelectedRecipe } from "../types/interfaces";
import { getRecipes, postSelectedRecipes } from "../services/Recipes";
import { useIngredientsStore, useRecipesStore } from "../App";
import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const RecipeFind = () => {
    const navigate = useNavigate();
    const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
    const {ingredients} = useIngredientsStore();
    const {selectedRecipes, setSelectedRecipes} = useRecipesStore();

    const [selectedRecipeToSubmit, setSelectedRecipeToSubmit] = useState<number[]>([]);
    const [recipes, setRecipes] = useState<Recipe[]>([])
    const handleIngredientChange = (ingredientName: string) => {
      if (selectedIngredients.includes(ingredientName)) {
        setSelectedIngredients((prevSelected: string[]) =>
          prevSelected.filter((ingredient) => ingredient !== ingredientName)
        );
      } else {
        setSelectedIngredients((prevSelected) => [...prevSelected, ingredientName]);
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
      if (selectedRecipeToSubmit.includes(index)) {
        setSelectedRecipeToSubmit(selectedRecipeToSubmit.filter((i) => i !== index));
      } else {
        setSelectedRecipeToSubmit([...selectedRecipeToSubmit, index]);
      }
    };
    const handleRecipesSubmit = async (indexes: number[]) => {
      let listOfRecipesToSend: SelectedRecipe[] = [];
      for (const index of indexes) {
        const newSelectedRecipe: SelectedRecipe = {
          recipe_id: "",
          recipe_image: recipes[index].image,
          recipe_ingredients: recipes[index].ingredients.join(','),
          label: recipes[index].label,
          recipe_url: recipes[index].recipe_url
        };
        
        listOfRecipesToSend.push(newSelectedRecipe);
      }
      console.log(listOfRecipesToSend);
      try {
      const addedRecipes = await postSelectedRecipes(listOfRecipesToSend);
      console.log("Recipes added OVER HERE ", addedRecipes);
      if (addedRecipes) {
        let newSelected = [...selectedRecipes, ...addedRecipes]
        setSelectedRecipes(newSelected);
        navigate('/');
      } }
    catch (error) {
      console.error("Error adding recipes: ", error);
    }


    }

    return (
    <div className="flex">
              <div className="w-full sm:w-1/3 md:w-1/4 px-4 h-screen overflow-y-auto bg-white shadow">
          <div className="sticky top-0 p-4">
            <h3 className="text-xl font-semibold mb-4">Ingredients</h3>
            <ul className="flex flex-col space-y-2">
  {ingredients.map((ing, index) => (
    <li
      key={index}
      className={`p-2 border border-gray-600 rounded hover:bg-gray-100 transition`}
      onClick={() => handleIngredientChange(ing.ingredient_name)}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
    >
     {ing.ingredient_name}
      {selectedIngredients.includes(ing.ingredient_name) && (
        <FaCheck className="text-black" /> 
      )}

    </li>
  ))}
</ul>            
    <button className="rounded-lg px-4 py-2 bg-blue-500 text-blue-100 hover:bg-blue-600 duration-300"
            onClick={handleGetRecipes}>Search for recipe</button>

          </div>
        </div>
        <div className="w-full sm:w-2/3 md:w-3/4 pt-1 px-4 overflow-y-auto">
        <div className="ml-auto ">
        <h3 className="text-xl font-semibold mb-4">Recipes</h3>
        <ul className="font-poppins grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {recipes.map((recipe: Recipe, index: number) => (
                <li
                key={index}
                className={`font-poppins h-full flex flex-col justify-between relative group border rounded-md overflow-hidden p-4 shadow-md hover:shadow-lg transition duration-300 ease-in-out`}>
        <div className="relative z-10">
        <h3 className="text-xl font-semibold mb-2">{recipe.label}</h3>
        <ul>
          {recipe.ingredients.map((ingredient) => (
            <li>- {ingredient}</li>
          ) )}
        </ul>
        <a
          href={recipe.recipe_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-300 hover:underline"
        >
          View Recipe
        </a>
      </div>
      <img
        src={recipe.image}
        alt={`Recipe ${index}`}
        className="w-full h-auto object-cover opacity-75 group-hover:opacity-100 transition-opacity"
      /> 
      {selectedRecipeToSubmit.includes(index) && (
        <FaCheck className="absolute top-2 right-2 text-green-500 text-xl" /> // Checkmark for selected recipes
      )}
               
        <button
                className={`px-2 py-1 text-sm border rounded focus:outline-none focus:ring focus:border-blue-300 transition`}
                onClick={() => handleRecipeSelect(index)}
              >
                {selectedRecipeToSubmit.includes(index) ? "Selected" : "Select"}
              </button>
          </li>
        ))}
        </ul>
        <button className="fixed w-auto bottom-0 right-0 mb-4 ml-4 px-3 py-2 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded focus:outline-none focus:ring focus:border-blue-300 transition"
        onClick={() => handleRecipesSubmit(selectedRecipeToSubmit)}>Save Recipes</button>
    </div>
    </div>
    </div>
    );
}
export default RecipeFind;