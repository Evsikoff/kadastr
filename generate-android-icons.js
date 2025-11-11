import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Размеры иконок для Android
const iconSizes = {
  'mipmap-mdpi': 48,
  'mipmap-hdpi': 72,
  'mipmap-xhdpi': 96,
  'mipmap-xxhdpi': 144,
  'mipmap-xxxhdpi': 192
};

// Размеры foreground иконок для адаптивных иконок (Android 8.0+)
const foregroundSizes = {
  'mipmap-mdpi': 108,
  'mipmap-hdpi': 162,
  'mipmap-xhdpi': 216,
  'mipmap-xxhdpi': 324,
  'mipmap-xxxhdpi': 432
};

const androidResPath = './android/app/src/main/res';
const sourceIcon = './public/icons/icon-512x512.png';

async function generateAndroidIcons() {
  console.log('🚀 Генерация иконок для Android...\n');

  // Проверяем наличие исходной иконки
  if (!fs.existsSync(sourceIcon)) {
    console.error('❌ Файл иконки не найден:', sourceIcon);
    process.exit(1);
  }

  // Генерируем основные иконки
  console.log('📱 Генерация основных иконок (ic_launcher)...');
  for (const [folder, size] of Object.entries(iconSizes)) {
    const folderPath = path.join(androidResPath, folder);

    // Создаём папку, если её нет
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    try {
      await sharp(sourceIcon)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 0 }
        })
        .png()
        .toFile(path.join(folderPath, 'ic_launcher.png'));

      await sharp(sourceIcon)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 0 }
        })
        .png()
        .toFile(path.join(folderPath, 'ic_launcher_round.png'));

      console.log(`  ✓ ${folder}: ${size}x${size}px`);
    } catch (error) {
      console.error(`  ✗ Ошибка при создании ${folder}:`, error.message);
    }
  }

  // Генерируем foreground иконки
  console.log('\n🎨 Генерация foreground иконок (ic_launcher_foreground)...');
  for (const [folder, size] of Object.entries(foregroundSizes)) {
    const folderPath = path.join(androidResPath, folder);

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    try {
      await sharp(sourceIcon)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 0 }
        })
        .png()
        .toFile(path.join(folderPath, 'ic_launcher_foreground.png'));

      console.log(`  ✓ ${folder}: ${size}x${size}px`);
    } catch (error) {
      console.error(`  ✗ Ошибка при создании ${folder}:`, error.message);
    }
  }

  console.log('\n✅ Все Android иконки успешно созданы!');
  console.log('\n💡 Следующие шаги:');
  console.log('   1. Запустите: npx cap sync android');
  console.log('   2. Проверьте иконки в Android Studio');
}

generateAndroidIcons().catch(console.error);
