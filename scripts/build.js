const fs = require('fs-extra');
const path = require('path');

const frontendDist = path.join(__dirname, '..', 'frontend', 'dist');
const backendPublic = path.join(__dirname, '..', 'backend', 'public');

async function copyFrontendBuild() {
  try {
    console.log('🔨 Building unified application...');
    
    // Check if frontend dist exists
    if (!fs.existsSync(frontendDist)) {
      console.error('❌ Frontend dist folder not found!');
      console.log('   Run "npm run build" in the frontend directory first.');
      process.exit(1);
    }
    
    // Remove old public folder if exists
    if (fs.existsSync(backendPublic)) {
      console.log('🗑️  Removing old build...');
      await fs.remove(backendPublic);
    }
    
    // Copy frontend dist to backend public
    console.log('📦 Copying frontend build to backend...');
    await fs.copy(frontendDist, backendPublic);
    
    console.log('✅ Build complete! Frontend merged with backend.');
    console.log('   Deploy the backend folder to your hosting platform.');
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
}

copyFrontendBuild();
