import sharp from 'sharp';
import fs from 'fs';

// Размеры иконок для PWA
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

// Создаём папку для иконок, если её нет
if (!fs.existsSync('./public/icons')) {
  fs.mkdirSync('./public/icons', { recursive: true });
}

// Читаем SVG файл
const svgBuffer = fs.readFileSync('./public/icons/icon.svg');

// Генерируем PNG иконки для каждого размера
async function generateIcons() {
  for (const size of sizes) {
    try {
      await sharp(svgBuffer)
        .resize(size, size)
        .png()
        .toFile(`./public/icons/icon-${size}x${size}.png`);

      console.log(`✓ Создана иконка ${size}x${size}`);
    } catch (error) {
      console.error(`✗ Ошибка при создании иконки ${size}x${size}:`, error.message);
    }
  }

  console.log('\n✅ Все иконки успешно созданы!');
}

generateIcons().catch(console.error);
