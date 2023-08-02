// @generated automatically by Diesel CLI.

diesel::table! {
    recipes (id) {
        #[max_length = 255]
        id -> Varchar,
        #[max_length = 100]
        name -> Varchar,
        instructions -> Text,
        ingredients -> Text,
    }
}
