use actix_web::{
    get,  
    put,
    web::{Data, self},
    HttpResponse,
    http::{header::ContentType, StatusCode}
};
use serde::Deserialize;

use crate::{db::Database, models::models::MealSchedule};

#[derive(Deserialize)]
struct MealScheduleParams {
    meal_schedule_id: String,
}


#[put("/mealschedule/update")]
pub async fn update_meal_schedule_recipe(db: web::Data<Database>, meal_schedule_recipe_update: web::Json<MealSchedule>) -> HttpResponse {
    let update_ingredient = db.update_meal_schedule_recipe(meal_schedule_recipe_update.into_inner());
    match update_ingredient {
        Ok(update_ingredient) => HttpResponse::Ok().json(update_ingredient),
        Err(_) => HttpResponse::InternalServerError().body("Error updating ingredient"),
    }
}

#[get("/mealschedule/{meal_schedule_id}")]
pub async fn get_meal_schedule(db: web::Data<Database>, path_params: web::Path<MealScheduleParams>) -> HttpResponse {
    let id = &path_params.meal_schedule_id;
    let meal_schedule = db.get_meal_schedule(id);
    HttpResponse::Ok().json(meal_schedule)
}
