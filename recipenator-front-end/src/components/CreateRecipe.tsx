import React, { ChangeEvent, FormEvent, Fragment, useState } from 'react';
import { useForm, useFieldArray } from "react-hook-form";

type FormValues = {
    name: '',
    instructions: '',
    ingredients: { name: string }[],
  };

const CreateRecipe = () => {
    const onSubmit = async (data: FormValues) => {
        console.log("data", data)
        let ingredients = data.ingredients.map((x)=> x.name)
        let dataMod = {
          name: data.name,
          instructions: data.instructions,
          ingredients: ingredients.join(" ")
        }
        console.log("dataMod ", dataMod);

        try {
          // Make the API call to your Rust backend here
          const response = await fetch('http://localhost:8080/api/recipes/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataMod),
          });
    
          if (response.ok) {
            // Handle successful response, e.g., show a success message
            console.log('Form submitted successfully!'); 
          } else {
            // Handle error response, e.g., show an error message
            console.error('Failed to submit form.');
          }
        } catch (error) {
          // Handle network errors or other exceptions
          console.error('An error occurred while submitting the form:', error);
        }
      };
    
    const { register, handleSubmit, control, watch} = useForm<FormValues>();
    const { fields, append } = useFieldArray({
        control,
        name: "ingredients"
      });
      const watchFieldArray = watch("ingredients");
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
            {...register("name")} placeholder='What is the recipe called?'
        />
        <label>
            Description:
        </label>
        <textarea 
            {...register("instructions")}
            placeholder='How can the recipe be made?'
        />
        <label>
            Ingredients:
        </label>

        {controlledFields.map((field, index) => {
          return <input {...register(`ingredients.${index}.name` as const)} />;
        })}

        
        {/* Append button to add new ingredients */}
        <button type="button"
        onClick={() =>
            append({
              name: ""
            })
          }>Add ingredient
        </button>
        <button type="submit">Submit Recipe</button>
       </form>    
}

export default CreateRecipe;