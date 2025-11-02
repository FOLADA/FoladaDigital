import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Image optimization configuration
const CONFIG = {
  // Quality settings for WebP conversion
  webpQuality: 85,
  
  // Resize dimensions for different image types
  images: {
    // Main images
    '30moneybackguaranteed.png': { width: 510, height: 382 },
    'background.png': { width: 1920, height: 1080 }, // Full width background
    'xalxi.png': { width: 384, height: 68 },
    
    // Service icons (displayed at 72x72, so 2x for retina)
    'PaidAds.png': { width: 144, height: 144 },
    'SMMservice.png': { width: 144, height: 144 },
    'AIintegrationservice.png': { width: 144, height: 144 },
    'webdevelopmentservice.png': { width: 144, height: 144 },
    'GraphicDesign.png': { width: 144, height: 144 },
    'SEOService.png': { width: 144, height: 144 },
    
    // Profile image
    'SabaFoladashvili.jpg': { width: 640, height: 640 },
    
    // Logo
    'logo.png': { width: 432, height: 160 }
  },
  
  // Company logos (displayed at 90x90, so 2x for retina)
  companyLogos: {
    'AscendGlobal.png': { width: 180, height: 180 },
    'CosmosVentures.png': { width: 180, height: 180 },
    'EnergoSunGeorgia.png': { width: 180, height: 180 },
    'Random.png': { width: 180, height: 180 },
    'Thecrafthouse.png': { width: 180, height: 180 },
    'Weihenstephan.PNG': { width: 180, height: 180 },
    'meorerandom.png': { width: 180, height: 180 },
    'shushabandi.PNG': { width: 180, height: 180 },
    'tergi.png': { width: 180, height: 180 }
  },
  
  // Badge images (displayed at 66x128, so 2x for retina)
  badges: {
    'baadgewingleft.png': { width: 132, height: 256 },
    'baadgewingright.png': { width: 132, height: 256 }
  }
};

// Function to get file size in KB
function getFileSizeKB(bytes) {
  return (bytes / 1024).toFixed(2);
}

// Function to optimize a single image
async function optimizeImage(inputPath, outputPath, dimensions) {
  try {
    // Get original file size
    const originalStats = await fs.stat(inputPath);
    const originalSize = originalStats.size;
    
    // Optimize and convert to WebP
    await sharp(inputPath)
      .resize(dimensions.width, dimensions.height, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({ quality: CONFIG.webpQuality })
      .toFile(outputPath);
    
    // Get new file size
    const newStats = await fs.stat(outputPath);
    const newSize = newStats.size;
    
    // Calculate savings
    const savings = originalSize - newSize;
    const savingsPercent = ((savings / originalSize) * 100).toFixed(2);
    
    console.log(`✓ Optimized: ${path.basename(inputPath)}`);
    console.log(`  Original: ${getFileSizeKB(originalSize)} KB -> WebP: ${getFileSizeKB(newSize)} KB`);
    console.log(`  Savings: ${getFileSizeKB(savings)} KB (${savingsPercent}%)`);
    console.log('');
    
    return {
      fileName: path.basename(inputPath),
      originalSize,
      newSize,
      savings,
      savingsPercent
    };
  } catch (error) {
    console.error(`✗ Error optimizing ${path.basename(inputPath)}: ${error.message}`);
    return null;
  }
}

// Function to process images in a directory
async function processDirectory(dirPath, imageConfig, report) {
  try {
    const files = await fs.readdir(dirPath);
    
    for (const file of files) {
      const filePath = path.join(dirPath, file);
      
      // Check if this file needs optimization
      if (imageConfig[file]) {
        const dimensions = imageConfig[file];
        const webpPath = filePath.replace(/\.(png|jpg|jpeg)$/i, '.webp');
        
        const result = await optimizeImage(filePath, webpPath, dimensions);
        if (result) {
          report.push(result);
        }
      }
    }
  } catch (error) {
    console.error(`Error processing directory ${dirPath}: ${error.message}`);
  }
}

// Main optimization function
async function optimizeAllImages() {
  console.log('Starting image optimization...\n');
  
  // Create report array
  const report = [];
  
  // Process main public directory images
  const publicDir = path.join(__dirname, '..', 'public');
  await processDirectory(publicDir, CONFIG.images, report);
  
  // Process company logos
  const companiesDir = path.join(publicDir, 'companies');
  try {
    await fs.access(companiesDir);
    await processDirectory(companiesDir, CONFIG.companyLogos, report);
  } catch (error) {
    console.log('Companies directory not found, skipping...');
  }
  
  // Process badges
  const badgesDir = path.join(publicDir, 'Badge');
  try {
    await fs.access(badgesDir);
    await processDirectory(badgesDir, CONFIG.badges, report);
  } catch (error) {
    console.log('Badge directory not found, skipping...');
  }
  
  // Generate summary report
  console.log('\n=== OPTIMIZATION SUMMARY ===');
  let totalOriginalSize = 0;
  let totalNewSize = 0;
  
  report.forEach(item => {
    totalOriginalSize += item.originalSize;
    totalNewSize += item.newSize;
  });
  
  const totalSavings = totalOriginalSize - totalNewSize;
  const totalSavingsPercent = ((totalSavings / totalOriginalSize) * 100).toFixed(2);
  
  console.log(`Total Original Size: ${getFileSizeKB(totalOriginalSize)} KB`);
  console.log(`Total WebP Size: ${getFileSizeKB(totalNewSize)} KB`);
  console.log(`Total Savings: ${getFileSizeKB(totalSavings)} KB (${totalSavingsPercent}%)`);
  
  // Top 5 biggest savings
  report.sort((a, b) => b.savings - a.savings);
  console.log('\n=== TOP 5 BIGGEST SAVINGS ===');
  report.slice(0, 5).forEach((item, index) => {
    console.log(`${index + 1}. ${item.fileName}: ${getFileSizeKB(item.savings)} KB saved (${item.savingsPercent}%)`);
  });
  
  console.log('\n✅ Image optimization complete!');
  console.log('💡 Don\'t forget to update your code to use the new WebP images with fallbacks!');
}

// Run the optimization
optimizeAllImages().catch(error => {
  console.error('Error during optimization:', error);
});