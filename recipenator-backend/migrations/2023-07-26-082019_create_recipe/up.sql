CREATE TABLE pantry (
    pantry_id VARCHAR(255) PRIMARY KEY
);

CREATE TABLE ingredient (
    ingredient_id VARCHAR(255) PRIMARY KEY,
    ingredient_name VARCHAR(100) NOT NULL,
    quantity integer NOT NULL,
    unit VARCHAR(50) NOT NULL
);

INSERT INTO pantry (pantry_id) VALUES ('e4deaf62-05b0-4ea6-913f-3d8e00938e68');
INSERT INTO ingredient (ingredient_id, ingredient_name, quantity, unit) VALUES
    ('2c6a4d38-56f4-441f-baed-8990ce45a6e9', 'Flour', 500, 'grams'),
    ('71d9b855-646c-4cda-bb5e-783369b437b5', 'Sugar', 300, 'grams'),
    ('92025522-125e-4ed5-8ab9-4e168818b7a3', 'Eggs', 4, 'pairs');
