use actix_web::web;
use reqwest;
use std::{env, collections::HashMap};
use crate::{models::{models::{Ingredient}, recipe_json::{RecipeResponse,RecipeHit,Recipe,Ingredient as IngredientJSON}}};
extern crate serde_json;
use serde_json::{Value, json};

async fn get_recipes(data: String) -> Result<serde_json::Value, reqwest::Error> {
    let app_id = env::var("APP_ID").unwrap_or_default();
    let app_key = env::var("APP_KEY").unwrap_or_default();
    let url = format!(
        "https://api.edamam.com/search?&app_id={}&app_key={}&q={}",
         app_id, app_key, data
    );
    let response = reqwest::get(&url).await?.text().await?;
    let json: serde_json::Value = serde_json::from_str(&response).unwrap();

    Ok(json)
}

fn check_if_ingr_in_arr(ingredients: Vec<String>, ingredient: String) -> bool {
    if ingredients.iter().any(|e| ingredient.contains(e)) {
        true 
    } else {
        false
    }
}

fn destructure_recipe_metadata(recipe: &Value) -> (String, String, String) {
    let mut label = String::new();
    let mut img_url = String::new();
    let mut url = String::new();
    if let Some(recipe_label) = recipe.get("label") {
        label = recipe_label.to_string();
    }
    if let Some(recipe_img_url) = recipe.get("image") {
        img_url = recipe_img_url.to_string();
    }
    if let Some(recipe_url) = recipe.get("url") {
        url = recipe_url.to_string();
    }
    return (label, img_url, url);
}

fn recipe_form_ingredient_array(hit: &Value, existing_ingr: &Vec<String>) -> (String,String,String, bool, Vec<String>) {
    let mut ingredients_vec: Vec<String> = Vec::new(); // Initialize the vector
    if let Some(recipe) = hit.get("recipe") {
        let (label, img_url, url) = destructure_recipe_metadata(recipe);
        if let Some(ingredients) = recipe.get("ingredients") {
            if let Some(ingredient_array) = ingredients.as_array() {
                for ingredient in ingredient_array {
                    if let Some(food) = ingredient.get("food") {
                        if let Some(food_str) = food.as_str() {
                            println!("Food: {}", food_str);
                            if check_if_ingr_in_arr(existing_ingr.to_vec(), food_str.to_owned()) {
                                ingredients_vec.push(food_str.to_owned());
                            } else {
                                return ( String::new(),String::new(),String::new() ,false, Vec::new());
                            }
                        }
                    }
                }
            }
        }
        return (label, img_url, url ,false, ingredients_vec);
    }
    (String::new(),String::new(),String::new(),false, Vec::new())
}









pub async fn process_edamam_data(ingredients: Vec<Ingredient>) -> Result<serde_json::Value, Box<dyn std::error::Error>> {
    let concatenate_names: String = ingredients.iter()
    .map(|ingredient| ingredient.ingredient_name.clone())
    .collect::<Vec<String>>()
    .join(",");
    println!("Concatenated names: {}", concatenate_names);
    let recipes = get_recipes(concatenate_names.clone()).await?;
    let recipe_hits = recipes.get("hits").and_then(|v| v.as_array()).unwrap();
    let ingredients: Vec<String> = concatenate_names.split(',').map(|s| s.to_string()).collect();
    for hit in recipe_hits {
        let (label, img_url, url , is_fit ,ingredients) = recipe_form_ingredient_array(hit, &ingredients);
        
    }

    Ok(recipes)
}
