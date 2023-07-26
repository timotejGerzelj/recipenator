-- Your SQL goes here
CREATE TABLE recipes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    instructions TEXT NOT NULL,
    ingredients  text ARRAY NOT NULL

);