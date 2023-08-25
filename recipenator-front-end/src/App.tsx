
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { StateMachineProvider, createStore } from "little-state-machine";
import Home from './components/Home';
import MealSchedule1 from './components/MealScheduling/MealSchedule1';
import MealScheduleStep2 from './components/MealScheduling/MealScheduleStep2';
import create from 'zustand';
import { Ingredient, SelectedRecipe } from "./types/interfaces";
import RecipeFind from "./components/RecipeFind";
import { getIngredients } from "./services/Ingredients";
import { useEffect } from "react";
import { getRecipes, getSelectedRecipes } from "./services/Recipes";

interface IngredientsState {
  ingredients: Ingredient[],
  setIngredients: (newIngredients: Ingredient[]) => void,
}

interface RecipeState {
  selectedRecipes: SelectedRecipe[],
  setSelectedRecipes: (newRecipes: SelectedRecipe[]) => void,
}

export const useIngredientsStore = create<IngredientsState>()((set) => ({
  ingredients: [],
  setIngredients: (newIngredients: Ingredient[]) => set({ ingredients: newIngredients }),
}));

export const useRecipesStore = create<RecipeState>()((set) => ({
  selectedRecipes: [],
  setSelectedRecipes: (newRecipes: SelectedRecipe[]) => set({selectedRecipes: newRecipes}),
}));

function App() {
//const updateIngredients = useIngredientsStore((state) => state.setIngredients);

const { ingredients ,setIngredients }= useIngredientsStore();
const { selectedRecipes , setSelectedRecipes }= useRecipesStore();

useEffect(() => {
  async function fetchIngredients() {
    try {
      const fetchedIngredients = await getIngredients();
      setIngredients(fetchedIngredients); // Update the global state with fetched ingredients
    } catch (error) {
      console.error('Error fetching ingredients:', error);
    }
  }
  async function fetchRecipes() {
    try {
      const fetchedRecipes = await getSelectedRecipes();
      setSelectedRecipes(fetchedRecipes); // Update the global state with fetched ingredients
    } catch (error) {
      console.error('Error fetching ingredients:', error);
    }
  }

  fetchIngredients();
  fetchRecipes();
}, [setIngredients]); // Make sure to include setIngredients in the dependency array

console.log('what is here? ', ingredients);


return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/schedulemeals/1" element={<MealSchedule1 />} />
      <Route path="/schedulemeals/2" element={<MealScheduleStep2 />} />
      <Route path="/findrecipe" element={<RecipeFind />} />
    </Routes>
  </BrowserRouter>

)
}

export default App
