import { useEffect, useState } from 'react'
import PantryList from './components/PantryList';
import { Ingredient, Pantry as PantryType } from './types/interfaces';
import RecipeFind from './components/RecipeFind';
import { deleteIngredient, getIngredients, updateIngredient } from './services/Ingredients';
import { useForm } from 'react-hook-form';
import { getRecipes } from './services/Recipes';

function App() {
  const { register, reset, getValues } = useForm();
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [editingIngredientId, setEditingIngredientId] = useState<string>("");
  const [currentView, setCurrentView] = useState('');
  const setNewView = (view: string) => {
    setCurrentView(view);
  };

  const renderView = () => {
    switch (currentView) {
      case 'addIngredient':
        return <PantryList
        ingredientList={ingredients}
        updatePantryListIngredients={updatePantryIngredients}/>
      case 'findRecipe':
        return <RecipeFind ingredientsList={ingredients}/>
    }
  }

  const updatePantryIngredients = (updatedIngredients: Ingredient[]) => {
    console.log("updated ingredients: ", updatedIngredients)
    setIngredients(updatedIngredients);
  };
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
        setIngredients((prevIngredients) =>
        prevIngredients.filter((ingredient) => ingredient.ingredient_id !== id)
      );
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
        console.log("ingredient after update ", ing);
        const updatedIngredients = ingredients.map((ingredient) =>
        ingredient.ingredient_id === updatedIngr.ingredient_id ? updatedIngr : ingredient
        );
        setIngredients(updatedIngredients)
        setEditingIngredientId("");
      }catch (error) {
        console.error("Error updating ingredient:", error);
  }}
  return (
    <div className="flex">
      <div>
      <div className="w-1/2 p-4">
        <button className='px-2 py-1 rounded-full text-sm bg-transparent border border-black-500 text-black-500 hover:bg-gray-100 hover:border-gray-600 focus:outline-none focus:ring focus:border-gray-300'
         onClick={() => setNewView('addIngredient')}>Add Ingredient</button>
        <button className='px-2 py-1 rounded-full text-sm bg-transparent border border-black-500 text-black-500 hover:bg-gray-100 hover:border-gray-600 focus:outline-none focus:ring focus:border-gray-300'
         onClick={() => setNewView('findRecipe')}>Find Recipe</button>
      </div>
      <ul>
        {ingredients.map((ing, index) => (
          <li key={index}>
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
      </ul>
      </div>

      <div className="w-2/3 p-4 ml-auto">{renderView()}</div>
    </div>
  );
}

export default App
