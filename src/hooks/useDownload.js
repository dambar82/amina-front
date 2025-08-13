import { useState } from 'react';

/**
 * Кастомный хук для скачивания файлов
 * @returns {Object} объект с функцией downloadFile и состоянием isDownloading
 */
const useDownload = () => {
    // Состояние для отслеживания процесса скачивания
    const [isDownloading, setIsDownloading] = useState(false);

    /**
     * Функция для скачивания файла по URL
     * @param {string} url - URL файла для скачивания
     * @param {string} filename - имя файла для сохранения (по умолчанию 'file.mp3')
     */
    const downloadFile = async (url, filename = 'file.mp3') => {
        try {
            // Устанавливаем состояние загрузки
            setIsDownloading(true);
            
            // Получаем файл с сервера
            const response = await fetch(url);
            if (!response.ok) throw new Error('Network response was not ok');

            // Преобразуем ответ в blob (бинарные данные)
            const blob = await response.blob();
            // Создаем временный URL для blob
            const blobUrl = window.URL.createObjectURL(blob);

            // Создаем невидимую ссылку для скачивания
            const link = document.createElement('a');
            link.href = blobUrl;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            
            // Программно кликаем по ссылке для начала скачивания
            link.click();

            // Очищаем ресурсы после скачивания
            link.remove();
            window.URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error('Download failed:', error);
            // Можно добавить обработку ошибок, например показ уведомления пользователю
        } finally {
            // Сбрасываем состояние загрузки независимо от результата
            setIsDownloading(false);
        }
    };

    return {
        downloadFile,
        isDownloading
    };
};

export default useDownload; 