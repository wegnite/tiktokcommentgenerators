const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const svgBuffer = fs.readFileSync(path.join(__dirname, '../public/favicon.svg'));
const publicDir = path.join(__dirname, '../public');

async function generateFavicons() {
  try {
    // Generate favicon.ico (16x16, 32x32, 48x48)
    await sharp(svgBuffer)
      .resize(32, 32)
      .png()
      .toFile(path.join(publicDir, 'favicon-32x32.png'));
    
    await sharp(svgBuffer)
      .resize(16, 16)
      .png()
      .toFile(path.join(publicDir, 'favicon-16x16.png'));
    
    // Generate Apple Touch Icon
    await sharp(svgBuffer)
      .resize(180, 180)
      .png()
      .toFile(path.join(publicDir, 'apple-touch-icon.png'));
    
    // Generate Android Chrome Icons
    await sharp(svgBuffer)
      .resize(192, 192)
      .png()
      .toFile(path.join(publicDir, 'android-chrome-192x192.png'));
    
    await sharp(svgBuffer)
      .resize(512, 512)
      .png()
      .toFile(path.join(publicDir, 'android-chrome-512x512.png'));
    
    // Generate standard favicon.ico (multi-resolution)
    await sharp(svgBuffer)
      .resize(48, 48)
      .png()
      .toFile(path.join(publicDir, 'favicon.ico'));
    
    // Generate mask icon for Safari
    await sharp(svgBuffer)
      .resize(512, 512)
      .png()
      .toFile(path.join(publicDir, 'safari-pinned-tab.svg'));
    
    // Generate MS Tile Icon
    await sharp(svgBuffer)
      .resize(144, 144)
      .png()
      .toFile(path.join(publicDir, 'mstile-144x144.png'));
    
    console.log('✅ All favicon files generated successfully!');
  } catch (error) {
    console.error('Error generating favicons:', error);
  }
}

generateFavicons();