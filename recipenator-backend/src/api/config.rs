use actix_web::web;

use crate::api::ingredients::{create_ingredient, get_ingredients};
use crate::api::pantry_ingredients::{get_pantry_ingredients, update_pantry_ingredients, create_pantry_ingredient, delete_pantry_ingredient};


pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/api")
            .service(create_ingredient)
            .service(get_ingredients)
            .service(get_pantry_ingredients)
            .service(update_pantry_ingredients)
            .service(create_pantry_ingredient)
            .service(delete_pantry_ingredient)
);
}