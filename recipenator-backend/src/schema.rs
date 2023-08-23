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
    meal_schedule (meal_schedule_id) {
        #[max_length = 255]
        meal_schedule_id -> Varchar,
        recipes -> Text,
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

diesel::table! {
    recipe (recipe_id) {
        #[max_length = 255]
        recipe_id -> Varchar,
        #[max_length = 255]
        recipe_image -> Varchar,
        #[max_length = 255]
        recipe_ingredients -> Varchar,
        #[max_length = 40]
        label -> Varchar,
        #[max_length = 255]
        recipe_url -> Varchar,
    }
}

diesel::allow_tables_to_appear_in_same_query!(
    filler,
    ingredient,
    meal_schedule,
    pantries,
    pantry,
    recipe,
);
