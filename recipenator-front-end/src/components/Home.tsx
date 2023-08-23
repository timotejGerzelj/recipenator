import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Ingredient } from "../types/interfaces";
import PantryList from "./PantryList";
import RecipeFind from "./RecipeFind";
import { deleteIngredient, getIngredients, updateIngredient } from "../services/Ingredients";
import { useNavigate } from "react-router-dom";
import { useIngredientsStore } from "../App";

function Home() {
    const { register, reset, getValues } = useForm();
    const [editingIngredientId, setEditingIngredientId] = useState<string>("");
    const [currentView, setCurrentView] = useState('');
    const navigate = useNavigate();
    const {ingredients ,setIngredients} = useIngredientsStore();
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
      <div className="container mx-auto">
            <div className="flex flex-row flex-wrap py-4">
        <div className="w-full sm:w-1/3 md:w-1/4 px-2" >
            <div className="sticky top-0 p-4 w-full">
            <ul className="flex flex-col overflow-hidden">
                {ingredients.map((ing, index) => (
            <li className="flex flex-col overflow-hidden border p-4" key={index}>
              {editingIngredientId === ing.ingredient_id ? (
                <>
                  <label className="block mb-2 font-medium text-gray-800" htmlFor="updateIngredientName">The name of the ingredient:</label>
                  <input className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
                   type="text" defaultValue={ing.ingredient_name}  {...register("updateIngredientName")} />
                  <label className="block mb-2 font-medium text-gray-800" htmlFor="updateIngredientAmount">Ingredient amount:</label>
                  <input className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
                   type="number" defaultValue={ing.quantity} {...register("updateIngredientAmount")} />
                  <label className="block mb-2 font-medium text-gray-800" htmlFor="updateIngredientUnit">Type of measure:</label>
                  <input className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
                   type="text" defaultValue={ing.unit}
                   {...register("updateIngredientUnit")} />
                <button className='px-3 py-1 rounded-full text-sm bg-transparent text-gray-500 hover:underline focus:outline-none' onClick={() => handleUpdate(ing)}>Save</button>
                <button className='px-3 py-1 rounded-full text-sm bg-transparent text-gray-500 hover:underline focus:outline-none' onClick={() => {
                toggleEditMode("");
              }}>Cancel</button>
            </>
              ) : (
                <>
                  {ing.ingredient_name} - {ing.quantity} {ing.unit} <button className='px-3 py-1 rounded-full text-sm bg-transparent text-gray-500 hover:underline focus:outline-none' onClick={() => handleDelete(ing.ingredient_id)}>Delete</button>
                  <button className='px-3 py-1 rounded-full text-sm bg-transparent text-gray-500 hover:underline focus:outline-none' onClick={() => {
                    reset();
                    toggleEditMode(ing.ingredient_id)}}>Update</button>
                </>
              ) }
            </li>
          ))}
                  <button className="mt-auto px-2 py-1 text-sm bg-transparent border border-black-500 text-black-500 hover:bg-gray-100 hover:border-gray-600 focus:outline-none focus:ring focus:border-gray-300"
           onClick={() => setNewView('addIngredient')}>Add Ingredient</button>
        </ul>
        </div>
       </div>
        <div className="w-full sm:w-2/3 md:w-3/4 pt-1 px-2">{renderView()}
        <button className='px-2 py-1 rounded-full text-sm bg-transparent border border-black-500 text-black-500 hover:bg-gray-100 hover:border-gray-600 focus:outline-none focus:ring focus:border-gray-300'
           onClick={() => navigate('/findrecipe')}>Find Recipe</button>
        <button className='px-2 py-1 rounded-full text-sm bg-transparent border border-black-500 text-black-500 hover:bg-gray-100 hover:border-gray-600 focus:outline-none focus:ring focus:border-gray-300'
            onClick={() => navigate('/schedulemeals/1')}>Schedule Meal</button>
        </div>
        </div>
      </div>    
        
    );
  }
  
  export default Home;
  