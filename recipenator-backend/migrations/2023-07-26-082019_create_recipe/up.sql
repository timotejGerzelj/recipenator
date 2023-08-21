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
    ('c9a5d4fe-1c34-4ff2-a9e9-92d067b1e8c1', 'salt', 1, 'teaspoon'),
    ('d621c5e3-499c-4cc3-8b7a-0b7e32828b8b', 'pepper', 0.5, 'teaspoon'),
    ('a78f02de-6c67-48af-a49c-4ff6d7f89e7b', 'onion', 1, 'medium'),
    ('7310f6cf-782b-4e06-9305-68fde84d6e23', 'garlic', 3, 'cloves'),
    ('fe381abb-3840-4a6d-9e06-9eef0c87150e', 'tomatoes', 4, 'medium'),
    ('d3d6c369-0ea1-4476-bcae-efb3e2f329ed', 'bell pepper', 1, 'large'),
    ('6df8dbaa-8d6d-4a6b-a96c-01eac35456fe', 'olive oil', 2, 'tablespoons'),
    ('6a33fe9d-c53e-48d6-8e20-4753d7e1e3ea', 'basil', 1, 'cup'),
    ('5b7c8782-9f92-476b-a825-cf9d1c5f4883', 'mozzarella cheese', 200, 'grams'),
    ('82a687af-5646-4df4-9b69-2a6c5e3f982f', 'parmesan cheese', 50, 'grams');