-- Will create database, use the database, and declare the table in here

CREATE DATABASE connectfour;

USE connectfour;

CREATE TABLE wins (id INT AUTO_INCREMENT, player VARCHAR(30), wins INT, PRIMARY KEY (id));