import React, { useState, useEffect } from 'react';
import UpdateRecipe from './UpdateRecipe';
import { Ingredient, Recipe } from '../types/interfaces';
import { useForm, useFieldArray } from "react-hook-form";

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
    function ingredientAdd(ingrName: string, ingrAmount: number, ingrMeasure: string){
        const newIngredient: Ingredient = {name: ingrName,quantity: ingrAmount,measure: ingrMeasure}
        console.log(newIngredient);
        let ingredientsArr = [...ingredients];
        ingredientsArr.push(newIngredient);
        setIngredients(oldArray => [...oldArray, newIngredient]);
        console.log("ingredients: ", ingredients)
        updatePantryListIngredients([...ingredients, newIngredient]);
    }

    function ingredientUpdate(ingrAmount: number, index: number) {
        const updatedIngredients = [...ingredients];
        updatedIngredients[index].quantity += ingrAmount;
        console.log("Ingredient update", updatedIngredients);
        setIngredients(updatedIngredients);
        updatePantryListIngredients(ingredients);
    }
    return (
    <>
        <h1>PantryList</h1>
        <form 
        onSubmit={handleSubmit(data => {
            const ingredientAlreadyExistsIndex = ingredients.findIndex(
                (ingredient) => ingredient.name === data.ingredientName && ingredient.measure === data.ingredientMeasure
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
        
    </>
    );
}
export default PantryList;