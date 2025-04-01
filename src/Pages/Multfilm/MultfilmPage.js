import React, {useEffect, useState} from 'react';
import axios from "axios";
import styles from './Multfilm.module.scss';

const MultfilmPage = () => {

    const url = 'https://api.multfilm.tatar/api/'

    const [videos, setVideos] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);

    const [videoDurations, setVideoDurations] = useState({});

    const [imgSrc, setImgSrc] = useState('./img/oblozhki/multfilmBig.png');

    const updateImage = () => {

        if (window.innerWidth < 600) {
            setImgSrc('./img/oblozhki/multilmMobile.png');
        } else if (window.innerWidth < 768) {
            setImgSrc('./img/oblozhki/multfilm768.png');
        } else if (window.innerWidth < 1024) {
            setImgSrc('./img/oblozhki/multfilm1024.png');
        } else if (window.innerWidth < 1440) {
            setImgSrc('./img/oblozhki/multfilm1440.png');
        } else {
            setImgSrc('./img/oblozhki/multfilmBig.png');
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

    const [isScrolledHalf, setIsScrolledHalf] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const halfHeight = window.innerHeight / 2;
            if (window.scrollY > halfHeight) {
                setIsScrolledHalf(true);
            } else {
                setIsScrolledHalf(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <>
            <div className={'pageWrapper'}>
                {
                    isScrolledHalf && (
                        <div className={'scrollToTop'} onClick={scrollToTop}>
                            <img src="./img/toTopBlack.svg" alt=""/>
                        </div>
                    )
                }
                <div className={'pageHeaderImage'}>
                    <img src={imgSrc} alt=""/>
                    <span>Мультфильмнар</span>
                </div>
                <div className={'pageContent'}>
                    <div className={'mulfilm_grid'}>
                        {
                            videos.map((item, index) => (
                                <div className={'videoBlock'} key={index} onClick={() => handleThumbnailClick(item)}>
                                    <img src={item.preview} alt={item.name} className={'thumbnail'} />
                                    <div className={'thumbnail_title'}>
                                        <p>{item.name}</p>
                                        <video
                                            style={{ display: 'none' }} // скрываем видео
                                            onLoadedMetadata={(e) => handleLoadedMetadata(index, e.target.duration)}
                                        >
                                            <source src={item.video} type="video/mp4" />
                                        </video>

                                        {/* Display duration */}
                                        {/*{videoDurations[index] && (*/}
                                        {/*    <p className="duration">{videoDurations[index]}</p>*/}
                                        {/*)}*/}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    {selectedVideo && (
                        <div className={'modal'} onClick={closeModal}>
                            <div className={'modalContent'}>
                                <span className={'close'} onClick={closeModal}>&times;</span>
                                <video controls onClick={(event) => event.stopPropagation()}>
                                    <source src={selectedVideo.link} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className={`${styles.footer} ${styles.footer_multfilm}`}>
                <p>
                    Проект Казан мэриясе ярдәме белән «Татармультфильм» студиясе тарафыннан гамәлгә ашырылды.  Проект балалар өчен белем бирү, татар телен популярлаштыру юнәлешендәге мәдәни контентны  үстерүгә йөз тота.
                </p>
                <p>
                    © 2024 «Әминә». Барлык хокуклар якланган. Сайт материалларын язма рөхсәт белән генә файдаланырга ярый.
                </p>
            </div>
        </>
    );
};

export default MultfilmPage;