import { useState, useEffect } from 'react';
import { Ingredient, newIngredient } from '../types/interfaces';
import { useForm } from "react-hook-form";

import { postIngredient, updateIngredient } from '../services/Ingredients';
  


interface PantryListProps {
    ingredientList: Ingredient[];
    updatePantryListIngredients: (updatedIngredients: Ingredient[]) => void;
}
  

const PantryList = ({ingredientList, updatePantryListIngredients}) => {
    const { register, handleSubmit } = useForm();
    const [ ingredients, setIngredients ] = useState<Ingredient[]>([]);



    useEffect(() => {
        setIngredients(ingredientList);
      }, [ingredientList]);

    async function ingredientAdd(ingrName: string, ingrAmount: number, ingrMeasure: string){
        const newIngredient: newIngredient = {ingredient_name: ingrName, quantity: ingrAmount, unit: ingrMeasure}
        const ingredient = await postIngredient(newIngredient);
        setIngredients(oldArray => [...oldArray, ingredient]);
        console.log("ingredients: ", ingredients)
        updatePantryListIngredients([...ingredients, newIngredient]);
    }
    function ingredientUpdate(ingrAmount: number, index: number) {
        const updatedIngredients = [...ingredients];
        updatedIngredients[index].quantity += ingrAmount;
        const updateIngr: Ingredient = {
            ingredient_id: updatedIngredients[index].ingredient_id,
            ingredient_name: updatedIngredients[index].ingredient_name,
            quantity: updatedIngredients[index].quantity,
            unit: updatedIngredients[index].unit
          }
        updateIngredient(updateIngr);
        setIngredients(updatedIngredients);
        updatePantryListIngredients(ingredients);
    }

    return (
                <form 
                    onSubmit={handleSubmit(data => {
                    const ingredientAlreadyExistsIndex = ingredients.findIndex(
                        (ingredient) => ingredient.ingredient_name === data.ingredientName
                    );
                    if (ingredientAlreadyExistsIndex === -1) {
                        ingredientAdd(data.ingredientName,parseInt(data.ingredientAmount), data.ingredientMeasure );
                    }
                    else {
                        ingredientUpdate(parseInt(data.ingredientAmount), ingredientAlreadyExistsIndex);
                    }})}>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="ingredientName">The name of the ingredient:</label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  {...register("ingredientName")} />
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="ingredientAmount">Ingredient amount:</label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" {...register("ingredientAmount")} />
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="ingredientMeasure">Type of measure:</label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" {...register("ingredientMeasure")} />
                    <input className='px-3 py-1 rounded-full text-sm bg-transparent text-gray-500 hover:underline focus:outline-none' type="submit" />
                </form>

    );
}
export default PantryList;