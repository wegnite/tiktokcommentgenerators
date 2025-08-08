#!/usr/bin/env python3
import os
from PIL import Image, ImageDraw, ImageFont
import math

def create_favicon_from_design():
    """Create a favicon with TikTok comment generator design"""
    
    # Define sizes for different favicon formats
    sizes = {
        'favicon-16x16.png': (16, 16),
        'favicon-32x32.png': (32, 32),
        'apple-touch-icon.png': (180, 180),
        'android-chrome-192x192.png': (192, 192),
        'android-chrome-512x512.png': (512, 512),
        'mstile-144x144.png': (144, 144),
    }
    
    public_dir = os.path.join(os.path.dirname(__file__), '..', 'public')
    
    for filename, size in sizes.items():
        # Create a new image with gradient background
        img = Image.new('RGBA', size, (0, 0, 0, 0))
        draw = ImageDraw.Draw(img)
        
        # Draw rounded rectangle background with gradient effect
        # Using TikTok-inspired colors
        width, height = size
        
        # Create gradient effect (simplified)
        for y in range(height):
            # Gradient from pink to cyan
            r = int(255 - (255 - 0) * y / height)
            g = int(0 + (242 - 0) * y / height)
            b = int(80 + (234 - 80) * y / height)
            draw.rectangle([0, y, width, y+1], fill=(r, g, b, 255))
        
        # Draw comment bubble
        bubble_margin = width // 8
        bubble_x1 = bubble_margin
        bubble_y1 = bubble_margin
        bubble_x2 = width - bubble_margin
        bubble_y2 = height - bubble_margin * 2
        
        # Draw white comment bubble with rounded corners
        corner_radius = min(width, height) // 8
        draw.rounded_rectangle(
            [bubble_x1, bubble_y1, bubble_x2, bubble_y2],
            radius=corner_radius,
            fill=(255, 255, 255, 240)
        )
        
        # Draw tail for comment bubble (for larger sizes)
        if width >= 32:
            tail_points = [
                (bubble_x1 + width//4, bubble_y2),
                (bubble_x1 + width//6, height - bubble_margin//2),
                (bubble_x1 + width//3, bubble_y2)
            ]
            draw.polygon(tail_points, fill=(255, 255, 255, 240))
        
        # Draw message lines (simplified for small sizes)
        line_height = max(2, height // 20)
        line_spacing = max(1, height // 15)
        line_start_y = bubble_y1 + corner_radius
        line_margin = bubble_margin + corner_radius // 2
        
        # Draw colored lines to represent text
        colors = [(255, 0, 80), (0, 242, 234), (255, 0, 80), (0, 242, 234)]
        line_widths = [0.6, 0.8, 0.5, 0.7]  # Different widths for variety
        
        for i, (color, width_factor) in enumerate(zip(colors, line_widths)):
            if line_start_y + i * line_spacing < bubble_y2 - corner_radius:
                line_width = int((bubble_x2 - line_margin) * width_factor)
                draw.rectangle(
                    [line_margin, 
                     line_start_y + i * line_spacing,
                     line_margin + line_width,
                     line_start_y + i * line_spacing + line_height],
                    fill=color
                )
        
        # Add AI sparkle effect for larger icons
        if width >= 180:
            sparkle_size = width // 20
            sparkle_x = bubble_x2 - sparkle_size * 2
            sparkle_y = bubble_y1 + sparkle_size
            
            # Draw sparkle
            draw.polygon([
                (sparkle_x, sparkle_y - sparkle_size),
                (sparkle_x + sparkle_size//3, sparkle_y - sparkle_size//3),
                (sparkle_x + sparkle_size, sparkle_y),
                (sparkle_x + sparkle_size//3, sparkle_y + sparkle_size//3),
                (sparkle_x, sparkle_y + sparkle_size),
                (sparkle_x - sparkle_size//3, sparkle_y + sparkle_size//3),
                (sparkle_x - sparkle_size, sparkle_y),
                (sparkle_x - sparkle_size//3, sparkle_y - sparkle_size//3),
            ], fill=(255, 215, 0, 220))
        
        # Save the image
        output_path = os.path.join(public_dir, filename)
        img.save(output_path, 'PNG')
        print(f"✅ Generated {filename}")
    
    # Create ICO file with multiple sizes
    ico_sizes = [(16, 16), (32, 32), (48, 48)]
    ico_images = []
    
    for size in ico_sizes:
        img = Image.new('RGBA', size, (0, 0, 0, 0))
        draw = ImageDraw.Draw(img)
        
        width, height = size
        
        # Simplified design for ICO
        for y in range(height):
            r = int(255 - (255 - 0) * y / height)
            g = int(0 + (242 - 0) * y / height)
            b = int(80 + (234 - 80) * y / height)
            draw.rectangle([0, y, width, y+1], fill=(r, g, b, 255))
        
        # Simple comment bubble
        margin = width // 6
        draw.rounded_rectangle(
            [margin, margin, width-margin, height-margin*2],
            radius=width//8,
            fill=(255, 255, 255, 240)
        )
        
        # Simple lines
        line_y = height // 3
        for i in range(2):
            color = (255, 0, 80) if i % 2 == 0 else (0, 242, 234)
            draw.rectangle(
                [margin + width//8, line_y + i * height//6,
                 width - margin - width//8, line_y + i * height//6 + max(1, height//12)],
                fill=color
            )
        
        ico_images.append(img)
    
    # Save as ICO
    ico_path = os.path.join(public_dir, 'favicon.ico')
    ico_images[0].save(ico_path, format='ICO', sizes=[(16, 16), (32, 32), (48, 48)])
    print(f"✅ Generated favicon.ico")
    
    print("\n🎉 All favicon files generated successfully!")

if __name__ == "__main__":
    create_favicon_from_design()