import { useEffect, useState } from 'react'
import './App.css'
import PantryList from './components/PantryList';
import { Ingredient, Pantry as PantryType } from './types/interfaces';
import RecipeFind from './components/RecipeFind';

function App() {
  const [pantry, setPantry] = useState<PantryType>({ ingredients: [] });
  const [currentView, setCurrentView] = useState('');
  const updatePantryIngredients = (updatedIngredients: Ingredient[]) => {
    console.log("updated ingredients: ", updatedIngredients)
    setPantry((prevPantry) => ({
      ...prevPantry,
      ingredients: updatedIngredients,
    }));
  };
  const setNewView = (view: string) => {
    setCurrentView(view);
  };
  const renderView = () => {
    switch (currentView) {
      case 'pantryList':
        return <PantryList
        ingredientList={pantry.ingredients}
        updatePantryListIngredients={updatePantryIngredients}
      />
      case 'recipe':
        return <RecipeFind ingredientsList={
          pantry.ingredients
        } />
    }
  }
/*        <button onClick={() => setNewView('pantryList')}>Update Pantry List</button>
        <button onClick={() => setNewView('recipe')}>Find Recipe</button>
        <div>{renderView()}</div>*/
  return (
    <>
        <PantryList
        ingredientList={pantry.ingredients}
        updatePantryListIngredients={updatePantryIngredients}/><br/>
        <RecipeFind ingredientsList={
          pantry.ingredients}/>
      <ul>
        {pantry.ingredients.map((ing, index) => (
          <li key={index}>
            {ing.name} - {ing.quantity} {ing.measure}
          </li>
        ))}
      </ul>
    </>
  );

/*  const [currentView, setCurrentView] = useState('');
  const [data, setData] = useState<Recipe[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:8080/api/recipes');
        const jsonData = await response.json();
        console.log(jsonData);
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);
  const setNewView = (view: string) => {
    setCurrentView(view);
  };

  const renderView = () => {
    switch (currentView) {
      case 'create':
        return <CreateRecipe />
      case 'list':
        return <ListRecipes recipes={data} />
    }
  }

  return (
    <>
      <h1>Behold the Recipenator!</h1>
      <div>
        <button onClick={() => setNewView('create')}>Create Recipe</button>
        <button onClick={() => setNewView('list')}>Get Recipes</button>
      </div>
      <div>{renderView()}</div>
    </>
  )
  */
}

export default App
