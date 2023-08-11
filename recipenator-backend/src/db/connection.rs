use std::fmt::Error;
use diesel::prelude::*;
use dotenvy::dotenv;
use std::env;
use diesel::r2d2;
use diesel::r2d2::ConnectionManager;
use crate::api::ingredients;
use crate::models::recipe::{Ingredient, PantryIngredientsTable};

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

    pub fn get_pantry_ingredients(&self) -> Vec<PantryIngredientsTable> {
        use crate::schema::pantry_ingredients_table::dsl::*;


        pantry_ingredients_table.load::<PantryIngredientsTable>(&mut self.pool.get().unwrap())
            .expect("Error loading all pantry ingredients")
    }
    pub fn update_pantry_ingredients(&self, updated_pantry_rows: Vec<PantryIngredientsTable>) -> Result<i64, Error>  {
        use crate::schema::pantry_ingredients_table::dsl::*;

        let mut updated_count = 0;

        for updated_row in updated_pantry_rows {
            /* 
            let filter_condition = pantry_ingredients_table
            .filter(pantry_id.eq(&updated_row.pantry_id))
            .filter(ingredient_id.eq(&updated_row.ingredient_id));
            */
            let num_updated = diesel::update(pantry_ingredients_table)
            .set(updated_row)
            .execute(&mut self.pool.get().unwrap());
        }
        return Ok(updated_count);
    }
    
    pub fn create_pantry_ingredient(&self, new_pantry_ingredient: PantryIngredientsTable) -> Result<PantryIngredientsTable, Error> {
        use crate::schema::pantry_ingredients_table::dsl::*;

        let pantry_ingredient = PantryIngredientsTable {
            pantry_id: uuid::Uuid::new_v4().to_string(),
            ..new_pantry_ingredient
        };
        diesel::insert_into(pantry_ingredients_table)
            .values(&pantry_ingredient)
            .execute(&mut self.pool.get().unwrap())
            .expect("Error creating new todo");

        Ok(pantry_ingredient)

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