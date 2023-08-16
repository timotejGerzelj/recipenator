use actix_web::web;
use reqwest;
use std::{env, collections::HashMap};
use crate::{models::models::{Ingredient, Recipe}, db::Database, api::recipe};
extern crate serde_json;
use serde_json::{Value, json};


/* 
fn check_recipe_for_ingredients(recipe_ingredients: Vec<&str>, available_ingredients: &[String]) -> bool {
    for ingredient in recipe_ingredients {
        if !available_ingredients.contains(&cleaned_ingredient.to_string()) {
            return false; 
        }
    }
    return true
}

fn make_ingredient_arr(recipe_ingredients: Value) -> Vec<String> {
    let ingredients: Vec<Value>  = recipe_ingredients.get("ingredients").and_then(|v| v.as_str()).unwrap_or([{}]);
    let ingredient_array: Vec<String>;
    for ingr in ingredients {
        if let Some(ingr_name) = ingr.get("food").and_then(|v| v.as_str()) {

        }
    }

    return ;
}

*/

pub async fn get_recipes(data: String) -> Result<serde_json::Value, reqwest::Error> {
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

pub fn process_edamam_data(db: web::Data<Database>, data: serde_json::Value) -> Result<(), Box<dyn std::error::Error>> {
    let ingredients: Vec<Ingredient> = db.get_ingredients();
    //edamam API accepts arguments for recipes in the form of ingr1,ingr2 so we format the existing ingredients
    let concatenate_names: String = ingredients.iter()
    .map(|ingredient| ingredient.ingredient_name.clone())
    .collect::<Vec<String>>()
    .join(",");
    println!("Concatenated names: {}", concatenate_names);
    let recipe_vec: Vec<Recipe>;
    //we call the API for all the recipes
    let recipes = get_recipes(concatenate_names);
    //let recipes_value = recipes?;
    //let recipe_hits = recipes_value.get("hits").and_then(|v| v.as_array());
    Ok(())
}
