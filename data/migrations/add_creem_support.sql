-- Add Creem payment gateway support to orders table
ALTER TABLE orders ADD COLUMN IF NOT EXISTS payment_gateway VARCHAR(50) DEFAULT 'stripe';
ALTER TABLE orders ADD COLUMN IF NOT EXISTS creem_payment_id VARCHAR(255);
ALTER TABLE orders ADD COLUMN IF NOT EXISTS creem_customer_id VARCHAR(255);

-- Add indexes for Creem lookups
CREATE INDEX IF NOT EXISTS idx_orders_creem_payment_id ON orders(creem_payment_id);
CREATE INDEX IF NOT EXISTS idx_orders_payment_gateway ON orders(payment_gateway);