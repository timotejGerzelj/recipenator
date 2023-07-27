use std::env::args;

use diesel::{PgConnection, SelectableHelper, RunQueryDsl};

use diesel::expression_methods::ExpressionMethods;
use diesel::query_dsl::QueryDsl;


use crate::{models::{NewRecipe, Recipe}, db::establish_connection};
pub fn handle_recipe() {

}

pub fn create_recipe(conn: &mut PgConnection, name: &str ,body: &str, ingredients: Vec<&str>) -> Recipe {
    use crate::schema::recipes;
    let instr = body.to_string();
    let new_recipe = NewRecipe {name, instructions: &instr, ingredients: ingredients.join(" ") };

    diesel::insert_into(recipes::table)
        .values(&new_recipe)
        .returning(Recipe::as_returning())
        .get_result(conn)
        .expect("Error saving new recipe")
}
/*
pub fn update_recipe(id: i32, name: String, body: String, updated_ingredients: Vec<String>) ->  Recipe{
    let connection = &mut establish_connection();
    let recipe = diesel::update(recipes.find(id))
    .set(published.eq(true))
    .returning(Recipe::as_returning())
    .get_result(connection)
    .unwrap();
}
 */


pub fn delete_recipe(recipe_id: i32) {
    use crate::schema::recipes;
    let connection = &mut establish_connection();
    let num_deleted = diesel::delete(recipes::table.find(recipe_id))
    .execute(connection)
    .expect("Error deleting user");
    println!("{}", num_deleted);
}

pub fn get_recipe(recipe_id: i32) {
    use crate::schema::recipes;

    let connection = &mut establish_connection();
    let recipe = recipes::table
        .find(recipe_id)
        .select(Recipe::as_select())
        .first(connection);
    match recipe {
        Ok(recipe) => println!("Recipe with id: {} has name: {}", recipe.id, recipe.name),
        Err(_) => println!("An error occured while fetching recipe {}", recipe_id),
    }
}


pub fn show_recipe() {

}