use crate::schema::recipes;
use diesel::prelude::*;
use serde::{Serialize, Deserialize};


#[derive(Insertable)]
#[diesel(table_name = recipes)]
pub struct NewRecipe<'a> {
    pub name: &'a str,
    pub instructions: &'a String,
    pub ingredients: String,
}

#[derive(Queryable, Selectable, Serialize, Deserialize, Debug)]
#[diesel(table_name = recipes)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct Recipe {
    pub id: i32,
    pub name: String,
    pub instructions: String,
    pub ingredients: String,
} 
