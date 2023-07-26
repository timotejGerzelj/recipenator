mod models;
mod lib;
mod schema;
use diesel::prelude::*;
use self::lib::*;
use models::NewRecipe;
fn main() {
    use self::schema::recipes::dsl::*;

    let connection = &mut establish_connection();
    let results = recipes
        .limit(5)
        .select(Recipe::as_select())
        .load(connection)
        .expect("Error loading posts");

    println!("Displaying {} posts", results.len());
    for post in results {
        println!("{}", post.title);
        println!("-----------\n");
        println!("{}", post.body);
    }

}
