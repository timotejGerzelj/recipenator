import { useEffect, useState } from 'react'
import './App.css'
import PantryList from './components/PantryList';
import { Ingredient, Pantry as PantryType } from './types/interfaces';
import RecipeFind from './components/RecipeFind';
import { deleteIngredient, getIngredients, updateIngredient } from './services/Ingredients';
import { useForm } from 'react-hook-form';

function App() {
  const { register, reset, getValues } = useForm();
  const [pantry, setPantry] = useState<PantryType>({ ingredients: [] });
  const [currentView, setCurrentView] = useState('');
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [editingIngredientId, setEditingIngredientId] = useState<string>("");


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
    <>
        <PantryList
        ingredientList={ingredients}
        updatePantryListIngredients={updatePantryIngredients}/><br/>
        <RecipeFind ingredientsList={ingredients}/>
      <ul>
        {ingredients.map((ing, index) => (
          <li key={index}>
            {editingIngredientId === ing.ingredient_id ? (
              <>
                <label htmlFor="updateIngredientName">The name of the ingredient:</label>
                <input type="text"
                  defaultValue={ing.ingredient_name}  {...register("updateIngredientName")} />
                <label htmlFor="updateIngredientAmount">Ingredient amount:</label>
                <input type="number"
                  defaultValue={ing.quantity}
                  {...register("updateIngredientAmount")} />
                <label htmlFor="updateIngredientUnit">Type of measure:</label>
                <input type="text" 
                  defaultValue={ing.unit}
                 {...register("updateIngredientUnit")} />
              <button onClick={() => handleUpdate(ing)}>Save</button>
              <button onClick={() => {
              toggleEditMode("");
            }}>Cancel</button>
          </>
            ) : (
              <>
                {ing.ingredient_name} - {ing.quantity} {ing.unit} <button onClick={() => handleDelete(ing.ingredient_id)}>Delete</button>
                <button onClick={() => {
                  reset();
                  toggleEditMode(ing.ingredient_id)}}>Update</button>
              </>
            ) }

          </li>
        ))}
      </ul>
    </>
  );
}

export default App
