CREATE database bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
    item_id INTEGER NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(20) NULL,
    department_name VARCHAR(20) NULL,
    price DECIMAL(4 , 2 ) NULL,
    stock_quantity INT(10) NULL,
    PRIMARY KEY (item_id)
);

SELECT * FROM products;

USE bamazon_DB;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
("Lightbulbs", "Home", 1.85, 420),
("Paper Towels", "Home", 3.95, 562),
("Paper Plates", "Home", 5.95, 235),
("Hand Towels", "Home", 7.00, 562), 
("Plastic Forks", "Home", 3.95, 123), 
("Plastic Spoons", "Home", 3.95, 215),
("Shower Curtain", "Bath", 10.99, 178),
("Paper Bags", "Home", 2.99, 700);
