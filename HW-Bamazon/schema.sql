DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

use bamazon;

create table products(
    item_id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quality INT(10) NOT NULL,
    product_sales DECIMAL(10,2) DEFAULT 0,
    PRIMARY KEY(item_id)
);


CREATE TABLE departments (
	department_id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(50),
    over_head_costs INT DEFAULT 100,
    PRIMARY KEY(department_id)
);