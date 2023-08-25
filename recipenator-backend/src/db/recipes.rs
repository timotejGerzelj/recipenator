
use diesel::RunQueryDsl;

use crate::models::models::SelectedRecipes;

use super::Database;
use diesel::{r2d2::{self, ConnectionManager}, PgConnection, QueryDsl, ExpressionMethods, SelectableHelper};
use diesel::result::Error;


impl Database {
    pub fn get_recipes(&self) -> Vec<SelectedRecipes> {
        use crate::schema::recipe::dsl::*;
        recipe
            .load::<SelectedRecipes>(&mut self.pool.get().unwrap())
            .expect("Error loading all todos")
    }

    pub fn delete_recipe(&self, recipe_id_to_delete: &String) -> Result<bool, Error> {
        use crate::schema::recipe::dsl::*;

        let num_deleted = diesel::delete(recipe.find(recipe_id_to_delete))
        .execute(&mut self.pool.get().unwrap())
        .expect("Error deleting Ingredient");
        println!("{}", num_deleted);
        return Ok(true)
    }

    pub fn create_recipe(&self, new_recipe: SelectedRecipes) -> Result<SelectedRecipes, Error> {
        use crate::schema::recipe::dsl::*;

        let new_ingredient = SelectedRecipes {
            recipe_id: uuid::Uuid::new_v4().to_string(),
            ..new_recipe
        };
        diesel::insert_into(recipe)
            .values(&new_ingredient)
            .execute(&mut self.pool.get().unwrap())
            .expect("Error creating new todo");

        Ok(new_ingredient)
        
    }
    pub fn create_recipes(&self, created_recipes: Vec<SelectedRecipes>) -> Result<Vec<SelectedRecipes>, Error> {
        for my_struct in &created_recipes { 
            println!("{}" ,my_struct.label);
        }
        use crate::schema::recipe::dsl::*;
        let mut recipes_vec: Vec<SelectedRecipes> = Vec::new();
        for new_recipe in created_recipes {
            let new_id_recipe = SelectedRecipes {
                recipe_id: uuid::Uuid::new_v4().to_string(),
                ..new_recipe
            };
            diesel::insert_into(recipe)
            .values(&new_id_recipe)
            .execute(&mut self.pool.get().unwrap())
            .expect("Error creating new todo");
            recipes_vec.push(new_id_recipe)
        }

        return Ok(recipes_vec);
    }


}