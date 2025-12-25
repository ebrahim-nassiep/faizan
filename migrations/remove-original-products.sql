-- Remove original sample products (IDs 1-8)
-- These were the initial seed products before adding catalog products

DELETE FROM products WHERE id IN (1, 2, 3, 4, 5, 6, 7, 8);