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
    pub fn delete_ingredient(&self, ingredient_id_to_delete: &String) -> Result<bool, Error> {
        use crate::schema::ingredient::dsl::*;

        let num_deleted = diesel::delete(ingredient.find(ingredient_id_to_delete))
        .execute(&mut self.pool.get().unwrap())
        .expect("Error deleting Ingredient");
        println!("{}", num_deleted);
        return Ok(true)
    }
    pub fn update_ingredients(&self, updated_ingredients: Vec<Ingredient>) -> Result<i64, Error> {
        use crate::schema::ingredient::dsl::*;
        let mut updated_count = 0;
        for updated_row in updated_ingredients {
            updated_count += 1;
            let result: Result<usize, Error>  = diesel::update(ingredient.filter(ingredient_id.eq(updated_row.ingredient_id)))
            .set((ingredient_name.eq(updated_row.ingredient_name), unit.eq(updated_row.unit), quantity.eq(updated_row.quantity)))
            .execute(&mut self.pool.get().unwrap());
        }

        return Ok(updated_count);
    }
    pub fn update_ingredient(&self, updated_ingredient: Ingredient) -> Result<Ingredient, Error> {
        use crate::schema::ingredient::dsl::*;
        let update_ingr_id = updated_ingredient.ingredient_id.clone();
        let update_ingr_name = updated_ingredient.ingredient_name.clone();
        let update_ingr_unit = updated_ingredient.unit.clone();
        let update_ingr_quantity = updated_ingredient.quantity.clone();
        diesel::update(ingredient.find(update_ingr_id))
        .set((ingredient_name.eq(update_ingr_name), unit.eq(update_ingr_unit), quantity.eq(update_ingr_quantity)))
        .returning(Ingredient::as_returning())
        .get_result(&mut self.pool.get().unwrap())
        .unwrap();
        return Ok(updated_ingredient);
    }
}
