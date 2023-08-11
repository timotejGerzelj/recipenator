use diesel::{RunQueryDsl, r2d2::{self, ConnectionManager}, PgConnection};
use std::fmt::Error;

use super::Database;
use crate::models::recipe::Ingredient;

impl Database {
    pub fn create_ingredient(&self, new_ingredient: Ingredient) -> Result<Ingredient, Error> {
        use crate::schema::ingredient::dsl::*;

        let new_ingredient = Ingredient {
            ingredient_id: uuid::Uuid::new_v4().to_string(),
            ..new_ingredient
        };
        diesel::insert_into(ingredient)
            .values(&new_ingredient)
            .execute(&mut self.pool.get().unwrap())
            .expect("Error creating new todo");

        Ok(new_ingredient)
    }
    pub fn get_ingredients(&self) -> Vec<Ingredient> {
        use crate::schema::ingredient::dsl::*;

        let mut connection: r2d2::PooledConnection<ConnectionManager<PgConnection>> = self.pool.get().expect("Failed to get a connection from the pool");

        ingredient
            .load::<Ingredient>(&mut self.pool.get().unwrap())
            .expect("Error loading all todos")
    }
}
