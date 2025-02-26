-- Изменение типа ID в таблице menu
ALTER TABLE menu ALTER COLUMN id TYPE INTEGER;

ALTER TABLE orders ALTER COLUMN id TYPE INTEGER;

ALTER TABLE orders_archive ALTER COLUMN id TYPE INTEGER;

ALTER TABLE order_items ALTER COLUMN id TYPE INTEGER;

ALTER TABLE order_items ALTER COLUMN menu_item_id TYPE INTEGER;

ALTER TABLE order_items ALTER COLUMN order_id TYPE INTEGER;

ALTER TABLE order_items_archive ALTER COLUMN menu_item_id TYPE INTEGER;

ALTER TABLE order_items_archive ALTER COLUMN order_id TYPE INTEGER;

ALTER TABLE table_payments_archive ALTER COLUMN id TYPE INTEGER;

-- ALTER TABLE menu ADD CONSTRAINT unique_menu_name UNIQUE (name);

DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM migrations WHERE name = '26_02_25b') THEN 
    INSERT INTO migrations (name) VALUES ('26_02_25b'); 
  END IF;
END $$;
