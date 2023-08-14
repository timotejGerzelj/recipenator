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

use crate::{models::models::{Ingredient}, db::Database};

#[derive(Deserialize)]
struct PathParams {
    ingredient_id: String,
}


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

#[delete("/ingredient/{ingredient_id}")]
pub async fn delete_ingredient(db: web::Data<Database>, path_params: web::Path<PathParams>) -> HttpResponse {
    let pantry_ingredients = db.delete_ingredient(&path_params.ingredient_id);
    match pantry_ingredients {
        Ok(_) => HttpResponse::Ok().finish(),
        Err(e) => HttpResponse::NotFound().body("pantry ingredient not found"),
    }
}

#[put("/ingredients")]
pub async fn update_ingredients(db: web::Data<Database>, updated_ingredient: Json<Vec<Ingredient>>) -> HttpResponse {
    let pantry_ingredients = db.update_ingredients(updated_ingredient.into_inner());
    match pantry_ingredients {
        Ok(updated_ingredient) => HttpResponse::Ok().json(updated_ingredient),
        Err(_) => HttpResponse::InternalServerError().body("Error updating ingredients"),
    }
}

#[put("/ingredient")]
pub async fn update_ingredient(db: web::Data<Database>, update_ingredient: web::Json<Ingredient>) -> HttpResponse {
    let update_ingredient = db.update_ingredient(update_ingredient.into_inner());
    match update_ingredient {
        Ok(update_ingredient) => HttpResponse::Ok().json(update_ingredient),
        Err(_) => HttpResponse::InternalServerError().body("Error updating ingredient"),
    }
}