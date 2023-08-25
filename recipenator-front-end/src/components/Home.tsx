import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Ingredient, SelectedRecipe } from "../types/interfaces";
import PantryList from "./PantryList";
import RecipeFind from "./RecipeFind";
import { deleteIngredient, getIngredients, updateIngredient } from "../services/Ingredients";
import { useNavigate } from "react-router-dom";
import { useIngredientsStore, useRecipesStore } from "../App";

function Home() {
    const { register, reset, getValues } = useForm();
    const [editingIngredientId, setEditingIngredientId] = useState<string>("");
    const [currentView, setCurrentView] = useState('');
    const navigate = useNavigate();
    const {ingredients ,setIngredients} = useIngredientsStore();
    const {selectedRecipes, setSelectedRecipes} = useRecipesStore();
    const setNewView = (view: string) => {
      setCurrentView(view);
    };
  
    const renderView = () => {
      switch (currentView) {
        case 'addIngredient':
          return <PantryList/>
        case 'findRecipe':
          return <RecipeFind/>
      }
    }
      useEffect(() => {
      async function loadIngredients() {
        try {
          const fetchedIngredients = await getIngredients();
          setIngredients(fetchedIngredients); 
        }
        catch (error) {
          console.error('Error fetching ingredients:', error);
        }
      }
      loadIngredients();
    }, []);
    async function handleDelete(id: string) {
      console.log(id);
      try {
          await deleteIngredient(id);
          const newIngredients = ingredients.filter((ingredient) => ingredient.ingredient_id !== id );
          setIngredients(newIngredients);
      }
      catch (error) {
          console.error("Error deleting ingredient:", error);
      }}
      const toggleEditMode = (ingredientId: string) => {
        setEditingIngredientId(ingredientId);
      };
      async function handleUpdate(ing: Ingredient) {
        const id = ing.ingredient_id
        const valuesToUpdate = getValues();
        const ingredientName = valuesToUpdate.updateIngredientName;
        const ingredientAmount = parseInt(valuesToUpdate.updateIngredientAmount);
        const ingredientUnit = valuesToUpdate.updateIngredientUnit;      
        const updateIngr: Ingredient = {
          ingredient_id: id,
          ingredient_name: ingredientName,
          quantity: ingredientAmount,
          unit: ingredientUnit
        }
        try {
          let updatedIngr = await updateIngredient(updateIngr);
          const updatedIngredients = ingredients.map((ingredient) =>
          ingredient.ingredient_id === updatedIngr.ingredient_id ? updatedIngr : ingredient
          );
          setIngredients(updatedIngredients)
          setEditingIngredientId("");
        }catch (error) {
          console.error("Error updating ingredient:", error);
    }}
    return (
      <div className="container h-screen mx-auto bg-gray-100 p-4 font-sans bg-gray-100">
      <div className="flex flex-row">
        <div className="w-full sm:w-1/3 md:w-1/4 px-4 h-screen overflow-y-auto bg-white shadow">
          <div className="sticky top-0 p-4">
            <h3 className="text-xl font-semibold mb-4">Ingredients</h3>
            <ul className="flex flex-col space-y-2">
              {ingredients.map((ing, index) => (
                <li
                  key={index}
                  className="p-2 border border-gray-300 rounded hover:bg-gray-100 transition"
                >
                  {ing.ingredient_name}
                </li>
              ))}
            </ul>
            <button
              className="rounded-lg px-4 py-2 bg-blue-500 text-blue-100 hover:bg-blue-600 duration-300"
              onClick={() => setNewView('addIngredient')}
            >
              Add Ingredient
            </button>
          </div>
        </div>

        <div className="w-full sm:w-2/3 md:w-3/4 pt-1 px-4">
        <div className="ml-auto">
        <h3>Recipes</h3>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
  {selectedRecipes.map((recipe: SelectedRecipe, index: number) => (
    <div
      key={index}
      className="relative rounded-lg  group rounded-md border-4 border-gray-950 border p-4 overflow-hidden font-poppins h-full flex flex-col justify-between"
    >
      <div className="relative z-10">
        <h3 className="text-xl font-semibold mb-2">{recipe.label}</h3>
        <ul>
          {recipe.recipe_ingredients.split(',').map((ingredient) => (
            <li>{ingredient}</li>
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
        src={recipe.recipe_image}
        alt={`Recipe ${index}`}
        className="w-full h-auto object-cover opacity-75 group-hover:opacity-100 transition-opacity"
      />
    </div>
  ))}
</div>
    </div>
    <button
            className="fixed bottom-4 right-4  rounded-lg px-4 py-2 bg-blue-500 text-blue-100 hover:bg-blue-600 duration-300"
            onClick={() => navigate('/findrecipe')}>
            Find Recipe
          </button>        
      </div>
    </div>
  </div>    
        
    );
  }
  
  export default Home;
  