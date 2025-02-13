CREATE TABLE IF NOT EXISTS menu (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL
);

CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    total_price DECIMAL(10,2) NOT NULL, 
    status VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS order_items (
    order_id INT REFERENCES orders(id) ON DELETE CASCADE,
    menu_item_id INT REFERENCES menu(id) ON DELETE CASCADE,
    quantity INT NOT NULL,
    PRIMARY KEY (order_id, menu_item_id)
);

CREATE TABLE IF NOT EXISTS orders_archive (
    id SERIAL PRIMARY KEY, 
    archived_date DATE NOT NULL,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS order_items_archive (
    order_id INT REFERENCES orders_archive(id) ON DELETE CASCADE,
    menu_item_id INT REFERENCES menu(id),
    quantity INT NOT NULL
);
