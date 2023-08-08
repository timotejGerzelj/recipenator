use crate::schema::{recipes, ingredients};
use actix_web::cookie::time::Date;
use diesel::prelude::*;
use serde::{Serialize, Deserialize};
use chrono::{NaiveDate, format::Numeric}; // for handling dates



#[derive(Queryable, Selectable, Serialize, Deserialize, Debug, Insertable, AsChangeset)]
#[diesel(table_name = recipes)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct Recipe {
    #[serde(default)]
    pub recipe_id: String,
    pub recipe_name: String,
    pub instructions: String,
} 
/* recipe_id VARCHAR(255) PRIMARY KEY,
    recipe_name VARCHAR(100) NOT NULL,
    instructions TEXT NOT NULL,
    ingredients  TEXT NOT NULL,
    category VARCHAR(100) */
    #[derive(Queryable, Selectable, Serialize, Deserialize, Debug, Insertable, AsChangeset)]
    #[diesel(table_name = ingredients)]
    #[diesel(check_for_backend(diesel::pg::Pg))]
    pub struct Ingredient {
        #[serde(default)]
        pub ingredient_id: String,
        pub ingredient_name: String,
        pub quantity: i32,
        pub unit: String,
    } 
/*
CREATE TABLE ingredients (
    ingredient_id VARCHAR(255) PRIMARY KEY,
    ingredient_name VARCHAR(100) NOT NULL,
    quantity NUMERIC NOT NULL,
    unit VARCHAR(50) NOT NULL,
    expiry_date DATE,
    category VARCHAR(100)
);
 */