//ingredients but for now I will just fill them up with filler ingredients
use actix_web::{
    get, 
    post, 
    put,
    delete,
    error::ResponseError,
    web::Path,
    web::Json,
    web::{Data, self},
    HttpResponse};

use crate::{db::connection::Database, models::recipe::PantryIngredientsTable};

#[post("/pantry/ingredient")]
pub async fn create_pantry_ingredient(db: web::Data<Database>, new_pantry_ingredient: web::Json<PantryIngredientsTable>) -> HttpResponse{
    let pantry_ingr = db.create_pantry_ingredient(new_pantry_ingredient.into_inner());
    match pantry_ingr {
        Ok(todo) => HttpResponse::Ok().json(todo),
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }}

#[get("/pantry/ingredients")]
pub async fn get_pantry_ingredients(db: web::Data<Database>) -> HttpResponse {
    let recipes = db.get_pantry_ingredients();
    HttpResponse::Ok().json(recipes)
}

#[put("/pantry/ingredients")] 
pub async fn update_pantry_ingredients(db: web::Data<Database>, 
    updated_rows: Json<Vec<PantryIngredientsTable>>) -> HttpResponse {
    let updated_count =  db.update_pantry_ingredients(updated_rows.into_inner());
    match updated_count {
        Ok(updated_count) => HttpResponse::Ok().json(updated_count),
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}

#[delete("/pantry/{pantry_id}/{ingredient_id}/ingredient")]
pub async fn delete_pantry_ingredient(db: web::Data<Database>,  pantry_id: web::Path<String>, ingredient_id: web::Path<String>) -> HttpResponse  {
    let pantry_ingredients = db.delete_pantry_ingredient(&pantry_id, &ingredient_id);
    match pantry_ingredients {
        Some(_) => HttpResponse::Ok().finish(),
        None => HttpResponse::NotFound().body("pantry not found"),
    }
}