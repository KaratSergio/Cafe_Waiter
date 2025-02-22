DROP TABLE IF EXISTS order_items_archive, order_items, orders_archive, orders, menu CASCADE;

CREATE TABLE IF NOT EXISTS menu (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    uuid UUID DEFAULT gen_random_uuid() UNIQUE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL
);

CREATE INDEX idx_menu_uuid ON menu USING btree (uuid);

CREATE TABLE IF NOT EXISTS orders (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    uuid UUID DEFAULT gen_random_uuid() UNIQUE,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    total_price DECIMAL(10,2) NOT NULL, 
    status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_orders_uuid ON orders USING btree (uuid);
CREATE INDEX idx_orders_status ON orders USING btree (status);
CREATE INDEX idx_orders_created_at ON orders USING btree (created_at);

CREATE TABLE IF NOT EXISTS order_items (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    order_id INT REFERENCES orders(id) ON DELETE CASCADE,
    menu_item_id INT REFERENCES menu(id) ON DELETE CASCADE,
    quantity INT NOT NULL
);

CREATE INDEX idx_order_items_order_id ON order_items USING btree (order_id);
CREATE INDEX idx_order_items_menu_item_id ON order_items USING btree (menu_item_id);

CREATE TABLE IF NOT EXISTS orders_archive (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    uuid UUID DEFAULT gen_random_uuid() UNIQUE,
    archived_date DATE NOT NULL,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) NOT NULL
);

CREATE INDEX idx_orders_archive_uuid ON orders_archive USING btree (uuid);
CREATE INDEX idx_orders_archive_archived_date ON orders_archive USING btree (archived_date);

CREATE TABLE IF NOT EXISTS order_items_archive (
    order_id INT REFERENCES orders_archive(id) ON DELETE CASCADE,
    menu_item_id INT REFERENCES menu(id),
    quantity INT NOT NULL
);

CREATE INDEX idx_order_items_archive_order_id ON order_items_archive USING btree (order_id);
CREATE INDEX idx_order_items_archive_menu_item_id ON order_items_archive USING btree (menu_item_id);