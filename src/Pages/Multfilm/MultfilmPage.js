import React, {useEffect, useState} from 'react';
import axios from "axios";
import styles from './Multfilm.module.scss';

const MultfilmPage = () => {

    const url = 'https://api.multfilm.tatar/api/'

    const [videos, setVideos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState('');
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [unavailableVideo, setUnavailableVideo] = useState(null);

    const [imgSrc, setImgSrc] = useState('./img/oblozhki/multfilmBig.png');

    useEffect(() => {
        document.title = 'Мультфильмнар';
    }, []);

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

    const handleThumbnailClick = (video) => {
        if (video.video) {
            setSelectedVideo(video);
        } else {
            setUnavailableVideo(video);
        }
    };

    const closeModal = () => {
        setSelectedVideo(null);
        setUnavailableVideo(null);
    };

    const getVideos = async () => {
        setIsLoading(true);
        setLoadError('');
        try {
            const response = await axios.get(`${url}amina/video`, {timeout: 15000});
            setVideos(Array.isArray(response.data?.data) ? response.data.data : []);
        } catch (error) {
            setLoadError('Мультфильмнарны йөкләп булмады. Кабатлап карагыз.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
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
                    <h1>Мультфильмнар</h1>
                </div>
                <div className={'pageContent'}>
                    {isLoading && <div className="pageStatus" role="status">Мультфильмнар йөкләнә...</div>}
                    {loadError && (
                        <div className="pageStatus pageStatus_error" role="alert">
                            <p>{loadError}</p>
                            <button type="button" onClick={getVideos}>Кабат йөкләргә</button>
                        </div>
                    )}
                    <div className={'mulfilm_grid'}>
                        {
                            videos.map((item, index) => (
                                <div className={'videoBlock'} key={item.id ?? index} onClick={() => handleThumbnailClick(item)} role="button" tabIndex="0" onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') handleThumbnailClick(item) }}>
                                    <img src={item.preview} alt={item.name} className={'thumbnail'} loading="lazy" decoding="async" />
                                    <div className={'thumbnail_title'}>
                                        <p>{item.name}</p>
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
                                    <source src={selectedVideo.video} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        </div>
                    )}
                    {unavailableVideo && (
                        <div className={'modal'} onClick={closeModal} role="dialog" aria-modal="true" aria-label="Мультфильм әлегә әзер түгел">
                            <div className={'modalContent modalContent_message'} onClick={(event) => event.stopPropagation()}>
                                <button className={'close'} type="button" onClick={closeModal} aria-label="Ябарга">&times;</button>
                                <p><strong>{unavailableVideo.name}</strong></p>
                                <p>Бу мультфильм әлегә әзер түгел.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className={`${styles.footer} ${styles.footer_multfilm}`}>
                {/*<p>*/}
                {/*    Проект Татарстан Республикасы Рәисе каршындагы Татар телен һәм Татарстан Республикасында яшәүче халыклар вәкилләренең туган телләрен саклау, үстерү мәсьәләләре комиссиясе ярдәме белән Казан мэриясе тарафыннан «Татармультфильм» студиясе башкаруында гамәлгә ашырылды.*/}
                {/*</p>*/}
                <p>
                    © 2025 «Татармультфильм». Барлык хокуклар якланган.
                </p>
            </div>
        </>
    );
};

export default MultfilmPage;
