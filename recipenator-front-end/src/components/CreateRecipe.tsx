import React, { ChangeEvent, FormEvent, Fragment, useState } from 'react';
import { useForm, useFieldArray } from "react-hook-form";

type FormValues = {
    recipeName: '',
    recipeDescription: '',
    recipeIngredients: { name: string }[],
  };

const CreateRecipe = () => {
    const onSubmit = (data: any) => console.log(data);
    
    const { register, handleSubmit, control, watch} = useForm<FormValues>();
    const { fields, append } = useFieldArray({
        control,
        name: "recipeIngredients"
      });
      const watchFieldArray = watch("recipeIngredients");
      const controlledFields = fields.map((field, index) => {
        console.log(field);
        console.log(index);
        return {
          ...field,
          ...watchFieldArray[index]
        };
      });



    return <form onSubmit={handleSubmit(onSubmit)}>
        <label>
            Recipe Name:
        </label>
        <input 
            {...register("recipeName")} placeholder='What is the recipe called?'
        />
        <label>
            Description:
        </label>
        <textarea 
            {...register("recipeDescription")}
            placeholder='How can the recipe be made?'
        />
        <label>
            Ingredients:
        </label>

        {controlledFields.map((field, index) => {
          return <input {...register(`recipeIngredients.${index}.name` as const)} />;
        })}

        
        {/* Append button to add new ingredients */}
        <button type="button"
        onClick={() =>
            append({
              name: ""
            })
          }>Append
        </button>
        <button type="submit">Submit Recipe</button>
       </form>    
}

export default CreateRecipe;