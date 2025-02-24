-- update description data type 
ALTER TABLE menu ALTER COLUMN description TYPE VARCHAR(500);

-- add TABLE tables 
CREATE TABLE IF NOT EXISTS tables (
id SMALLINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
number SMALLINT UNIQUE NOT NULL CHECK (number > 0),
status VARCHAR(50) NOT NULL DEFAULT 'free',
total_order_price DECIMAL(10,2) DEFAULT 0
);

-- update TABLE orders
ALTER TABLE orders ADD COLUMN IF NOT EXISTS table_id SMALLINT REFERENCES tables(id) ON DELETE SET NULL;
ALTER TABLE orders ALTER COLUMN id TYPE INT;
ALTER TABLE orders ADD CONSTRAINT status_check CHECK (status IN ('pending', 'preparing', 'ready'));

-- update TABLE order_items
ALTER TABLE order_items ALTER COLUMN quantity TYPE SMALLINT;
ALTER TABLE order_items ALTER COLUMN menu_item_id TYPE BIGINT;
ALTER TABLE order_items ADD CONSTRAINT quantity_check CHECK (quantity > 0);

-- update TABLE order_items_archive
ALTER TABLE order_items_archive ALTER COLUMN quantity TYPE SMALLINT;
ALTER TABLE order_items_archive ADD CONSTRAINT quantity_check CHECK (quantity > 0);
ALTER TABLE order_items_archive ALTER COLUMN menu_item_id TYPE BIGINT;