import React, {useEffect, useState} from 'react';
import axios from "axios";

const MultfilmPage = () => {

    const url = 'https://api.multfilm.tatar/api/'

    const [videos, setVideos] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);

    const [videoDurations, setVideoDurations] = useState({});

    const [imgSrc, setImgSrc] = useState('./img/MultfilmHeaderImage.png');

    const updateImage = () => {
        // Проверяем ширину экрана и меняем изображение в зависимости от этого
        if (window.innerWidth < 600) {
            setImgSrc('./img/MultfilmHeaderImageMobile.png'); // Изображение для маленьких экранов
        } else if (window.innerWidth < 1024) {
            setImgSrc('./img/MultfilmHeaderImage1024.png'); // Изображение для средних экранов
        } else {
            setImgSrc('./img/MultfilmHeaderImage.png'); // Изображение для больших экранов
        }
    };

    useEffect(() => {
        // Устанавливаем изначальное изображение при загрузке
        updateImage();

        // Добавляем обработчик события изменения размера окна
        window.addEventListener('resize', updateImage);

        // Удаляем обработчик при размонтировании компонента
        return () => {
            window.removeEventListener('resize', updateImage);
        };
    }, []);

    const handleLoadedMetadata = (index, duration) => {
        setVideoDurations((prevDurations) => ({
            ...prevDurations,
            [index]: formatDuration(duration),
        }));
    };

    const formatDuration = (duration) => {
        const minutes = Math.floor(duration / 60);
        const seconds = Math.floor(duration % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const handleThumbnailClick = (video) => {
        setSelectedVideo(video);
    };

    const closeModal = () => {
        setSelectedVideo(null);
    };

    useEffect(() => {
        const getVideos = async () => {
            const response = await axios.get(`${url}amina/video`);
            setVideos(response.data.data);
        }
        getVideos();
    }, [])

    return (
        <div className={'pageWrapper'}>
            <div className={'pageHeaderImage'}>
                <img src={imgSrc} alt=""/>
            </div>
            <div className={'pageContent'}>
                <div className={'mulfilm_grid'}>
                    {
                        videos.map((item, index) => (
                            <div className={'videoBlock'} key={index} onClick={() => handleThumbnailClick(item)}>
                                <img src={item.preview} alt={item.title} className={'thumbnail'} />
                                <div className={'thumbnail_title'}>
                                    <p>{item.title}</p>
                                    <video
                                        style={{ display: 'none' }} // скрываем видео
                                        onLoadedMetadata={(e) => handleLoadedMetadata(index, e.target.duration)}
                                    >
                                        <source src={item.video} type="video/mp4" />
                                    </video>

                                    {/* Display duration */}
                                    {videoDurations[index] && (
                                        <p className="duration">{videoDurations[index]}</p>
                                    )}
                                </div>
                            </div>
                        ))
                    }
                </div>
                {selectedVideo && (
                    <div className={'modal'}>
                        <div className={'modalContent'}>
                            <span className={'close'} onClick={closeModal}>&times;</span>
                            <video controls>
                                <source src={selectedVideo.video} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MultfilmPage;