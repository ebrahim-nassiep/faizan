-- Populate Kixx Collections with Products
-- Based on product analysis and Fairtex-style categorization

-- Kixx Boxing Collection (Collection ID: 1)
INSERT INTO collection_products (collection_id, product_id, sort_order) 
SELECT 1, id, 
  CASE name
    WHEN 'Kixx Professional Boxing Gloves - Premium Leather' THEN 1
    WHEN 'Kixx Elite Boxing Gloves - Professional Grade' THEN 2  
    WHEN 'Kixx Training Boxing Gloves - Synthetic' THEN 3
    WHEN 'Kixx Training Bag Gloves' THEN 4
    WHEN 'Kixx Boxing Wraps - Cotton Blend' THEN 5
    WHEN 'Kixx Boxing Boots - Professional' THEN 6
    ELSE 10
  END as sort_order
FROM products 
WHERE name IN (
  'Kixx Professional Boxing Gloves - Premium Leather',
  'Kixx Elite Boxing Gloves - Professional Grade', 
  'Kixx Training Boxing Gloves - Synthetic',
  'Kixx Training Bag Gloves',
  'Kixx Boxing Wraps - Cotton Blend',
  'Kixx Boxing Boots - Professional'
);

-- Kixx Muay Thai Collection (Collection ID: 2)
INSERT INTO collection_products (collection_id, product_id, sort_order)
SELECT 2, id,
  CASE name
    WHEN 'Kixx Muay Thai Shorts - Traditional' THEN 1
    WHEN 'Kixx Shin Guards - Premium Protection' THEN 2
    WHEN 'Kixx Focus Pads - Curved Design' THEN 3
    WHEN 'Kixx Kick Shield - Heavy Duty' THEN 4
    ELSE 10
  END as sort_order
FROM products
WHERE name IN (
  'Kixx Muay Thai Shorts - Traditional',
  'Kixx Shin Guards - Premium Protection', 
  'Kixx Focus Pads - Curved Design',
  'Kixx Kick Shield - Heavy Duty'
);

-- Kixx Training Collection (Collection ID: 3)
INSERT INTO collection_products (collection_id, product_id, sort_order)
SELECT 3, id,
  CASE name
    WHEN 'Kixx Training Shorts - Performance' THEN 1
    WHEN 'Kixx Boxing T-Shirt - Performance Fabric' THEN 2
    WHEN 'Kixx Heavy Bag - 120lbs Professional' THEN 3
    WHEN 'Kixx Heavy Bag - Competition Series' THEN 4
    WHEN 'Kixx Speed Bag - Professional Grade' THEN 5
    ELSE 10
  END as sort_order
FROM products
WHERE name IN (
  'Kixx Training Shorts - Performance',
  'Kixx Boxing T-Shirt - Performance Fabric',
  'Kixx Heavy Bag - 120lbs Professional',
  'Kixx Heavy Bag - Competition Series',
  'Kixx Speed Bag - Professional Grade'
);

-- Kixx Protection Collection (Collection ID: 4) 
INSERT INTO collection_products (collection_id, product_id, sort_order)
SELECT 4, id,
  CASE name
    WHEN 'Kixx Headgear - Competition Grade' THEN 1
    WHEN 'Kixx Groin Guard - Competition' THEN 2
    WHEN 'Kixx Shin Guards - Premium Protection' THEN 3
    ELSE 10
  END as sort_order
FROM products
WHERE name IN (
  'Kixx Headgear - Competition Grade',
  'Kixx Groin Guard - Competition',
  'Kixx Shin Guards - Premium Protection'
);

-- Kixx MMA Collection (Collection ID: 5)
INSERT INTO collection_products (collection_id, product_id, sort_order)
SELECT 5, id,
  CASE name
    WHEN 'Kixx MMA Gloves - Open Finger' THEN 1
    ELSE 10
  END as sort_order
FROM products
WHERE name IN (
  'Kixx MMA Gloves - Open Finger'
);