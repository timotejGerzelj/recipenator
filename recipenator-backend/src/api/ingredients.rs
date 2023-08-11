//Here we will have all the routes needed for the 
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

use serde::{Serialize, Deserialize};
use derive_more::{Display};

use crate::{db::connection::Database, models::recipe::{Ingredient, self}};
#[post("/ingredient")]
pub async fn create_ingredient(db: web::Data<Database>, new_ingredient: web::Json<Ingredient>) -> HttpResponse {
    let ingredient = db.create_ingredient(new_ingredient.into_inner());
    match ingredient {
        Ok(ingredient) => HttpResponse::Ok().json(ingredient),
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }}
#[get("/ingredients")]
pub async fn get_ingredients(db: web::Data<Database>) -> HttpResponse {
    let recipes = db.get_ingredients();
    HttpResponse::Ok().json(recipes)
}

