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

use crate::{db::connection::Database, models::recipe::{Recipe, NewRecipe, self}};


#[post("/recipes/create")]
pub async fn create_recipe(db: web::Data<Database>, new_recipe: web::Json<Recipe>) -> impl Responder {
    let recipe = db.create_recipe(new_recipe.into_inner());
    match recipe {
        Ok(todo) => HttpResponse::Ok().json(todo),
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }}
   /*  db: web::Data<Database>, new_todo: web::Json<NewRecipe<'_>>) -> HttpResponse {
    let recipe = db.create_recipe();
    match recipe = {
        Ok(recipe) => HttpResponse::Ok().json(recipe),
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
    
}
*/

#[put("/recipes/{recipe_global_id}/recipe")]
pub async fn update_recipe(task_identifier: Path<i32>) -> impl Responder {
    return Json("Hello Update recipe".to_string());
}

#[delete("/recipes/{recipe_global_id}/recipe")]
pub async fn delete_recipe(db: web::Data<Database>, id: web::Path<String>) -> HttpResponse {
    let recipe = db.delete_recipe(&id);
    match recipe {
        Some(_) => HttpResponse::Ok().finish(),
        None => HttpResponse::NotFound().body("Todo not found"),
    }
}

#[get("/recipes/{recipe_global_id}")]
pub async fn get_recipe(db: web::Data<Database>, id: web::Path<String>) -> impl Responder {
    let recipe = db.get_recipe_by_id(&id);

    match recipe {
        Some(recipe) => HttpResponse::Ok().json(recipe),
        None => HttpResponse::NotFound().body("Recipe not found"),
    }}

pub fn config(cfg: &mut web::ServiceConfig) {
        cfg.service(
            web::scope("/api")
                .service(create_recipe)
                .service(get_recipe)
                .service(update_recipe)
                .service(delete_recipe)
);
}