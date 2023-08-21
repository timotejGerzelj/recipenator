use std::fmt::Error;

use diesel::{RunQueryDsl, r2d2::{self, ConnectionManager}, PgConnection, QueryDsl, ExpressionMethods, SelectableHelper};

use crate::models::models::MealSchedule;

use super::Database;

impl Database {
    pub fn get_meal_schedule(&self, meal_schedule_id: &String) -> Option<MealSchedule> {
        use crate::schema::meal_schedule::dsl::*;

        let meal_sch = meal_schedule
            .find(meal_schedule_id)
            .get_result::<MealSchedule>(&mut self.pool.get().unwrap())
            .expect("Error loading todo by id");
        Some(meal_sch)
    }

    pub fn update_meal_schedule_recipe(&self, meal_schedule_updates: MealSchedule) -> Result<MealSchedule, Error> {
        use crate::schema::meal_schedule::dsl::*;
        let update_meal_schedule_id = meal_schedule_updates.meal_schedule_id.clone();
        let update_meal_schedule_recipes = meal_schedule_updates.recipes.clone();

        diesel::update(meal_schedule.find(update_meal_schedule_id))
        .set((recipes.eq(update_meal_schedule_recipes)))
        .returning(MealSchedule::as_returning())
        .get_result(&mut self.pool.get().unwrap())
        .unwrap();
        return Ok(meal_schedule_updates);
    }

}