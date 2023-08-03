use std::fmt::Error;
use diesel::prelude::*;
use dotenvy::dotenv;
use std::env;
use diesel::r2d2;
use diesel::r2d2::ConnectionManager;

use crate::api::recipe;
use crate::models::recipe::{Recipe, NewRecipe};
use crate::schema::recipes::dsl::*;





pub type DBPool = r2d2::Pool<ConnectionManager<PgConnection>>;

pub struct Database {
    pool: DBPool,
}

impl Database {

    pub fn establish_connection() -> Self {
        dotenv().ok();
        let database_url = std::env::var("DATABASE_URL").expect("DATABASE_URL must be set");
        let manager = ConnectionManager::<PgConnection>::new(database_url);
        let pool: DBPool = r2d2::Pool::builder()
            .build(manager)
            .expect("Failed to create pool.");
        Database { pool }
    }

    pub fn create_recipe<'a>(&self, recipe: Recipe) -> Result<Recipe, Error> {
        let recipe = Recipe {
            id: uuid::Uuid::new_v4().to_string(),
            ..recipe
        };
        diesel::insert_into(recipes)
            .values(&recipe)
            .execute(&mut self.pool.get().unwrap())
            .expect("Error creating new todo");

        Ok(recipe)
    }
    pub fn get_recipe_by_id(&self, recipe_id: &str) -> Option<Recipe> {
        let recipe = recipes
        .find(recipe_id)
        .get_result::<Recipe>(&mut self.pool.get().unwrap())
        .expect("Error loading recipe by id");

       return Some(recipe);
    }
    pub fn delete_recipe(&self, recipe_id: &str) -> Option<usize> {
        use crate::schema::recipes;
        let num_deleted = diesel::delete(recipes.find(recipe_id))
        .execute(&mut self.pool.get().unwrap())
        .expect("Error deleting user");
        println!("{}", num_deleted);
        return Some(num_deleted)

    }

    pub fn update_recipe(&self, recipe_id: &str, updated_recipe: Recipe) -> Option<Recipe> {
        let num_updated = diesel::update(recipes.find(recipe_id))
            .set(updated_recipe)
            .get_result::<Recipe>(&mut self.pool.get().unwrap())
            .expect("Error updating recipe");
        return Some(num_updated);
    }

    pub fn get_recipes(&self) -> Vec<Recipe> {
        recipes
            .load::<Recipe>(&mut self.pool.get().unwrap())
            .expect("Error loading all todos")
    }
}