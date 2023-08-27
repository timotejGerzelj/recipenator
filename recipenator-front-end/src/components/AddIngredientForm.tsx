import { useState, useEffect } from 'react';
import { Ingredient, newIngredient } from '../types/interfaces';
import { useForm } from "react-hook-form";

import { postIngredient, updateIngredient } from '../services/Ingredients';
import { useIngredientsStore } from '../App';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from './ui/dialog';

interface UseFormInputs {
    ingredientName: string,
    ingredientAmount: number,
    ingredientMeasure: string
  }
  


const AddIngredientForm = ({ onClose, open }) => {
    const { register,reset, handleSubmit } = useForm<FormValues>({
        defaultValues: {
            ingredientName: "",
            ingredientAmount: 0,
            ingredientMeasure: ""
        }
    });
    const {ingredients, setIngredients} = useIngredientsStore<UseFormInputs>();


    useEffect(() => {
        setIngredients(ingredients);
      }, [ingredients]);

    async function ingredientAdd(ingrName: string, ingrAmount: number, ingrMeasure: string){
        const newIngredient: newIngredient = {ingredient_name: ingrName, quantity: ingrAmount, unit: ingrMeasure}
        const ingredient = await postIngredient(newIngredient);
        const updatedIngredients = [...ingredients, ingredient];
        setIngredients(updatedIngredients);
        console.log("ingredients: ", ingredients)
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
    }

    return (
                <Dialog>

                <DialogContent>
                  <DialogHeader>
                    <h2 className="text-xl font-semibold mb-2">Add Ingredient</h2>
                  </DialogHeader>
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
                
                    }
                    reset();
                    onClose(); 
                    })}>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="ingredientName">The name of the ingredient:</label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  {...register("ingredientName")} />
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="ingredientAmount">Ingredient amount:</label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" {...register("ingredientAmount")} />
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="ingredientMeasure">Type of measure:</label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" {...register("ingredientMeasure")} />
                    <input className='px-3 py-1 rounded-full text-sm bg-transparent text-gray-500 hover:underline focus:outline-none' type="submit"/>
                    <button className='px-3 py-1 rounded-full text-sm bg-transparent text-gray-500 hover:underline focus:outline-none' type="button" onClick={onClose}>
                      Cancel
                  </button>
                </form>
                </DialogContent>
              </Dialog>

    );
}
export default AddIngredientForm;