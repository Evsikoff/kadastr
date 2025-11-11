# Настройка Android Keystore для подписи приложения

## Что было сделано

Проект настроен для поддержки подписи Android приложений. Были внесены следующие изменения:

1. **android/.gitignore** - добавлена защита для приватных файлов keystore
2. **android/app/build.gradle** - добавлена конфигурация подписи release сборки
3. **android/key.properties.example** - создан шаблон конфигурационного файла

## Инструкция по созданию keystore

### Шаг 1: Генерация keystore файла

Откройте терминал в директории `android` и выполните команду:

```bash
keytool -genkey -v -keystore kadastr-release-key.keystore -alias kadastr -keyalg RSA -keysize 2048 -validity 10000
```

Вам будет предложено ввести следующую информацию:

1. **Пароль keystore** (storePassword) - придумайте надежный пароль (минимум 6 символов)
2. **Пароль ключа** (keyPassword) - обычно используется тот же пароль, что и для keystore
3. **Имя и фамилия** (CN) - ваше имя или название организации
4. **Организационная единица** (OU) - например, "Development"
5. **Организация** (O) - название вашей компании
6. **Город** (L) - ваш город
7. **Регион/область** (ST) - ваш регион
8. **Код страны** (C) - двухбуквенный код страны (например, RU)

### Шаг 2: Создание файла key.properties

Создайте файл `android/key.properties` (НЕ .example) со следующим содержимым:

```properties
storePassword=ВАШ_ПАРОЛЬ_KEYSTORE
keyPassword=ВАШ_ПАРОЛЬ_КЛЮЧА
keyAlias=kadastr
storeFile=kadastr-release-key.keystore
```

Замените:
- `ВАШ_ПАРОЛЬ_KEYSTORE` - пароль, который вы ввели для keystore
- `ВАШ_ПАРОЛЬ_КЛЮЧА` - пароль, который вы ввели для ключа

### Шаг 3: Проверка в Android Studio

1. Закройте и снова откройте проект в Android Studio
2. Дождитесь завершения синхронизации Gradle
3. Перейдите в **Build > Generate Signed Bundle / APK**
4. Теперь эта опция должна быть активна

## Важная информация по безопасности

⚠️ **КРИТИЧЕСКИ ВАЖНО:**

1. **НИКОГДА** не коммитьте следующие файлы в Git:
   - `android/kadastr-release-key.keystore`
   - `android/key.properties`

2. **СОХРАНИТЕ** keystore файл и пароли в безопасном месте:
   - Сделайте резервную копию keystore
   - Запишите все пароли
   - Храните в надежном месте (менеджер паролей, зашифрованное хранилище)

3. **ПОТЕРЯ KEYSTORE** означает, что вы НЕ сможете обновлять приложение в Google Play Store!

## Альтернативный способ через Android Studio

Если вы предпочитаете использовать GUI:

1. В Android Studio откройте: **Build > Generate Signed Bundle / APK**
2. Выберите **APK** или **Android App Bundle**
3. Нажмите **Create new...** для создания нового keystore
4. Заполните форму:
   - Key store path: `android/kadastr-release-key.keystore`
   - Password: придумайте надежный пароль
   - Key alias: `kadastr`
   - Key password: тот же или другой пароль
   - Validity: 25 years (по умолчанию)
   - Заполните информацию о сертификате
5. После создания **вручную** создайте файл `android/key.properties` как описано выше

## Сборка подписанного APK

После настройки keystore вы можете собрать подписанный APK:

### Через Android Studio:
**Build > Generate Signed Bundle / APK > APK > Next** > выберите release > Finish

### Через командную строку:
```bash
cd android
./gradlew assembleRelease
```

Подписанный APK будет находиться в:
`android/app/build/outputs/apk/release/app-release.apk`

## Решение проблем

### "Generate Signed Bundle / APK" все еще неактивна

1. Убедитесь, что файл `key.properties` существует в директории `android/`
2. Проверьте, что все пути в `key.properties` правильные
3. Выполните: **File > Invalidate Caches / Restart** в Android Studio
4. Выполните: **File > Sync Project with Gradle Files**

### Ошибки при создании keystore

- Убедитесь, что у вас установлен JDK
- Проверьте, что команда `keytool` доступна в вашем PATH
- На Windows используйте Git Bash или Command Prompt от имени администратора

### Ошибка "Keystore file not found"

- Проверьте путь в `key.properties`
- Убедитесь, что `storeFile` указывает относительный путь от директории `android/`
- Проверьте правильность имени файла

## Дополнительная информация

- [Официальная документация Android - Signing Your App](https://developer.android.com/studio/publish/app-signing)
- [Capacitor Android Documentation](https://capacitorjs.com/docs/android)
