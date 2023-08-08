export interface Recipe {
    id: string,
    name: string,
    instructions: string,
    ingredients: string,
}

export interface Pantry {
  ingredients: Ingredient[]
}

export interface Ingredient {
  name: string,
  quantity: number,
  measure: string
}