#!/usr/bin/env python3
import json
import os
from datetime import datetime

# Product data based on analyzed catalog images with South African pricing
# Prices include 30% markup from wholesale
catalog_products = [
    {
        "name": "Kixx Professional Boxing Gloves - Premium Leather",
        "slug": "kixx-pro-boxing-gloves-leather",
        "description": "Professional grade leather boxing gloves with superior padding and wrist support. Perfect for training and competition.",
        "base_price": 850.00,  # Wholesale price
        "category": "Boxing Gloves",
        "image_file": "page_003_image_001.jpeg",  # Main product image
        "sizes": ["10oz", "12oz", "14oz", "16oz"],
        "colors": ["Black", "Red", "Blue", "White"],
        "is_featured": True,
        "stock": 30
    },
    {
        "name": "Kixx Training Boxing Gloves - Synthetic",
        "slug": "kixx-training-boxing-gloves-synthetic",
        "description": "Durable synthetic boxing gloves ideal for regular training. Great value with excellent protection.",
        "base_price": 420.00,
        "category": "Boxing Gloves",
        "image_file": "page_004_image_001.jpeg",
        "sizes": ["10oz", "12oz", "14oz", "16oz"],
        "colors": ["Black", "Blue", "Red"],
        "is_featured": False,
        "stock": 45
    },
    {
        "name": "Kixx Heavy Bag - 120lbs Professional",
        "slug": "kixx-heavy-bag-120lbs",
        "description": "Professional quality heavy bag filled with high-density materials. Durable synthetic leather construction.",
        "base_price": 1850.00,
        "category": "Training Gear",
        "image_file": "page_009_image_001.jpeg",
        "sizes": ["120lbs"],
        "colors": ["Black", "Red"],
        "is_featured": True,
        "stock": 12
    },
    {
        "name": "Kixx Speed Bag - Professional Grade",
        "slug": "kixx-speed-bag-professional",
        "description": "High-quality speed bag for improving hand-eye coordination and boxing speed. Durable construction.",
        "base_price": 380.00,
        "category": "Training Gear",
        "image_file": "page_010_image_002.jpeg",
        "sizes": ["Standard"],
        "colors": ["Black", "Red"],
        "is_featured": False,
        "stock": 25
    },
    {
        "name": "Kixx Focus Pads - Curved Design",
        "slug": "kixx-focus-pads-curved",
        "description": "Ergonomically designed focus pads with curved surface for optimal training. High-impact absorption.",
        "base_price": 520.00,
        "category": "Training Gear",
        "image_file": "page_011_image_006.jpeg",
        "sizes": ["Standard"],
        "colors": ["Black", "Red", "Blue"],
        "is_featured": False,
        "stock": 20
    },
    {
        "name": "Kixx Muay Thai Shorts - Traditional",
        "slug": "kixx-muay-thai-shorts-traditional",
        "description": "Authentic Muay Thai shorts with traditional design and lightweight fabric. Perfect for training and competition.",
        "base_price": 280.00,
        "category": "Apparel",
        "image_file": "page_013_image_002.jpeg",
        "sizes": ["S", "M", "L", "XL", "XXL"],
        "colors": ["Red", "Blue", "Black", "White", "Green"],
        "is_featured": True,
        "stock": 50
    },
    {
        "name": "Kixx Boxing T-Shirt - Performance Fabric",
        "slug": "kixx-boxing-tshirt-performance",
        "description": "High-performance training t-shirt with moisture-wicking technology. Comfortable for intense training sessions.",
        "base_price": 180.00,
        "category": "Apparel",
        "image_file": "page_015_image_003.jpeg",
        "sizes": ["S", "M", "L", "XL", "XXL"],
        "colors": ["Black", "White", "Gray", "Blue"],
        "is_featured": False,
        "stock": 60
    },
    {
        "name": "Kixx Headgear - Competition Grade",
        "slug": "kixx-headgear-competition",
        "description": "Professional headgear with excellent protection and visibility. Lightweight design for comfort during sparring.",
        "base_price": 650.00,
        "category": "Protective Gear",
        "image_file": "page_018_image_001.jpeg",
        "sizes": ["S", "M", "L", "XL"],
        "colors": ["Black", "Red", "Blue", "White"],
        "is_featured": False,
        "stock": 18
    },
    {
        "name": "Kixx Shin Guards - Premium Protection",
        "slug": "kixx-shin-guards-premium",
        "description": "High-quality shin guards with superior protection for Muay Thai and kickboxing. Secure strapping system.",
        "base_price": 480.00,
        "category": "Protective Gear",
        "image_file": "page_019_image_002.jpeg",
        "sizes": ["S", "M", "L", "XL"],
        "colors": ["Black", "Blue", "Red"],
        "is_featured": True,
        "stock": 22
    },
    {
        "name": "Kixx Boxing Wraps - Cotton Blend",
        "slug": "kixx-boxing-wraps-cotton",
        "description": "Professional boxing hand wraps made from cotton blend. Essential protection for hands and wrists.",
        "base_price": 85.00,
        "category": "Training Gear",
        "image_file": "page_021_image_003.jpeg",
        "sizes": ["180cm"],
        "colors": ["Black", "Red", "Blue", "White"],
        "is_featured": False,
        "stock": 80
    },
    {
        "name": "Kixx MMA Gloves - Open Finger",
        "slug": "kixx-mma-gloves-open-finger",
        "description": "Professional MMA training gloves with open finger design. Excellent for grappling and striking.",
        "base_price": 420.00,
        "category": "Training Gear",
        "image_file": "page_023_image_001.jpeg",
        "sizes": ["S", "M", "L", "XL"],
        "colors": ["Black", "Red"],
        "is_featured": False,
        "stock": 35
    },
    {
        "name": "Kixx Kick Shield - Heavy Duty",
        "slug": "kixx-kick-shield-heavy-duty",
        "description": "Professional kick shield for training powerful kicks. Reinforced construction with comfortable grip handles.",
        "base_price": 750.00,
        "category": "Training Gear",
        "image_file": "page_024_image_002.jpeg",
        "sizes": ["Standard"],
        "colors": ["Black", "Red"],
        "is_featured": False,
        "stock": 15
    },
    {
        "name": "Kixx Boxing Boots - Professional",
        "slug": "kixx-boxing-boots-professional",
        "description": "Professional boxing boots with ankle support and non-slip sole. Lightweight design for optimal performance.",
        "base_price": 920.00,
        "category": "Apparel",
        "image_file": "page_027_image_005.jpeg",
        "sizes": ["38", "39", "40", "41", "42", "43", "44", "45"],
        "colors": ["Black", "White", "Red"],
        "is_featured": False,
        "stock": 25
    },
    {
        "name": "Kixx Groin Guard - Competition",
        "slug": "kixx-groin-guard-competition",
        "description": "Professional groin protection for sparring and competition. Comfortable fit with secure strapping.",
        "base_price": 320.00,
        "category": "Protective Gear",
        "image_file": "page_030_image_005.jpeg",
        "sizes": ["S", "M", "L", "XL"],
        "colors": ["Black"],
        "is_featured": False,
        "stock": 30
    },
    {
        "name": "Kixx Training Bag Gloves",
        "slug": "kixx-training-bag-gloves",
        "description": "Specialized bag gloves for heavy bag training. Extra padding and wrist support for intense sessions.",
        "base_price": 380.00,
        "category": "Training Gear",
        "image_file": "page_032_image_003.jpeg",
        "sizes": ["S", "M", "L", "XL"],
        "colors": ["Black", "Red"],
        "is_featured": False,
        "stock": 40
    }
]

def calculate_retail_price(base_price, markup_percent=30):
    """Calculate retail price with markup"""
    return round(base_price * (1 + markup_percent / 100), 2)

def generate_sql_for_products():
    """Generate SQL statements to insert products into database"""
    
    # First, let's map category names to category IDs
    category_mapping = {
        "Boxing Gloves": 1,
        "Training Gear": 2,
        "Apparel": 3,
        "Protective Gear": 4
    }
    
    sql_statements = []
    
    for product in catalog_products:
        retail_price = calculate_retail_price(product["base_price"])
        category_id = category_mapping[product["category"]]
        
        # Convert lists to JSON strings
        sizes_json = json.dumps(product["sizes"])
        colors_json = json.dumps(product["colors"])
        images_json = json.dumps([f"./extracted_images/{product['image_file']}"])
        
        # For now, use placeholder image URL (we'll upload later)
        image_url = f"https://via.placeholder.com/400x400?text={product['name'].replace(' ', '+')}"
        
        is_featured = 1 if product["is_featured"] else 0
        
        sql = f"""INSERT INTO products (category_id, name, slug, description, price, image_url, images, sizes, colors, is_featured, stock_quantity) VALUES ({category_id}, '{product['name']}', '{product['slug']}', '{product['description']}', {retail_price}, '{image_url}', '{images_json}', '{sizes_json}', '{colors_json}', {is_featured}, {product['stock']});"""
        
        sql_statements.append(sql)
    
    return sql_statements

def create_product_info_summary():
    """Create a summary of products with pricing info"""
    summary = []
    total_wholesale = 0
    total_retail = 0
    
    print("KIXX FIGHGEAR CATALOG PRODUCTS - PRICING SUMMARY")
    print("=" * 80)
    print(f"{'Product Name':<35} {'Wholesale':<12} {'Retail':<12} {'Markup':<10} {'Category'}")
    print("-" * 80)
    
    for product in catalog_products:
        wholesale = product["base_price"]
        retail = calculate_retail_price(wholesale)
        markup = retail - wholesale
        
        total_wholesale += wholesale
        total_retail += retail
        
        print(f"{product['name'][:34]:<35} R{wholesale:<11.2f} R{retail:<11.2f} R{markup:<9.2f} {product['category']}")
        
        summary.append({
            "name": product["name"],
            "wholesale": wholesale,
            "retail": retail,
            "markup": markup,
            "category": product["category"],
            "image_file": product["image_file"]
        })
    
    print("-" * 80)
    print(f"{'TOTALS':<35} R{total_wholesale:<11.2f} R{total_retail:<11.2f} R{total_retail - total_wholesale:<9.2f}")
    print(f"\nTotal Products: {len(catalog_products)}")
    print(f"Average Markup: 30%")
    print(f"Total Profit Margin: R{total_retail - total_wholesale:.2f}")
    
    return summary

if __name__ == "__main__":
    print("Processing Kixx Fighgear Catalog Products...")
    print(f"Extracted {len([f for f in os.listdir('extracted_images') if f.endswith('.jpeg')])} images from PDF")
    
    # Generate pricing summary
    summary = create_product_info_summary()
    
    # Generate SQL statements
    sql_statements = generate_sql_for_products()
    
    # Write SQL to file
    with open("kixx_products.sql", "w") as f:
        f.write("-- Kixx Fighgear Catalog Products with 30% Markup\n")
        f.write(f"-- Generated on {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n\n")
        
        for sql in sql_statements:
            f.write(sql + "\n")
    
    print(f"\n✅ Generated SQL file: kixx_products.sql")
    print(f"✅ Ready to add {len(catalog_products)} products to database")
    print("\nNext steps:")
    print("1. Upload product images to image hosting service")
    print("2. Update SQL with actual image URLs")
    print("3. Run SQL to populate database")