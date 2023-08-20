export interface Pantry {
  ingredients: Ingredient[],
  recipePreferences: []
}

export interface Ingredient {
  ingredient_id: string,
  ingredient_name: string,
  quantity: number,
  unit: string
}
export interface newIngredient {
  ingredient_name: string,
  quantity: number,
  unit: string
}


export interface recipePreferences {
  cuisine_type: string[],
  restrictions: string[]
}

export interface Recipe {
  image: string,
  ingredients: string[],
  label: string,
  recipe_url: string
}