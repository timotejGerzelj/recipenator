use actix_web::web;

use crate::api::ingredients::{create_ingredient, get_ingredients};

use super::ingredients::{delete_ingredient, update_ingredient};


pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/api")
            .service(create_ingredient)
            .service(get_ingredients)
            .service(delete_ingredient)
            .service(update_ingredient)
);
}