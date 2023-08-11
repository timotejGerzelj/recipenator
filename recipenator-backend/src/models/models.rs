use crate::schema::{pantry, ingredient, pantry_ingredients_table};
use actix_web::cookie::time::Date;
use diesel::prelude::*;
use serde::{Serialize, Deserialize};
use chrono::{NaiveDate, format::Numeric}; // for handling dates


#[derive(Queryable, Selectable, Serialize, Deserialize, Debug, Insertable, AsChangeset)]
#[diesel(table_name = pantry)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct Pantry {
    #[serde(default)]
    pub pantry_id: String,
} 


#[derive(Queryable, Selectable, Serialize, Deserialize, Debug, Insertable, AsChangeset)]
#[diesel(table_name = ingredient)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct Ingredient {
    #[serde(default)]
    pub ingredient_id: String,
    pub ingredient_name: String,
    pub unit: String
}

#[derive(Queryable, Selectable, Serialize, Deserialize, Debug, Insertable, AsChangeset)]
#[diesel(table_name = pantry_ingredients_table)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct PantryIngredientsTable {
    pub pantry_id: String,
    pub ingredient_id: String,
    pub quantity: i32

} 