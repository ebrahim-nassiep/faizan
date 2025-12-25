#!/usr/bin/env python3
import fitz  # PyMuPDF
import os
from PIL import Image
import io

def extract_images_from_pdf(pdf_path, output_dir="catalog2_images"):
    """Extract all images from a PDF file"""
    
    # Create output directory if it doesn't exist
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
    
    # Open the PDF
    doc = fitz.open(pdf_path)
    
    image_count = 0
    page_images = {}
    
    print(f"Processing PDF: {pdf_path}")
    print(f"Total pages: {len(doc)}")
    
    # Iterate through each page
    for page_num in range(len(doc)):
        page = doc[page_num]
        image_list = page.get_images()
        
        print(f"\nPage {page_num + 1}: Found {len(image_list)} images")
        
        page_images[page_num + 1] = []
        
        # Extract each image from the page
        for img_index, img in enumerate(image_list):
            xref = img[0]  # Get the image reference
            
            try:
                # Extract image data
                base_image = doc.extract_image(xref)
                image_bytes = base_image["image"]
                image_ext = base_image["ext"]
                
                # Create filename
                image_filename = f"catalog2_page_{page_num + 1:03d}_image_{img_index + 1:03d}.{image_ext}"
                image_path = os.path.join(output_dir, image_filename)
                
                # Save the image
                with open(image_path, "wb") as image_file:
                    image_file.write(image_bytes)
                
                # Get image dimensions
                try:
                    with Image.open(io.BytesIO(image_bytes)) as pil_img:
                        width, height = pil_img.size
                        print(f"  - {image_filename}: {width}x{height} pixels")
                        
                        page_images[page_num + 1].append({
                            'filename': image_filename,
                            'path': image_path,
                            'width': width,
                            'height': height,
                            'format': image_ext
                        })
                        
                except Exception as e:
                    print(f"  - Could not get dimensions for {image_filename}: {e}")
                    page_images[page_num + 1].append({
                        'filename': image_filename,
                        'path': image_path,
                        'format': image_ext
                    })
                
                image_count += 1
                
            except Exception as e:
                print(f"  - Error extracting image {img_index + 1}: {e}")
    
    doc.close()
    
    print(f"\nExtraction complete!")
    print(f"Total images extracted: {image_count}")
    print(f"Images saved to: {output_dir}")
    
    return page_images, image_count

if __name__ == "__main__":
    pdf_file = "DOC-20250122-WA0014. (1).pdf"
    
    if os.path.exists(pdf_file):
        page_images, total_count = extract_images_from_pdf(pdf_file)
        
        # Print summary
        print("\n" + "="*50)
        print("EXTRACTION SUMMARY")
        print("="*50)
        
        for page_num, images in page_images.items():
            if images:
                print(f"\nPage {page_num}:")
                for img in images:
                    if 'width' in img:
                        print(f"  - {img['filename']}: {img['width']}x{img['height']} ({img['format']})")
                    else:
                        print(f"  - {img['filename']} ({img['format']})")
    else:
        print(f"Error: PDF file '{pdf_file}' not found!")