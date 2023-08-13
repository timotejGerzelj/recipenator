import React, { useState, useEffect } from 'react';
import { Ingredient } from '../types/interfaces';
import useForm  from "react-hook-form";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
  } from "../../@/components/ui/dialog"
import { postIngredient } from '../services/Ingredients';
  


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
        const newIngredient: Ingredient = {ingredient_name: ingrName, quantity: ingrAmount, unit: ingrMeasure}
        const ingredient = await postIngredient(newIngredient);
        setIngredients(oldArray => [...oldArray, ingredient]);
        console.log("ingredients: ", ingredients)
        updatePantryListIngredients([...ingredients, newIngredient]);
    }
    async function handleDelete(id: string) {

    }
    function ingredientUpdate(ingrAmount: number, index: number) {
        const updatedIngredients = [...ingredients];
        updatedIngredients[index].quantity += ingrAmount;
        console.log("Ingredient update", updatedIngredients);
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
            console.log(data, ingredientAlreadyExistsIndex, ingredients)
            if (ingredientAlreadyExistsIndex === -1) {
                ingredientAdd(data.ingredientName,parseInt(data.ingredientAmount), data.ingredientMeasure );
            }
            else {
                console.log(data, ingredientAlreadyExistsIndex, ingredients)
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
        <ul>
        {ingredients.map((ing, index) => (
          <li key={index}>
            {ing.ingredient_name} - {ing.quantity} {ing.unit} <button onClick={() => handleDelete(ing.ingredient_name)}>Delete</button>
          </li>
        ))}
      </ul>
            </DialogContent>    
        </Dialog>
    );
}
export default PantryList;