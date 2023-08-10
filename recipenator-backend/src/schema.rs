// @generated automatically by Diesel CLI.

diesel::table! {
    ingredient (ingredient_id) {
        #[max_length = 255]
        ingredient_id -> Varchar,
        #[max_length = 100]
        ingredient_name -> Varchar,
        #[max_length = 50]
        unit -> Varchar,
    }
}

diesel::table! {
    pantry (pantry_id) {
        #[max_length = 255]
        pantry_id -> Varchar,
    }
}

diesel::table! {
    pantry_ingredients_table (pantry_id, ingredient_id) {
        #[max_length = 255]
        pantry_id -> Varchar,
        #[max_length = 255]
        ingredient_id -> Varchar,
        quantity -> Int4,
    }
}

diesel::joinable!(pantry_ingredients_table -> ingredient (ingredient_id));
diesel::joinable!(pantry_ingredients_table -> pantry (pantry_id));

diesel::allow_tables_to_appear_in_same_query!(
    ingredient,
    pantry,
    pantry_ingredients_table,
);
