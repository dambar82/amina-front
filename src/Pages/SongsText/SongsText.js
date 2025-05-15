import React, {useEffect, useState} from 'react';
import styles from './SongsText.module.scss';
import axios from "axios";
import multfilmStyles from "../Multfilm/Multfilm.module.scss";

const colors = ['#94EBFF', '#FF7DB9', '#CFA0FF', '#B9FF43'];

const SongsText = () => {
    const url = 'https://api.multfilm.tatar/api/';
    const [imgSrc, setImgSrc] = useState('./img/oblozhki/songsTextBig.png');
    const [songs, setSongs] = useState([]);
    const [isScrolledHalf, setIsScrolledHalf] = useState(false);

    useEffect(() => {
        document.title = 'Җыр сүзләре';
    }, []);

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

    const updateImage = () => {

        if (window.innerWidth < 600) {
            setImgSrc('./img/oblozhki/songsTextMobile.png');
        } else if (window.innerWidth < 768) {
            setImgSrc('./img/oblozhki/songsText768.png');
        } else if (window.innerWidth < 1024) {
            setImgSrc('./img/oblozhki/songsText1024.png');
        } else if (window.innerWidth < 1440) {
            setImgSrc('./img/oblozhki/songsText1440.png');
        } else {
            setImgSrc('./img/oblozhki/songsTextBig.png');
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

    useEffect(() => {
        const getSongs = async () => {
            const response = await axios.get(`${url}amina/songs`);
            setSongs(response.data.data);
        }
        getSongs()
    }, [])

    const [expandedSongs, setExpandedSongs] = useState({});

    const toggleExpand = (id) => {
        setExpandedSongs((prev) => ({
            ...prev,
            [id]: !prev[id], // Переключаем состояние конкретной песни
        }));
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
                    <span>Җыр сүзләре</span>
                </div>
                <div className={'pageContent'}>
                    <div className={styles.songsText}>
                        {
                            songs.map((song, index) => (
                                <div className={styles.song} key={song.id}>
                                    <div
                                        className={styles.song_nota}
                                        style={{ backgroundColor: colors[index % colors.length] }}
                                    >
                                        <img src="/img/whiteNota.svg" alt=""/>
                                    </div>
                                    <div className={styles.song_content}>
                                        <h1>{song.title}</h1>
                                        <div className={`${styles.text} ${expandedSongs[song.id] ? styles.expanded : ""}`}
                                             dangerouslySetInnerHTML={{__html: song.content}}
                                        ></div>
                                        <div className={styles.showMoreButton}
                                             onClick={() => toggleExpand(song.id)}
                                        >
                                            {expandedSongs[song.id] ? "Төреп куярга" : "Тулысынча күрсәтергә"}
                                        </div>
                                    </div>
                                    <div className={styles.song_pic}>
                                        <img src={song.image} alt=""/>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className={`${multfilmStyles.footer} ${styles.footer_songText}`}>
                <p>
                    Проект Казан мэриясе ярдәме белән «Татармультфильм» студиясе тарафыннан гамәлгә ашырылды.  Проект балалар өчен белем бирү, татар телен популярлаштыру юнәлешендәге мәдәни контентны  үстерүгә йөз тота.
                </p>
                <p>
                    © 2025 «Татармультфильм». Барлык хокуклар якланган.
                </p>
            </div>
        </>
    );
};

export default SongsText;