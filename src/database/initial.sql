CREATE DATABASE IF NOT EXISTS hacker_news;
USE hacker_news;

CREATE TABLE IF NOT EXISTS stories (
    id INT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    url VARCHAR(512),
    author VARCHAR(100),
    points INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);