mod schema;
mod models;
mod db;
mod api;
mod reqwests_calls;


//use crate::models::Recipe;
//use crate::ops::recipe_ops::{delete_recipe, update_recipe, create_recipe};
use actix_web::{get, web::{self, post}, App, HttpResponse, HttpServer};
use actix_cors::Cors;
use serde::Serialize;

 

#[derive(Serialize)]
pub struct GenericResponse {
    pub status: String,
    pub message: String,
}
#[get("/health")]
async fn healthcheck() -> HttpResponse {

    return HttpResponse::Ok().json("Everything is working fine".to_string());
}
async fn not_found() -> HttpResponse {
    return HttpResponse::NotFound().json( "Resource not found for now".to_string());
}



#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let recipe_db = db::database::Database::establish_connection();

    let app_data = web::Data::new(recipe_db);
    
    HttpServer::new(move ||
        App::new()
            .app_data(app_data.clone())
            .configure(api::config::config)
            .service(healthcheck)
            .default_service(web::route().to(not_found))
            .wrap(            
                Cors::permissive()
            )
            .wrap(actix_web::middleware::Logger::default())
    )
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
