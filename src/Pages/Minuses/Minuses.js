import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";
import styles from "../Multfilm/Multfilm.module.scss";

const Minuses = () => {

    const url = 'https://api.multfilm.tatar/api/'
    const [imgSrc, setImgSrc] = useState('./img/oblozhki/songsBig.png');
    const roundAppearances = [
        {
            roundColor: '#FEB6DB',
            notePic: './img/minuses/pinkNote.svg'
        },
        {
            roundColor: '#CFA0FF',
            notePic: './img/minuses/purpleNote.svg'
        },
        {
            roundColor: '#C7FF69',
            notePic: './img/minuses/greenNote.svg'
        }
    ]

    const [minuses, setMinuses] = useState([]);
    const [currentSong, setCurrentSong] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    useEffect(() => {
        const getMinuses = async () => {
            const response = await axios.get(`${url}amina/audio_minuses`);
            const fetchedSongs = response.data.data;
            setMinuses(fetchedSongs);
        }
        getMinuses();
    }, [])

    const playSong = (song) => {
        setCurrentSong(song);
        setIsPlaying(true);
       // setCurrentTime(0);  // Сброс текущего времени при смене песни
    };

    const togglePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleDownload = async (url, filename = 'file.mp3') => {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Network response was not ok');

            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = blobUrl;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();

            // cleanup
            link.remove();
            window.URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error('Download failed:', error);
        }
    };

    return (
        <>
            <div className={'pageWrapper'}>
                <div className={'pageHeaderImage'}>
                    <img src={imgSrc} alt=""/>
                    <span>Минуслар</span>
                </div>
                <div className={styles.songsMinusesContent}>
                    {
                        minuses.map((item, index) => (
                            <div className={styles.minusItem} key={item.id}>
                                <div
                                    className={styles.downloadMinus}
                                    onClick={() => handleDownload(item.file, item.title + '.mp3')}
                                >
                                    <img src="/img/minuses/downloadMinus.svg" alt="Скачать минус" />
                                </div>
                                <div className={styles.round} style={{ backgroundColor: roundAppearances[index % roundAppearances.length].roundColor }}>
                                    <img className={styles.image} src={roundAppearances[index % roundAppearances.length].notePic} alt=""/>
                                </div>
                                <div className={styles.title}>
                                    {item.title}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    );
};

export default Minuses;