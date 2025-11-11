import fs from 'fs';
import path from 'path';

const androidResPath = './android/app/src/main/res';
const iconsPath = './public/icons';

// Маппинг иконок из public/icons в Android ресурсы
const iconMapping = [
  // Основные иконки (ic_launcher и ic_launcher_round)
  { source: 'icon-72x72.png', targets: ['mipmap-mdpi/ic_launcher.png', 'mipmap-mdpi/ic_launcher_round.png'] },
  { source: 'icon-72x72.png', targets: ['mipmap-hdpi/ic_launcher.png', 'mipmap-hdpi/ic_launcher_round.png'] },
  { source: 'icon-96x96.png', targets: ['mipmap-xhdpi/ic_launcher.png', 'mipmap-xhdpi/ic_launcher_round.png'] },
  { source: 'icon-144x144.png', targets: ['mipmap-xxhdpi/ic_launcher.png', 'mipmap-xxhdpi/ic_launcher_round.png'] },
  { source: 'icon-192x192.png', targets: ['mipmap-xxxhdpi/ic_launcher.png', 'mipmap-xxxhdpi/ic_launcher_round.png'] },

  // Foreground иконки для адаптивных иконок (Android 8.0+)
  { source: 'icon-128x128.png', targets: ['mipmap-mdpi/ic_launcher_foreground.png'] },
  { source: 'icon-152x152.png', targets: ['mipmap-hdpi/ic_launcher_foreground.png'] },
  { source: 'icon-192x192.png', targets: ['mipmap-xhdpi/ic_launcher_foreground.png'] },
  { source: 'icon-384x384.png', targets: ['mipmap-xxhdpi/ic_launcher_foreground.png'] },
  { source: 'icon-512x512.png', targets: ['mipmap-xxxhdpi/ic_launcher_foreground.png'] }
];

function copyIcons() {
  console.log('🚀 Копирование иконок из public/icons в Android проект...\n');

  let successCount = 0;
  let errorCount = 0;

  for (const { source, targets } of iconMapping) {
    const sourcePath = path.join(iconsPath, source);

    // Проверяем наличие исходного файла
    if (!fs.existsSync(sourcePath)) {
      console.error(`  ✗ Исходный файл не найден: ${source}`);
      errorCount++;
      continue;
    }

    // Копируем в каждую целевую папку
    for (const target of targets) {
      const targetPath = path.join(androidResPath, target);
      const targetDir = path.dirname(targetPath);

      // Создаём папку, если её нет
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }

      try {
        fs.copyFileSync(sourcePath, targetPath);
        console.log(`  ✓ ${source} → ${target}`);
        successCount++;
      } catch (error) {
        console.error(`  ✗ Ошибка при копировании ${source} → ${target}:`, error.message);
        errorCount++;
      }
    }
  }

  console.log(`\n📊 Результат: ${successCount} успешно, ${errorCount} ошибок`);

  if (errorCount === 0) {
    console.log('✅ Все иконки успешно скопированы!');
    console.log('\n💡 Следующие шаги:');
    console.log('   1. Запустите: npx cap sync android');
    console.log('   2. Проверьте иконки в Android Studio');
  } else {
    console.error('❌ Некоторые иконки не были скопированы');
    process.exit(1);
  }
}

copyIcons();
