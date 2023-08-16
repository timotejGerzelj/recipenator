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
    const { register, handleSubmit } = useForm();
    const { recipes, setRecipes } = useState([]);
    useEffect(() => {
        const allIngredients = ingredientsList.map((ingredient:Ingredient) => ingredient.ingredient_name.toLowerCase() ).join(',');

        async function fetchRecipesWithIngredients(allIngredients: string) {
            try {
                console.log("Hello World");
                const fetchedRecipes = await getRecipes(allIngredients);        
                console.log("My recipes: ", fetchedRecipes);
              }
              catch (error) {
                console.error('Error fetching ingredients:', error);
              }
        }
        fetchRecipesWithIngredients(allIngredients);
    });
    return (
        <Dialog>
        <DialogTrigger>Find a Recipe</DialogTrigger>
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Search for the recipe of your choice</DialogTitle>
                </DialogHeader>
                <form>
                    <div>
                        <label>Dietary Preferences:</label>
                        
                        <input
                            type="checkbox"
                                {...register('vegan')}
                                /> Vegan
                            <input
                                type="checkbox"
                                {...register('vegetarian')}
                                /> Vegetarian
                             <input
                                type="checkbox"
                                {...register('omnivore')}
                                /> Omnivore
                                  <div>
                                <label>Ethnicity:</label>
                                    <select {...register('ethnicity')}>
                                        <option value="">Preference</option>
                                        <option value="indian">Indian</option>
                                        <option value="chinese">Chinese</option>
                                    </select>
                                </div>
                            </div>
                </form>
            </DialogContent>    
        </Dialog>
    );
}
export default RecipeFind;