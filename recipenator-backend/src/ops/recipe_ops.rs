use self::models::{NewRecipe};
pub fn handle_recipe() {

}

pub fn create_recipe(conn: &mut PgConnection, title: &str, body: &str) -> NewRecipe {
    use crate::schema::posts;

    let new_post = NewRecipe { title, body };

    diesel::insert_into(recipes::table)
        .values(&new_post)
        .returning(NewRecipe::as_returning())
        .get_result(conn)
        .expect("Error saving new post")
}

pub fn update_recipe() {

}

pub fn delete_recipe() {

}


pub fn show_recipe() {

}