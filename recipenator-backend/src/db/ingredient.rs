use diesel::{RunQueryDsl, r2d2::{self, ConnectionManager}, PgConnection, QueryDsl, ExpressionMethods, SelectableHelper};
use super::Database;
use crate::models::models::Ingredient;
use diesel::result::Error;

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
        ingredient
            .load::<Ingredient>(&mut self.pool.get().unwrap())
            .expect("Error loading all todos")
    }
    pub fn delete_ingredient(&self, ingredient_id: &String) -> Option<usize> {
        use crate::schema::ingredient::dsl::*;

        let num_deleted = diesel::delete(ingredient.find(ingredient_id))
        .execute(&mut self.pool.get().unwrap())
        .expect("Error deleting Ingredient");
        println!("{}", num_deleted);
        return Some(num_deleted)
    }
    pub fn update_ingredient(&self, updated_ingredient: Ingredient) -> Result<String, Error> {
        use crate::schema::ingredient::dsl::*;

        let result: Result<usize, Error>  = diesel::update(ingredient.filter(ingredient_id.eq(updated_ingredient.ingredient_id)))
        .set((ingredient_name.eq(updated_ingredient.ingredient_name), unit.eq(updated_ingredient.unit)))
        .execute(&mut self.pool.get().unwrap());
        let success_message = format!("Updated ingredient");

        match result {
            Ok(_) => Ok(success_message),
            Err(err) => Err(err),
        }
    }
}
