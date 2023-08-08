// @generated automatically by Diesel CLI.

diesel::table! {
    ingredients (ingredient_id) {
        #[max_length = 255]
        ingredient_id -> Varchar,
        #[max_length = 100]
        ingredient_name -> Varchar,
        quantity -> Int4,
        #[max_length = 50]
        unit -> Varchar,
    }
}

diesel::table! {
    recipes (recipe_id) {
        #[max_length = 255]
        recipe_id -> Varchar,
        #[max_length = 100]
        recipe_name -> Varchar,
        instructions -> Text,
        ingredients -> Text,
    }
}

diesel::allow_tables_to_appear_in_same_query!(
    ingredients,
    recipes,
);
