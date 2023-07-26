// @generated automatically by Diesel CLI.

diesel::table! {
    recipes (id) {
        id -> Int4,
        #[max_length = 100]
        name -> Varchar,
        instructions -> Text,
        ingredients -> Text,
    }
}
