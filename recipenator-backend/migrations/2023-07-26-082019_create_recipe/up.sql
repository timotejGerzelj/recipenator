CREATE TABLE pantry (
    pantry_id VARCHAR(255) PRIMARY KEY
);

CREATE TABLE ingredient (
    ingredient_id VARCHAR(255) PRIMARY KEY,
    ingredient_name VARCHAR(100) NOT NULL,
    quantity integer NOT NULL,
    unit VARCHAR(50) NOT NULL
);

CREATE TABLE meal_schedule (
    meal_schedule_id VARCHAR(255) PRIMARY KEY,
    recipes TEXT NOT NULL
);

CREATE TABLE recipe (
    recipe_id VARCHAR(255) PRIMARY KEY,
    recipe_image TEXT NOT NULL,
    recipe_ingredients VARCHAR(255) NOT NULL,
    label VARCHAR(100) NOT NULL,
    recipe_url VARCHAR(255) NOT NULL
);

INSERT INTO pantry (pantry_id) VALUES ('e4deaf62-05b0-4ea6-913f-3d8e00938e68');
INSERT INTO ingredient (ingredient_id, ingredient_name, quantity, unit) VALUES
    ('2c6a4d38-56f4-441f-baed-8990ce45a6e9', 'flour', 500, 'grams'),
    ('71d9b855-646c-4cda-bb5e-783369b437b5', 'sugar', 300, 'grams'),
    ('92025522-125e-4ed5-8ab9-4e168818b7a3', 'eggs', 4, 'pairs'),
    ('3e8c289a-344f-4f07-920a-2459e4d4cfc1', 'butter', 200, 'grams'),
    ('b18d76a5-4ef6-43c3-b83b-2a1a29ad1f50', 'chocolate chips', 150, 'grams'),
    ('e051b117-49a9-4f0d-8fe0-42ebfeae052e', 'vanilla extract', 1, 'teaspoon'),
    ('3e2b3f5e-62eb-4c2e-82a5-743ac2df6bb5', 'flour', 250, 'milliliters'),
    ('6bf6df2a-511a-4642-bcc6-09f00523ef68', 'baking powder', 2, 'teaspoons'),
    ('6df8dbaa-8d6d-4a6b-a96c-01eac35456fe', 'olive oil', 2, 'tablespoons'),
    ('5b7c8782-9f92-476b-a825-cf9d1c5f4883', 'mozzarella cheese', 200, 'grams'),
    ('82a687af-5646-4df4-9b69-2a6c5e3f982f', 'parmesan cheese', 50, 'grams'),
    ('d8cf8b64-9fe9-4f81-8b2e-02cebb51c7b1', 'chicken breast', 500, 'grams'),
    ('56ad472c-9f23-446a-99ac-9f8cc9e2a82e', 'ground beef', 400, 'grams'),
    ('a84091b1-4502-4682-91c4-c0ef4c63d8ca', 'onion', 2, 'medium'),
    ('e634a7b2-ff59-45f1-9a58-ae891129d0f5', 'bell pepper', 2, 'large'),
    ('3a325609-e8f9-4b32-b17d-ec2776ed02b1', 'tomatoes', 4, 'medium'),
    ('c8b19fa6-8746-4c64-8f5a-1448bba31a33', 'lettuce', 1, 'head'),
    ('d6473493-1ab0-4c1d-80d7-12e2c2389815', 'cucumber', 1, 'large'),
    ('852acff2-423c-4b14-b259-65ca68615a18', 'carrot', 3, 'medium'),
    ('ec4c9e7a-9e62-4b87-9e53-43b456f107e9', 'olive oil', 3, 'tablespoons'),
    ('d194b9d2-1223-4abf-9e14-ef7c8eb6f0d1', 'lime juice', 2, 'tablespoons'),
    ('8a2f60ea-51b0-42bb-90ac-2a4ce6be578c', 'cilantro', 1, 'bunch'),
    ('a84da4f1-572e-45f2-89c2-8a42d6f527c3', 'sour cream', 150, 'grams'),
    ('fc65b546-0795-4f3d-85ab-e12b9962e74b', 'cheddar cheese', 150, 'grams'),
    ('fc65b546-0795-4f3d-85ab-e12b9962a74w', 'pasta', 150, 'grams');

