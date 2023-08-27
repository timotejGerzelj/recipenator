import React, { useEffect } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogFooter } from './ui/dialog'; // Import Shadcn components
import { useForm } from 'react-hook-form';
import { Ingredient } from '@/types/interfaces';
import { updateIngredient } from '@/services/Ingredients';
import { useIngredientsStore, useRecipesStore } from '@/App';

interface EditIngredientProps {
  ingredient: Ingredient; // Replace with your Ingredient type
  onSave: (data: any) => void;
  onClose: () => void;
  open: boolean;
}


const EditIngredientForm = ({ ingredient, onClose, open }) => {
  const { register, handleSubmit, setValue } = useForm();
  const {ingredients ,setIngredients} = useIngredientsStore();

  useEffect(() => {
    setValue('ingredientName', ingredient.ingredient_name);
    setValue('ingredientAmount', ingredient.quantity);
    setValue('ingredientMeasure', ingredient.unit);
  }, [ingredient, setValue]);
  async function onSave(ing: Ingredient) {
    try {
      let updatedIngr = await updateIngredient(ing);
      const updatedIngredients = ingredients.map((ingredient) =>
      ingredient.ingredient_id === updatedIngr.ingredient_id ? updatedIngr : ingredient
      );
      
      setIngredients(updatedIngredients)
      setValue('ingredientName', "");
      setValue('ingredientAmount', "");
      setValue('ingredientMeasure', "");
      }catch (error) {
      console.error("Error updating ingredient:", error);
}
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
          <form 
            onSubmit={handleSubmit(data => {
                      const updatedIngredient = {
                        ...ingredient,
                        ingredient_name: data.ingredientName,
                        quantity: parseInt(data.ingredientAmount),
                        unit: data.ingredientMeasure,
                      };
                    onSave(updatedIngredient);
                    onClose();
                    })}>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="ingredientName">The name of the ingredient:</label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  {...register("ingredientName")} />
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="ingredientAmount">Ingredient amount:</label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" {...register("ingredientAmount")} />
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="ingredientMeasure">Type of measure:</label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" {...register("ingredientMeasure")} />
                    <input className='px-3 py-1 rounded-full text-sm bg-transparent text-gray-500 hover:underline focus:outline-none' type="submit" />
                    <button className='px-3 py-1 rounded-full text-sm bg-transparent text-gray-500 hover:underline focus:outline-none' type="button" onClick={onClose}>
                      Cancel
                  </button>
                </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditIngredientForm;