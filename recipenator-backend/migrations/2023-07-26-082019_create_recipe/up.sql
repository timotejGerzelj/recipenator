CREATE TABLE pantry (
    pantry_id VARCHAR(255) PRIMARY KEY
);

CREATE TABLE ingredient (
    ingredient_id VARCHAR(255) PRIMARY KEY,
    ingredient_name VARCHAR(100) NOT NULL,
    unit VARCHAR(50) NOT NULL
);

CREATE TABLE pantry_ingredients_table (
    pantry_id VARCHAR(255) REFERENCES pantry(pantry_id),
    ingredient_id VARCHAR(255) NOT NULL REFERENCES ingredient(ingredient_id),
    quantity integer NOT NULL,
    PRIMARY KEY (pantry_id, ingredient_id)

);

