mod models;
mod db;
mod schema;
mod ops;
use std::io::{stdin, Read};

use diesel::prelude::*;
use crate::{models::Recipe, ops::recipe_ops::delete_recipe};
use ops::recipe_ops::create_recipe;

use self::db::*;
fn main() {
    use self::schema::recipes::dsl::*;


    let connection = &mut establish_connection();

 /*    let mut recipe_name = String::new();
    let mut recipe_description = String::new();

    println!("What is the recipe_name of the recipe?");
    stdin().read_line(&mut recipe_name).unwrap();
    let recipe_name = recipe_name.trim_end(); // Remove the trailing newline
    println!("Do I get to here?");
    let mut recipe_description = "Put stuff on tacos";
    let mut vec_ingredients = Vec::new();
    vec_ingredients.push("Salsa");
    vec_ingredients.push("Pepper");

    println!("Do I get to here?");

    let recipe = create_recipe(connection, recipe_name, &recipe_description, vec_ingredients);
    println!("\nSaved Recipe {}", recipe_name);
    */
    
    delete_recipe(4);
    let results = recipes
        .limit(5)
        .select(Recipe::as_select())
        .load(connection)
        .expect("Error loading posts");

    println!("Displaying {} recipes", results.len());
    for r in results { 
        println!("{}: {}", r.id, r.name);
        println!("-----------\n");
        println!("instructions: {}", r.instructions);
        println!("ingredients: {}", r.ingredients);
        println!();
    }

}
