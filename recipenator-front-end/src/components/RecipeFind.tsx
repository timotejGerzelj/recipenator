import { useForm } from "react-hook-form";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "../../@/components/ui/dialog"
import { useEffect, useState } from "react";
import { Ingredient } from "../types/interfaces";
import { getRecipes } from "../services/Recipes";
  

const RecipeFind = ({ingredientsList}) => {
    const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
//    const { recipes, setRecipes } = useState([]);
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
        getRecipes(formatRequestParam);
    }

    return (
        <Dialog>
        <DialogTrigger>Find a Recipe</DialogTrigger>
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Search for the recipe of your choice</DialogTitle>
                </DialogHeader>
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
      <h3>Selected Ingredients:</h3>
      <ul>
        {selectedIngredients.map((ingredient: string, index: number) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
    </div>
    <button onClick={handleGetRecipes}>Search for recipe</button>
            </DialogContent>    
        </Dialog>
    );
}
export default RecipeFind;