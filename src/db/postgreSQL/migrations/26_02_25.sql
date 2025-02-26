ALTER TABLE menu ADD COLUMN IF NOT EXISTS category VARCHAR(50) NOT NULL DEFAULT 'Other';

CREATE TABLE IF NOT EXISTS migrations (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM migrations WHERE name = '26_02_25') THEN

    UPDATE menu SET category = 'Hot Dishes' WHERE id IN (3, 5);
    UPDATE menu SET category = 'Cold Dishes' WHERE id IN (1);
    UPDATE menu SET category = 'Meat Dishes' WHERE id IN (2, 4);
    
    INSERT INTO migrations (name) VALUES ('26_02_25');
  END IF;
END $$;