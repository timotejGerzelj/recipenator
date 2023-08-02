use serde::Serialize;


use super::recipe::Recipe;


#[derive(Serialize)]
pub struct GenericResponse {
    pub status: String,
    pub message: String,
}

#[derive(Serialize, Debug)]
pub struct RecipeData {
    pub recipe: Recipe,
}

#[derive(Serialize, Debug)]
pub struct SingleRecipeResponse {
    pub status: String,
    pub data: RecipeData,
}

#[derive(Serialize, Debug)]
pub struct RecipeListResponse {
    pub status: String,
    pub results: usize,
    pub recipes: Vec<Recipe>,
}