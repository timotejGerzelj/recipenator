import React, { useState, useEffect } from 'react';
import { Ingredient, newIngredient } from '../types/interfaces';
import { useForm } from "react-hook-form";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
  } from "../../@/components/ui/dialog"
import { deleteIngredient, postIngredient, updateIngredient } from '../services/Ingredients';
  


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
        <Dialog>
        <DialogTrigger>Update pantry</DialogTrigger>
        <DialogContent>
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
            <label htmlFor="ingredientName">The name of the ingredient:</label>
            <input  {...register("ingredientName")} />
            <label htmlFor="ingredientAmount">Ingredient amount:</label>
            <input {...register("ingredientAmount")} />
            <label htmlFor="ingredientMeasure">Type of measure:</label>
            <input {...register("ingredientMeasure")} />
            <input type="submit" />
        </form>
            </DialogContent>    
        </Dialog>
    );
}
export default PantryList;