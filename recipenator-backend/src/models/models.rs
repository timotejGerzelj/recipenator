use crate::schema::{pantry, ingredient};
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
