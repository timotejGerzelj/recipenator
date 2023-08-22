import { useEffect, useState } from 'react'
import PantryList from './components/PantryList';
import { Ingredient, Pantry as PantryType } from './types/interfaces';
import RecipeFind from './components/RecipeFind';
import { deleteIngredient, getIngredients, updateIngredient } from './services/Ingredients';
import { useForm } from 'react-hook-form';
import MealSchedule from './components/MealScheduling/MealSchedule1';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { StateMachineProvider, createStore } from "little-state-machine";
import MealScheduleStep1 from './components/MealScheduling/MealScheduleStep2';
import Home from './components/Home';
import MealSchedule1 from './components/MealScheduling/MealSchedule1';
import MealScheduleStep2 from './components/MealScheduling/MealScheduleStep2';

createStore({
  data: {
    firstName: '',
    lastName: '',
  }
});

function App() {

return (
<StateMachineProvider>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/schedulemeals/1" element={<MealSchedule1 />} />
      <Route path="/schedulemeals/2" element={<MealScheduleStep2 />} />
    </Routes>
  </BrowserRouter>
</StateMachineProvider>

)
}

export default App
