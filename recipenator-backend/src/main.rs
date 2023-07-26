mod models;
mod lib;
mod schema;
use diesel::prelude::*;
use crate::models::Recipe;

use self::lib::*;
fn main() {
    use self::schema::recipes::dsl::*;

    let connection = &mut establish_connection();
    let results = recipes
        .limit(5)
        .select(Recipe::as_select())
        .load(connection)
        .expect("Error loading posts");

    println!("Displaying {} recipes", results.len());
    for r in results {
        println!("{}", r.name);
        println!("-----------\n");
        println!("{}", r.instructions);
        //let stuff_str: String = r.ingredients.into_iter().map(|i| i.to_string()).collect::<String>();
    }

}
