CREATE OR REPLACE FUNCTION generate_order_number() RETURNS text AS $$
DECLARE
  order_count INTEGER;
  order_number VARCHAR(20);
BEGIN
  SELECT COUNT(*) + 1 INTO order_count
  FROM orders
  WHERE created_at::date = CURRENT_DATE;

  order_number := TO_CHAR(CURRENT_DATE, 'YYYYMMDD') || '-' || order_count;

  RETURN order_number;
END;
$$ LANGUAGE plpgsql;

DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM migrations WHERE name = '26_02_25a') THEN
    INSERT INTO migrations (name) VALUES ('26_02_25a');
  END IF;
END $$;
