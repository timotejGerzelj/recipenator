use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize)]
pub struct Ingredient {
    food: String,
    // Add more fields if needed
}

#[derive(Debug, Deserialize)]
pub struct Recipe {
    ingredients: Vec<Ingredient>,
    // Add more fields if needed
}

#[derive(Debug, Deserialize)]
pub struct RecipeHit {
    recipe: Recipe,
    // Add more fields if needed
}

#[derive(Debug, Deserialize)]
pub struct RecipeResponse {
    hits: Vec<RecipeHit>,
    // Add more fields if needed
}