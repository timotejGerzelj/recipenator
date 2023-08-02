mod schema;
mod models;
mod db;
mod api;
use std::io::{stdin, Read};
use api::recipe::{create_recipe, get_recipe, update_recipe, delete_recipe};

use diesel::prelude::*;
//use crate::models::Recipe;
//use crate::ops::recipe_ops::{delete_recipe, update_recipe, create_recipe};
use actix_web::{get, http, web::{self, post}, App, HttpRequest, HttpResponse, HttpServer, Responder, post, dev::Response};
use actix_web::middleware::Logger;
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
    return HttpResponse::NotFound().json( "Resource not found".to_string());
}



#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let recipe_db = db::connection::Database::establish_connection();
    let app_data = web::Data::new(recipe_db);
    HttpServer::new(move ||
        App::new()
            .app_data(app_data.clone())
            .configure(api::recipe::config)
            .service(healthcheck)
            .default_service(web::route().to(not_found))
            .wrap(actix_web::middleware::Logger::default())
    )
    .bind(("127.0.0.1", 8080))?
    .run()
    .await



/* 
    .allowed_origin("http://127.0.0.1:8080/")
    .allowed_origin("http://localhost:5173/")


    let connection = &mut establish_connection();

     let mut recipe_name = String::new();
    let mut recipe_description = String::new();

    println!("What is the recipe_name of the recipe?");
    stdin().read_line(&mut recipe_name).unwrap();
    let recipe_name = recipe_name.trim_end(); // Remove the trailing newline
    println!("Do I get to here?");
    let mut recipe_description = "Put stuff on tacos";
    let mut vec_ingredients = Vec::new();
    vec_ingredients.push("Salsa");
    vec_ingredients.push("Pepper");


    let recipe = create_recipe(connection, recipe_name, &recipe_description, vec_ingredients);
    println!("\nSaved Recipe {}", recipe_name);
    
    /* delete_recipe(4);
   
 */ 

    let ingredient: Vec<String> = vec!["apple".to_string(), "banana".to_string(), "orange".to_string()];

    update_recipe(3, "CChimichongos".to_string(), "CChimichongos are special".to_string(), ingredient);

    let results = recipes
    .limit(5)
    .select(Recipe::as_select())
    .load(connection)
    .expect("Error loading posts");
    println!("Displaying {} recipes", results.len());
    for r in results { 
        println!("{}: {}", r.id, r.name);
        println!("-----------\n");
        println!("instructions: {}", r.instructions);
        println!("ingredients: {}", r.ingredients);
        println!();
    } */
}
