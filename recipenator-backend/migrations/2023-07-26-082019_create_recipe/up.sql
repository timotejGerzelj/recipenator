-- Your SQL goes here
CREATE TABLE recipes (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    instructions TEXT NOT NULL,
    ingredients  TEXT NOT NULL
);