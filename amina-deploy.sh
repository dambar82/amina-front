#!/bin/bash

# Скрипт для деплоя React приложения amina.tatar
# Автор: Deploy script for amina.tatar
# Использование: ./amina-deploy.sh

set -e  # Остановить выполнение при любой ошибке

echo "🚀 Начинаю деплой amina.tatar..."

# Переходим в директорию проекта
cd /var/www/html/amina.tatar

echo "📁 Рабочая директория: $(pwd)"

# Проверяем статус git
echo "🔍 Проверяю статус git репозитория..."
git status --porcelain

# Сохраняем хеш коммита до обновления  
OLD_COMMIT=$(git rev-parse HEAD)
echo "📌 Текущий коммит: $OLD_COMMIT"

# Получаем изменения из git
echo "⬇️  Получаю изменения из git..."
git pull origin master

# Получаем новый хеш коммита
NEW_COMMIT=$(git rev-parse HEAD)
echo "📌 Новый коммит: $NEW_COMMIT"

# Проверяем, есть ли изменения
if [ "$OLD_COMMIT" = "$NEW_COMMIT" ]; then
    echo "ℹ️  Нет новых изменений в репозитории"
else
    echo "✅ Получены новые изменения"
    echo "📝 Изменения:"
    git log --oneline $OLD_COMMIT..$NEW_COMMIT
fi

# Проверяем, изменился ли package.json или package-lock.json
if git diff --name-only $OLD_COMMIT $NEW_COMMIT | grep -q "package.*\.json"; then
    echo "📦 Обнаружены изменения в зависимостях, обновляю npm пакеты..."
    npm install
else
    echo "📦 Зависимости не изменились, пропускаю npm install"
fi

# Собираем проект
echo "🔨 Собираю проект..."
npm run build

# Проверяем что сборка прошла успешно
if [ ! -f "build/index.html" ]; then
    echo "❌ Ошибка: файл build/index.html не найден!"
    echo "❌ Сборка не удалась!"
    exit 1
fi

echo "✅ Сборка завершена успешно"

# Перезагружаем Apache
echo "🔄 Перезагружаю конфигурацию Apache..."
systemctl reload apache2

# Проверяем статус Apache
if systemctl is-active --quiet apache2; then
    echo "✅ Apache работает корректно"
else
    echo "❌ Проблема с Apache!"
    systemctl status apache2
    exit 1
fi

echo "🎉 Деплой завершен успешно!"
echo "🌐 Сайт доступен по адресу: https://amina.tatar"
echo "📅 Время деплоя: $(date)" 