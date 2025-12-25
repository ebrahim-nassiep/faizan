-- Migration 3: Add Collections System for Kixx Products
-- Similar to Fairtex collections (Muay Thai, Boxing, Training, etc.)

-- Create collections table
CREATE TABLE collections (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  image_url TEXT,
  is_featured BOOLEAN DEFAULT 0,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create collection_products junction table for many-to-many relationship
CREATE TABLE collection_products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  collection_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (collection_id) REFERENCES collections(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  UNIQUE(collection_id, product_id)
);

-- Create indexes for performance
CREATE INDEX idx_collections_slug ON collections(slug);
CREATE INDEX idx_collection_products_collection ON collection_products(collection_id);
CREATE INDEX idx_collection_products_product ON collection_products(product_id);

-- Insert Kixx collections
INSERT INTO collections (name, slug, description, image_url, is_featured, sort_order) VALUES
('Kixx Boxing Collection', 'kixx-boxing', 'Professional boxing gear including gloves, wraps, boots and training equipment', '/images/collections/kixx-boxing.jpg', 1, 1),
('Kixx Muay Thai Collection', 'kixx-muay-thai', 'Traditional and modern Muay Thai equipment including shorts, shin guards, and pads', '/images/collections/kixx-muay-thai.jpg', 1, 2), 
('Kixx Training Collection', 'kixx-training', 'High-performance training gear for all martial arts disciplines', '/images/collections/kixx-training.jpg', 1, 3),
('Kixx Protection Collection', 'kixx-protection', 'Professional protective gear for safe training and competition', '/images/collections/kixx-protection.jpg', 0, 4),
('Kixx MMA Collection', 'kixx-mma', 'Mixed martial arts equipment designed for versatility and performance', '/images/collections/kixx-mma.jpg', 0, 5);