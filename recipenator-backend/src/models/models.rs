use std::collections::HashMap;

use crate::schema::{pantry, ingredient, meal_schedule};
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
    pub quantity: i32,
    pub unit: String
}
#[derive(Serialize, Deserialize)]
pub struct Recipe {
    pub label: String,
    pub image: String,
    pub recipe_url: String,
    pub ingredients: Vec<String>,
}

#[derive(Queryable, Selectable, Serialize, Deserialize, Debug, Insertable, AsChangeset)]
#[diesel(table_name = meal_schedule)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct MealSchedule {
    pub meal_schedule_id: String,
    pub recipes: String,
}