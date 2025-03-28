import React, {useEffect, useState} from 'react';
import styles from './SongsText.module.scss';
import axios from "axios";
import multfilmStyles from "../Multfilm/Multfilm.module.scss";

const colors = ['#94EBFF', '#FF7DB9', '#CFA0FF', '#B9FF43'];

const SongsText = () => {
    const url = 'https://api.multfilm.tatar/api/';
    const [imgSrc, setImgSrc] = useState('./img/oblozhki/songsTextBig.png');
    const [songs, setSongs] = useState([]);

    const updateImage = () => {

        if (window.innerWidth < 600) {
            setImgSrc('./img/SongsHeaderImageMobile.png');
        } else if (window.innerWidth < 1024) {
            setImgSrc('./img/SongsHeaderImage1024.png');
        } else {
            setImgSrc('./img/SongsHeaderImage.png');
        }
    };

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
        <div className={'pageWrapper'}>
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
            <div className={`${multfilmStyles.footer} ${styles.footer_songText}`}>
                <p>
                    Проект Казан мэриясе ярдәме белән «Татармультфильм» студиясе тарафыннан гамәлгә ашырылды.  Проект балалар өчен белем бирү, татар телен популярлаштыру юнәлешендәге мәдәни контентны  үстерүгә йөз тота.
                </p>
                <p>
                    © 2024 «Әминә». Барлык хокуклар якланган. Сайт материалларын язма рөхсәт белән генә файдаланырга ярый.
                </p>
            </div>
        </div>
    );
};

export default SongsText;