#!/usr/bin/env python3
import json
import os
from datetime import datetime

# Product data for second catalog based on analyzed images with South African pricing
# Prices include 30% markup from wholesale - different supplier, different price points
catalog2_products = [
    {
        "name": "Professional Leather Boxing Gloves - Competition Grade",
        "slug": "professional-leather-boxing-gloves-competition",
        "description": "Premium competition-grade leather boxing gloves with advanced padding system. AIBA approved for amateur competitions.",
        "base_price": 950.00,  # Higher grade than first catalog
        "category": "Boxing Gloves", 
        "image_file": "catalog2_page_003_image_003.jpeg",
        "sizes": ["10oz", "12oz", "14oz", "16oz"],
        "colors": ["Black", "Red", "Blue"],
        "is_featured": True,
        "stock": 25
    },
    {
        "name": "Sparring Boxing Gloves - Extra Padding",
        "slug": "sparring-boxing-gloves-extra-padding",
        "description": "Extra padded boxing gloves designed for safe sparring sessions. Superior hand protection with ergonomic design.",
        "base_price": 680.00,
        "category": "Boxing Gloves",
        "image_file": "catalog2_page_004_image_002.jpeg",
        "sizes": ["12oz", "14oz", "16oz", "18oz"],
        "colors": ["Black", "White", "Red"],
        "is_featured": False,
        "stock": 35
    },
    {
        "name": "Double End Speed Ball - Professional",
        "slug": "double-end-speed-ball-professional",
        "description": "Professional double-end speed ball for improving accuracy and timing. Adjustable height with quality elastics.",
        "base_price": 320.00,
        "category": "Training Gear",
        "image_file": "catalog2_page_006_image_001.jpeg", 
        "sizes": ["Standard"],
        "colors": ["Black", "Red"],
        "is_featured": False,
        "stock": 20
    },
    {
        "name": "Professional Punching Mitts",
        "slug": "professional-punching-mitts",
        "description": "High-quality punching mitts for trainer-athlete drills. Curved design for optimal impact absorption.",
        "base_price": 580.00,
        "category": "Training Gear",
        "image_file": "catalog2_page_007_image_002.jpeg",
        "sizes": ["Standard"],
        "colors": ["Black", "Red", "Blue"],
        "is_featured": True,
        "stock": 30
    },
    {
        "name": "Muay Thai Heavy Bag - 180cm",
        "slug": "muay-thai-heavy-bag-180cm",
        "description": "Extra-long Muay Thai heavy bag perfect for kick training. Durable synthetic leather with reinforced chains.",
        "base_price": 2200.00,
        "category": "Training Gear", 
        "image_file": "catalog2_page_008_image_001.jpeg",
        "sizes": ["180cm"],
        "colors": ["Black", "Red"],
        "is_featured": True,
        "stock": 8
    },
    {
        "name": "Thai Pads - Curved Design",
        "slug": "thai-pads-curved-design", 
        "description": "Authentic Thai pads with curved design for kick and knee training. Professional grade with secure arm straps.",
        "base_price": 720.00,
        "category": "Training Gear",
        "image_file": "catalog2_page_009_image_003.jpeg",
        "sizes": ["Standard"],
        "colors": ["Black", "Red", "Blue", "Yellow"],
        "is_featured": False,
        "stock": 22
    },
    {
        "name": "Premium Muay Thai Shorts - Satin",
        "slug": "premium-muay-thai-shorts-satin",
        "description": "Premium satin Muay Thai shorts with traditional Thai designs. Lightweight and comfortable for competition.",
        "base_price": 350.00,
        "category": "Apparel",
        "image_file": "catalog2_page_012_image_001.jpeg",
        "sizes": ["S", "M", "L", "XL", "XXL"],
        "colors": ["Red", "Blue", "Black", "White", "Gold", "Green"],
        "is_featured": True,
        "stock": 45
    },
    {
        "name": "Boxing Rash Guard - Long Sleeve", 
        "slug": "boxing-rash-guard-long-sleeve",
        "description": "Compression rash guard for boxing and MMA training. Moisture-wicking fabric with anti-bacterial treatment.",
        "base_price": 280.00,
        "category": "Apparel",
        "image_file": "catalog2_page_014_image_002.jpeg",
        "sizes": ["S", "M", "L", "XL", "XXL"],
        "colors": ["Black", "White", "Blue", "Red"],
        "is_featured": False,
        "stock": 40
    },
    {
        "name": "Training Shorts - Elastic Waistband",
        "slug": "training-shorts-elastic-waistband",
        "description": "Comfortable training shorts with elastic waistband. Perfect for boxing, MMA, and general fitness training.",
        "base_price": 220.00,
        "category": "Apparel",
        "image_file": "catalog2_page_015_image_003.jpeg",
        "sizes": ["S", "M", "L", "XL", "XXL"],
        "colors": ["Black", "Gray", "Navy", "Red"],
        "is_featured": False,
        "stock": 50
    },
    {
        "name": "Full Face Headgear - Competition",
        "slug": "full-face-headgear-competition",
        "description": "Full face protection headgear for amateur boxing competitions. AIBA approved with clear vision design.",
        "base_price": 850.00,
        "category": "Protective Gear",
        "image_file": "catalog2_page_017_image_001.jpeg",
        "sizes": ["S", "M", "L", "XL"],
        "colors": ["Red", "Blue"],
        "is_featured": False,
        "stock": 15
    },
    {
        "name": "Ankle Guards - Muay Thai",
        "slug": "ankle-guards-muay-thai",
        "description": "Professional ankle guards for Muay Thai and kickboxing. Elastic support with reinforced padding.",
        "base_price": 180.00,
        "category": "Protective Gear", 
        "image_file": "catalog2_page_018_image_004.jpeg",
        "sizes": ["S", "M", "L", "XL"],
        "colors": ["Black", "Blue", "White"],
        "is_featured": False,
        "stock": 35
    },
    {
        "name": "Professional Mouthguard - Custom Fit",
        "slug": "professional-mouthguard-custom-fit",
        "description": "Boil-and-bite mouthguard for custom fit protection. Essential safety gear for sparring and competition.",
        "base_price": 95.00,
        "category": "Protective Gear",
        "image_file": "catalog2_page_019_image_002.jpeg", 
        "sizes": ["Junior", "Senior"],
        "colors": ["Clear", "Black", "Red", "Blue"],
        "is_featured": False,
        "stock": 60
    },
    {
        "name": "Knee Pads - Heavy Duty",
        "slug": "knee-pads-heavy-duty",
        "description": "Heavy duty knee pads for floor work and grappling. Durable construction with secure velcro straps.",
        "base_price": 240.00,
        "category": "Protective Gear",
        "image_file": "catalog2_page_020_image_003.jpeg",
        "sizes": ["S", "M", "L", "XL"],
        "colors": ["Black", "Blue"],
        "is_featured": False,
        "stock": 25
    },
    {
        "name": "Skipping Rope - Leather",
        "slug": "skipping-rope-leather",
        "description": "Professional leather skipping rope with wooden handles. Perfect for boxing conditioning and cardio training.",
        "base_price": 120.00,
        "category": "Training Gear",
        "image_file": "catalog2_page_022_image_001.jpeg",
        "sizes": ["3m"],
        "colors": ["Brown"],
        "is_featured": False,
        "stock": 50
    },
    {
        "name": "Training Timer - Digital",
        "slug": "training-timer-digital", 
        "description": "Digital interval timer for boxing and MMA training. Programmable rounds with clear audio signals.",
        "base_price": 380.00,
        "category": "Training Gear",
        "image_file": "catalog2_page_023_image_004.jpeg",
        "sizes": ["Standard"],
        "colors": ["Black"],
        "is_featured": False,
        "stock": 15
    },
    {
        "name": "Hand Wraps - Elastic Cotton",
        "slug": "hand-wraps-elastic-cotton",
        "description": "Premium elastic cotton hand wraps with thumb loop. Essential protection for training and competition.",
        "base_price": 75.00,
        "category": "Training Gear",
        "image_file": "catalog2_page_024_image_003.jpeg",
        "sizes": ["4.5m"],
        "colors": ["Black", "Red", "Blue", "White", "Pink"],
        "is_featured": False,
        "stock": 100
    },
    {
        "name": "Gym Bag - Professional",
        "slug": "gym-bag-professional",
        "description": "Large professional gym bag with multiple compartments. Perfect for carrying all your training equipment.",
        "base_price": 450.00,
        "category": "Apparel",
        "image_file": "catalog2_page_025_image_005.jpeg",
        "sizes": ["Standard"],
        "colors": ["Black", "Red", "Navy"],
        "is_featured": False,
        "stock": 20
    },
    {
        "name": "Water Bottle - Sports",
        "slug": "water-bottle-sports",
        "description": "Professional sports water bottle with measurement markers. BPA-free with easy-squeeze design.",
        "base_price": 85.00,
        "category": "Training Gear",
        "image_file": "catalog2_page_026_image_001.jpeg",
        "sizes": ["750ml"],
        "colors": ["Clear", "Black", "Blue", "Red"],
        "is_featured": False,
        "stock": 40
    }
]

def calculate_retail_price(base_price, markup_percent=30):
    """Calculate retail price with markup"""
    return round(base_price * (1 + markup_percent / 100), 2)

def generate_sql_for_catalog2_products():
    """Generate SQL statements to insert catalog2 products into database"""
    
    # Map category names to category IDs
    category_mapping = {
        "Boxing Gloves": 1,
        "Training Gear": 2, 
        "Apparel": 3,
        "Protective Gear": 4
    }
    
    sql_statements = []
    
    for product in catalog2_products:
        retail_price = calculate_retail_price(product["base_price"])
        category_id = category_mapping[product["category"]]
        
        # Convert lists to JSON strings
        sizes_json = json.dumps(product["sizes"])
        colors_json = json.dumps(product["colors"])
        images_json = json.dumps([f"./catalog2_images/{product['image_file']}"])
        
        # Use different Unsplash images for variety
        if product["category"] == "Boxing Gloves":
            image_url = "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&crop=faces&cs=tinysrgb"
        elif product["category"] == "Training Gear":
            image_url = "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&crop=faces&cs=tinysrgb"
        elif product["category"] == "Apparel":
            image_url = "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&crop=faces&cs=tinysrgb"
        else:  # Protective Gear
            image_url = "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=400&crop=faces&cs=tinysrgb"
        
        is_featured = 1 if product["is_featured"] else 0
        
        sql = f"""INSERT INTO products (category_id, name, slug, description, price, image_url, images, sizes, colors, is_featured, stock_quantity) VALUES ({category_id}, '{product['name']}', '{product['slug']}', '{product['description']}', {retail_price}, '{image_url}', '{images_json}', '{sizes_json}', '{colors_json}', {is_featured}, {product['stock']});"""
        
        sql_statements.append(sql)
    
    return sql_statements

def create_catalog2_summary():
    """Create a summary of catalog2 products with pricing info"""
    total_wholesale = 0
    total_retail = 0
    
    print("SECOND CATALOG PRODUCTS - PRICING SUMMARY")
    print("=" * 80)
    print(f"{'Product Name':<40} {'Wholesale':<12} {'Retail':<12} {'Markup':<10} {'Category'}")
    print("-" * 80)
    
    for product in catalog2_products:
        wholesale = product["base_price"]
        retail = calculate_retail_price(wholesale)
        markup = retail - wholesale
        
        total_wholesale += wholesale
        total_retail += retail
        
        print(f"{product['name'][:39]:<40} R{wholesale:<11.2f} R{retail:<11.2f} R{markup:<9.2f} {product['category']}")
    
    print("-" * 80)
    print(f"{'TOTALS':<40} R{total_wholesale:<11.2f} R{total_retail:<11.2f} R{total_retail - total_wholesale:<9.2f}")
    print(f"\nTotal Catalog2 Products: {len(catalog2_products)}")
    print(f"Average Markup: 30%")
    print(f"Total Catalog2 Profit Margin: R{total_retail - total_wholesale:.2f}")
    
    return {
        "total_products": len(catalog2_products),
        "total_wholesale": total_wholesale,
        "total_retail": total_retail,
        "total_markup": total_retail - total_wholesale
    }

if __name__ == "__main__":
    print("Processing Second Catalog Products...")
    print(f"Extracted {len([f for f in os.listdir('catalog2_images') if f.endswith('.jpeg')])} images from second PDF")
    
    # Generate pricing summary
    summary = create_catalog2_summary()
    
    # Generate SQL statements
    sql_statements = generate_sql_for_catalog2_products()
    
    # Write SQL to file
    with open("catalog2_products.sql", "w") as f:
        f.write("-- Second Catalog Products with 30% Markup\n")
        f.write(f"-- Generated on {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n\n")
        
        for sql in sql_statements:
            f.write(sql + "\n")
    
    print(f"\n✅ Generated SQL file: catalog2_products.sql")
    print(f"✅ Ready to add {len(catalog2_products)} products to database")
    print("\nCOMBINED CATALOG TOTALS:")
    print(f"Combined Products: {15 + len(catalog2_products)} products")
    print(f"Combined Retail Value: R{11030.50 + summary['total_retail']:.2f}")
    print(f"Combined Profit: R{2545.50 + summary['total_markup']:.2f}")