use actix_web::{
    get, 
    post, 
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

use crate::{db::Database, models::models::SelectedRecipes};

#[derive(Deserialize)]
struct PathParams {
    recipe_id: String,
}


#[post("/recipes/create")]
pub async fn create_recipes(db: web::Data<Database>, new_recipes: web::Json<Vec<SelectedRecipes>>) -> HttpResponse {
    let recipe = db.create_recipes(new_recipes.into_inner());
    match recipe {
        Ok(r) => HttpResponse::Ok().json(r),
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}

#[delete("/recipes/{recipe_id}")]
pub async fn delete_recipe(db: web::Data<Database>, id: web::Path<PathParams>) -> HttpResponse {
    let recipe = db.delete_recipe(&id.recipe_id);
    match recipe {
        Ok(_) => HttpResponse::Ok().finish(),
        Err(e) => HttpResponse::NotFound().body("pantry ingredient not found"),
    }
}

#[get("/recipes")]
pub async fn get_recipes(db: web::Data<Database>) -> HttpResponse {
    let recipes = db.get_recipes();
    HttpResponse::Ok().json(recipes)
}