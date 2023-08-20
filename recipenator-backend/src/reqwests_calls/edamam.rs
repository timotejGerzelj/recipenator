use actix_web::web;
use reqwest;
use std::{env, collections::HashMap};
use crate::{models::{models::{Ingredient, Recipe}}};
extern crate serde_json;
use serde_json::{Value, json};

async fn get_recipes(data: String) -> Result<serde_json::Value, reqwest::Error> {
    let app_id = env::var("APP_ID").unwrap_or_default();
    let app_key = env::var("APP_KEY").unwrap_or_default();
    let url = format!(
        "https://api.edamam.com/search?&app_id={}&app_key={}&q={}&from=1&to=100&more=true",
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
    let mut strikes = 0;
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
                                strikes += 1;
                                if (strikes > 5){
                                    return ( String::new(),String::new(),String::new() ,false, Vec::new());
                                }
                                else {
                                    ingredients_vec.push(food_str.to_owned());
                                }
                            }
                        }
                    }
                }
            }
        }
        return (label, img_url, url ,true, ingredients_vec);
    }
    (String::new(),String::new(),String::new(),false, Vec::new())
}


pub async fn process_edamam_data(ingredients: &String) -> Result<Vec<Recipe>, Box<dyn std::error::Error>> {
    let recipes = get_recipes(ingredients.clone()).await?;
    let recipe_hits = recipes.get("hits").and_then(|v| v.as_array()).unwrap();
    let ingredients: Vec<String> = ingredients.split(',').map(|s| s.to_string()).collect();
    let mut recipes_to_use: Vec<Recipe> = Vec::new();
    for hit in recipe_hits {
        
        let (label, img_url, url, is_fit, ingredients) = recipe_form_ingredient_array(hit, &ingredients);
        if (is_fit) {
        let new_recipe = Recipe {
            label: label,
            image: img_url,
            recipe_url: url,
            ingredients: ingredients,
        };
        recipes_to_use.push(new_recipe);
    }
    }
    Ok(recipes_to_use)
}
