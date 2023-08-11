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

INSERT INTO pantry (pantry_id) VALUES ('e4deaf62-05b0-4ea6-913f-3d8e00938e68');
INSERT INTO ingredient (ingredient_id, ingredient_name, unit) VALUES
    ('2c6a4d38-56f4-441f-baed-8990ce45a6e9', 'Flour', 'grams'),
    ('71d9b855-646c-4cda-bb5e-783369b437b5', 'Sugar', 'grams'),
    ('92025522-125e-4ed5-8ab9-4e168818b7a3', 'Eggs', 'pieces');

INSERT INTO pantry_ingredients_table (pantry_id, ingredient_id, quantity) VALUES
    ('e4deaf62-05b0-4ea6-913f-3d8e00938e68', '2c6a4d38-56f4-441f-baed-8990ce45a6e9', 500),
    ('e4deaf62-05b0-4ea6-913f-3d8e00938e68', '71d9b855-646c-4cda-bb5e-783369b437b5', 300),
    ('e4deaf62-05b0-4ea6-913f-3d8e00938e68', '92025522-125e-4ed5-8ab9-4e168818b7a3', 6);