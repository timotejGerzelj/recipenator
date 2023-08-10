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
    HttpResponse,
    http::{header::ContentType, StatusCode}, Responder, rt::task
};

use crate::{db::connection::Database, models::recipe::{PantryIngredientsTable, self}};
/* 
#[get("/pantry/ingredients")]
pub async fn get_pantry_ingredient(db: web::Data<Database>, pantry_id: String) -> HttpResponse {
    let ingredient = db.create_ingredient(pantry_id.into_inner());
    match ingredient {
        Ok(ingredient) => HttpResponse::Ok().json(ingredient),
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}
*/
#[get("/pantry/ingredients")]
pub async fn get_pantry_ingredients(db: web::Data<Database>, pantry_id: String) -> HttpResponse {
    let recipes = db.get_pantry_ingredients();
    HttpResponse::Ok().json(recipes)
}

#[put("/pantry/ingredients")] 
pub async fn update_pantry_ingredients(db: web::Data<Database>, pantry_id: String, 
    updated_rows: Json<Vec<PantryIngredientsTable>>) -> HttpResponse {
    let updated_count =  db.update_pantry_ingredients(updated_rows.into_inner());
    match updated_count {
        Ok(updated_count) => HttpResponse::Ok().json(updated_count),
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}
