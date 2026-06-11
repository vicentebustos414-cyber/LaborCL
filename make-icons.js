const sharp = require('sharp');
const pngToIco = require('png-to-ico');
const fs = require('fs');
const path = require('path');

const svg = fs.readFileSync(path.join(__dirname,'icons','icon.svg'));
const iconsDir = path.join(__dirname,'icons');

async function main(){
  // Generate PNGs at various sizes
  const sizes = [16,32,48,64,128,192,256,512];
  for(const s of sizes){
    await sharp(svg).resize(s,s).png().toFile(path.join(iconsDir,`icon-${s}.png`));
    console.log(`✅ icon-${s}.png`);
  }
  // Copy 512 as icon.png
  fs.copyFileSync(path.join(iconsDir,'icon-512.png'), path.join(iconsDir,'icon.png'));
  console.log('✅ icon.png (512)');

  // Generate ICO from 256px PNG
  const icoBuf = await pngToIco(path.join(iconsDir,'icon-256.png'));
  fs.writeFileSync(path.join(iconsDir,'icon.ico'), icoBuf);
  console.log('✅ icon.ico');

  console.log('\n🎉 Todos los íconos generados en /icons');
}
main().catch(e=>console.error(e));
