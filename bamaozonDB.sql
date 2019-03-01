DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NULL,
    department_name VARCHAR(100) NULL,
    price DECIMAL(6,2) NOT NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
    ("PS4", "Electronics", 299.99, 5),
    ("XBOX ONE", "Electronics", 399.99, 10),
    ("Osprey Backpack", "Sporting Goods", 199.99, 2),
    ("Big Agnes Tent", "Sporting Goods", 349.99, 4),
    ("ATCQ T Shirt", "Mens Clothing", 20.00, 10),
    ("Levis Jeans", "Mens Clothing", 59.99, 10),
    ("Fender Jazz Bass", "Musical Instruments", 799.99, 3),
    ("Pearl Drumset", "Muscial Instruments", 1199.99, 5),
    ("Trek Remedy Bike", "Bicycles", 4999.99, 2),
    ("Surly Big Dummy", "Bicycles", 2449.99, 3);

SELECT * FROM products;