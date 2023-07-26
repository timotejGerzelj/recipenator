use self::models::{NewRecipe, Recipe};
pub fn handle_recipe() {

}

pub fn create_recipe(conn: &mut PgConnection, name: &str, body: &str, ingredients: Vec<String>) -> NewRecipe {
    use crate::schema::posts;
    
    let new_recipe = NewRecipe {name , body, ingredients.join(" ")};

    diesel::insert_into(recipes::table)
        .values(&new_post)
        .returning(NewRecipe::as_returning())
        .get_result(new_recipe)
        .expect("Error saving new post")
}

pub fn update_recipe(id: i32, name: String, body: String, updated_ingredients: Vec<String>) ->  Recipe{
    let connection = &mut establish_connection();
    let recipe = diesel::update(recipes.find(id))
    .set(published.eq(true))
    .returning(Recipe::as_returning())
    .get_result(connection)
    .unwrap();
    
}

pub fn delete_recipe() {

}


pub fn show_recipe() {

}