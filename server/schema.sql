CREATE DATABASE true_friends;

CREATE TABLE IF NOT EXISTS users
(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS friends
(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id),
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50),
    gender VARCHAR(25),
    birthday DATE,
    isMother BOOLEAN DEFAULT false,
    isFather BOOLEAN DEFAULT false 
);

CREATE TABLE IF NOT EXISTS events
(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    friend_id BIGINT NOT NULL REFERENCES friends(id),
    name VARCHAR(50) NOT NULL,
    date DATE NOT NULL,
    notes TEXT
);

CREATE TABLE IF NOT EXISTS items
(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    event_id BIGINT NOT NULL REFERENCES events(id),
    name VARCHAR(50) NOT NULL,
    description TEXT,
    isPurchased BOOLEAN DEFAULT false
);