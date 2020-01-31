CREATE DATABASE recipes_db;

USE recipes_db;

CREATE TABLE recipes (
    id INT AUTO_INCREMENT NOT NULL,
    recipe_name VARCHAR(30),
    cook_time INT,
    public BOOLEAN DEFAULT true,
    flames INT,
    directions VARCHAR,
    PRIMARY KEY(id)
);

CREATE TABLE users ( 
    id INT AUTO_INCREMENT NOT NULL,
    username VARCHAR(200),
    password VARCHAR(200),
    first_name VARCHAR,
    created_at DATETIME,
    PRIMARY KEY(id)
);

CREATE TABLE user_likes (
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (recipe_id) REFERENCES recipes(id)
);

CREATE TABLE ingredients (
    id AUTO_INCREMENT NOT NULL,
    ingredient_name VARCHAR(30),
    FOREIGN KEY(recipe_id) REFERENCES recipes(id),
    PRIMARY KEY(id)
);