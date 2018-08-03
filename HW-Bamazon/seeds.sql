INSERT INTO products (product_name, department_name, price, stock_quality)
VALUES  ('Car oil', 'Automotive', 8.99, 140),
        ('Side Mirrors', 'Automotive', 45.89, 10),
        ('Chocolate Almonds', 'Candy', 3.29, 70),
        ('Polo Ralph T-shirt', 'Apparel', 35.99, 56),
        ('Hugo Boss Shirt', 'Apparel', 150.00, 10),
        ('Banana Republic Chinos', 'Apparel', 30.00, 76),
        ('Wall Painting', 'Home Decor', 149.99, 33),
        ('Desk', 'Home Decor', 159.99, 10),
        ('Iphone Case', 'Electronics', 5.00, 650),
        ('Contact Solution', 'Daily usage', 13.99, 79);

INSERT INTO departments(department_name, over_head_costs)
VALUES	('Automotive', 200), 
		('Candy', 50), 
		('Apparel', 700), 
        ('Home Decor', 300),
        ('Electronics', 375),
        ('Daily usage', 50)
       
        
        
SELECT * FROM products
