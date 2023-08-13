// @generated automatically by Diesel CLI.

diesel::table! {
    filler (pantry_id) {
        #[max_length = 255]
        pantry_id -> Varchar,
    }
}

diesel::table! {
    ingredient (ingredient_id) {
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
    pantries (pantry_id) {
        #[max_length = 255]
        pantry_id -> Varchar,
        #[max_length = 255]
        pantry_name -> Varchar,
        ingredients -> Nullable<Jsonb>,
    }
}

diesel::table! {
    pantry (pantry_id) {
        #[max_length = 255]
        pantry_id -> Varchar,
    }
}

diesel::allow_tables_to_appear_in_same_query!(
    filler,
    ingredient,
    pantries,
    pantry,
);
