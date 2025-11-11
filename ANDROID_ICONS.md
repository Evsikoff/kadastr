# Android Icon Update Guide

## Обновление иконок приложения

Когда вы меняете иконки в `public/icons/`, следуйте этим шагам:

### Вариант 1: Автоматический (рекомендуется)

```bash
npm run build:android
```

Эта команда автоматически:
1. Копирует новые иконки в Android проект
2. Собирает веб-приложение
3. Синхронизирует Capacitor

### Вариант 2: Пошаговый

```bash
# 1. Копируем иконки в Android проект
npm run icons:android

# 2. Собираем веб-приложение
npm run build

# 3. Синхронизируем Capacitor
npx cap sync android

# 4. Собираем APK в Android Studio или через Gradle
cd android
./gradlew assembleDebug
```

## Какие иконки нужны

В папке `public/icons/` должны быть следующие файлы:

- `icon-72x72.png` - используется для mdpi/hdpi
- `icon-96x96.png` - используется для xhdpi
- `icon-128x128.png` - foreground для mdpi
- `icon-144x144.png` - используется для xxhdpi
- `icon-152x152.png` - foreground для hdpi
- `icon-192x192.png` - используется для xxxhdpi и foreground для xhdpi
- `icon-384x384.png` - foreground для xxhdpi
- `icon-512x512.png` - foreground для xxxhdpi

## Маппинг иконок

| Исходный файл | Android ресурсы |
|---------------|-----------------|
| icon-72x72.png | mipmap-mdpi/hdpi (48-72px) |
| icon-96x96.png | mipmap-xhdpi (96px) |
| icon-144x144.png | mipmap-xxhdpi (144px) |
| icon-192x192.png | mipmap-xxxhdpi (192px) |

## Сборка APK

После обновления иконок:

```bash
# Собрать debug APK
cd android
./gradlew assembleDebug

# APK будет здесь:
# android/app/build/outputs/apk/debug/app-debug.apk
```

## Важно!

⚠️ **Всегда запускайте `npm run icons:android` после изменения иконок** в `public/icons/`, иначе Android проект будет использовать старые иконки!
