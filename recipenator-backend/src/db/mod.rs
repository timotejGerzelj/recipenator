use std::fmt::Error;
use diesel::prelude::*;
use diesel::r2d2;
use diesel::r2d2::ConnectionManager;



pub type DBPool = r2d2::Pool<ConnectionManager<PgConnection>>;


pub mod database {
    use diesel::{r2d2::{ConnectionManager, self}, PgConnection};
    use dotenvy::dotenv;

    use super::DBPool;


    pub struct Database {
        pub pool: DBPool,
    }

    impl Database {
        pub fn establish_connection() -> Self {
            dotenv().ok();
            let database_url = std::env::var("DATABASE_URL").expect("DATABASE_URL must be set");
            let manager = ConnectionManager::<PgConnection>::new(database_url);
            let pool: DBPool = r2d2::Pool::builder()
                .build(manager)
                .expect("Failed to create pool.");
            Database { pool }
        }
    }
}

pub mod ingredient;
pub mod meal_scheduler;
pub use database::Database;
