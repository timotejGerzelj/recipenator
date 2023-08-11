use diesel::{RunQueryDsl, QueryDsl, ExpressionMethods};
use std::fmt::Error;
use super::Database;
use crate::models::recipe::PantryIngredientsTable;

impl Database {
    pub fn get_pantry_ingredients(&self) -> Vec<PantryIngredientsTable> {
        use crate::schema::pantry_ingredients_table::dsl::*;


        pantry_ingredients_table.load::<PantryIngredientsTable>(&mut self.pool.get().unwrap())
            .expect("Error loading all pantry ingredients")
    }
    pub fn update_pantry_ingredients(&self, updated_pantry_rows: Vec<PantryIngredientsTable>) -> Result<i64, Error>  {
        use crate::schema::pantry_ingredients_table::dsl::*;

        let mut updated_count = 0;

        for updated_row in updated_pantry_rows {
            let _ = diesel::update(pantry_ingredients_table)
            .filter(pantry_id.eq(&updated_row.pantry_id))
            .filter(ingredient_id.eq(&updated_row.ingredient_id))
            .set(quantity.eq(updated_row.quantity))
            .execute(&mut self.pool.get().unwrap());
        }
        return Ok(1);
    }
    
    pub fn create_pantry_ingredient(&self, new_pantry_ingredient: PantryIngredientsTable) -> Result<PantryIngredientsTable, Error> {
        use crate::schema::pantry_ingredients_table::dsl::*;
        diesel::insert_into(pantry_ingredients_table)
            .values(&new_pantry_ingredient)
            .execute(&mut self.pool.get().unwrap())
            .expect("Error creating new todo");
        Ok(new_pantry_ingredient)
    }

    pub fn delete_pantry_ingredient(&self, id_pantry: &str, id_ingredient: &str) -> Option<usize> {
        use crate::schema::pantry_ingredients_table::dsl::*;

        let num_deleted = diesel::delete(pantry_ingredients_table.find((id_pantry,id_ingredient)))
        .execute(&mut self.pool.get().unwrap())
        .expect("Error deleting user");
        println!("{}", num_deleted);
        return Some(num_deleted)
    }

}