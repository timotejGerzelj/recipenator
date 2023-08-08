CREATE TABLE recipes (
    recipe_id VARCHAR(255) PRIMARY KEY,
    recipe_name VARCHAR(100) NOT NULL,
    instructions TEXT NOT NULL,
    ingredients  TEXT NOT NULL
);

CREATE TABLE ingredients (
    ingredient_id VARCHAR(255) PRIMARY KEY,
    ingredient_name VARCHAR(100) NOT NULL,
    quantity integer NOT NULL,
    unit VARCHAR(50) NOT NULL
);


CREATE TABLE recipe_ingredients (
    recipe_id VARCHAR(255) PRIMARY KEY REFERENCES recipes(recipe_id),
    ingredient_id VARCHAR(255) REFERENCES ingredients(ingredient_id)
);
 