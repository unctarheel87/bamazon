CREATE DATABASE bamazon;

USE bamazon;

SELECT * from products;

CREATE TABLE products(
	item_id INTEGER(11), 
	product_name VARCHAR(30) NOT NULL,
    department_name VARCHAR(30),
    cost INTEGER(10),
    stock_quantity INTEGER(10),
    PRIMARY KEY (item_id)
);

INSERT INTO products(item_id, product_name, department_name, cost, stock_quantity)
VALUES(3, "The Alchemist", "Books", 20, 30);

UPDATE products
SET stock_quantity = 10
WHERE item_id = 5;
