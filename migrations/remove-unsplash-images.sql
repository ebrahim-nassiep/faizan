-- Remove all Unsplash image URLs and replace with simple placeholders
-- This removes external dependencies and improves privacy

-- Option 1: Use simple color placeholder service (data URLs)
UPDATE products SET image_url = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"%3E%3Crect width="400" height="400" fill="%23f3f4f6"/%3E%3Ctext x="200" y="200" font-family="Arial" font-size="16" fill="%236b7280" text-anchor="middle" dominant-baseline="middle"%3EProduct Image%3C/text%3E%3C/svg%3E' WHERE image_url LIKE '%unsplash%';

-- Update the images JSON field to remove Unsplash URLs as well
UPDATE products SET images = '["data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"400\" height=\"400\" viewBox=\"0 0 400 400\"%3E%3Crect width=\"400\" height=\"400\" fill=\"%23f3f4f6\"/%3E%3Ctext x=\"200\" y=\"200\" font-family=\"Arial\" font-size=\"16\" fill=\"%236b7280\" text-anchor=\"middle\" dominant-baseline=\"middle\"%3EProduct Image%3C/text%3E%3C/svg%3E"]' WHERE images LIKE '%unsplash%';