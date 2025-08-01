import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";
import styles from "../Multfilm/Multfilm.module.scss";

const Minuses = () => {

    const url = 'https://api.multfilm.tatar/api/'
    const [imgSrc, setImgSrc] = useState('./img/oblozhki/songsBig.png');
    const roundAppearances = [
        {
            roundColor: '#FEB6DB',
            progressColor: '#FF4FA9',
            notePic: './img/minuses/pinkNote.svg',
            stop: './img/minuses/pinkStop.svg',
            play: './img/minuses/pinkPlay.svg'
        },
        {
            roundColor: '#CFA0FF',
            progressColor: '#AB59FF',
            notePic: './img/minuses/purpleNote.svg',
            stop: './img/minuses/pinkStop.svg',
            play: './img/minuses/pinkPlay.svg'
        },
        {
            roundColor: '#C7FF69',
            progressColor: '#7DC800',
            notePic: './img/minuses/greenNote.svg',
            stop: './img/minuses/pinkStop.svg',
            play: './img/minuses/pinkPlay.svg'
        }
    ]

    const [minuses, setMinuses] = useState([]);
    const [currentSong, setCurrentSong] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    // Добавляем состояния для отслеживания времени и прогресса
    const [currentTime, setCurrentTime] = useState(0);
    const [progress, setProgress] = useState(0);
    const audioRef = useRef(null);

    const updateImage = () => {

        if (window.innerWidth < 600) {
            setImgSrc('./img/oblozhki/songsMobile.png');
        } else if (window.innerWidth < 768) {
            setImgSrc('./img/oblozhki/songs768.png');
        } else if (window.innerWidth < 1024) {
            setImgSrc('./img/oblozhki/songs1024.png');
        } else if (window.innerWidth < 1440) {
            setImgSrc('./img/oblozhki/songs1440.png');
        } else {
            setImgSrc('./img/oblozhki/songsBig.png');
        }
    };

    useEffect(() => {

        updateImage();

        window.addEventListener('resize', updateImage);

        return () => {
            window.removeEventListener('resize', updateImage);
        };
    }, []);


    useEffect(() => {
        const getMinuses = async () => {
            const response = await axios.get(`${url}amina/audio_minuses`);
            const fetchedSongs = response.data.data;
            setMinuses(fetchedSongs);
        }
        getMinuses();
    }, [])

    // Обработчик для обновления времени и прогресса воспроизведения
    useEffect(() => {
        if (audioRef.current) {
            const audio = audioRef.current;
            
            // Обновляем время каждые 100мс для плавного прогресс-бара
            const updateTime = () => {
                const current = audio.currentTime;
                setCurrentTime(current);
                // Рассчитываем прогресс от 0 до 100% за 15 секунд
                setProgress((current / 15) * 100);
                
                // Останавливаем воспроизведение через 15 секунд
                if (current >= 15) {
                    audio.pause();
                    setIsPlaying(false);
                    setCurrentTime(0);
                    setProgress(0);
                    setCurrentSong(null);
                }
            };

            // Сбрасываем прогресс когда песня заканчивается
            const handleEnded = () => {
                setIsPlaying(false);
                setCurrentTime(0);
                setProgress(0);
                setCurrentSong(null);
            };

            audio.addEventListener('timeupdate', updateTime);
            audio.addEventListener('ended', handleEnded);

            return () => {
                audio.removeEventListener('timeupdate', updateTime);
                audio.removeEventListener('ended', handleEnded);
            };
        }
    }, [currentSong]);

    // Функция для запуска воспроизведения песни
    const playSong = (song) => {
        // Если уже играет та же песня, просто toggle play/pause
        if (currentSong && currentSong.id === song.id) {
            togglePlayPause();
            return;
        }
        
        // Запускаем новую песню
        setCurrentSong(song);
        setCurrentTime(0);
        setProgress(0);
        setIsPlaying(true);
    };

    // Переключение воспроизведения/паузы
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
                        minuses.map((item, index) => {
                            // Определяем является ли этот элемент активным (проигрывается)
                            const isCurrentSong = currentSong && currentSong.id === item.id;
                            const appearance = roundAppearances[index % roundAppearances.length];
                            
                            return (
                                <div className={styles.minusItem} key={item.id}>
                                    <div
                                        className={styles.downloadMinus}
                                        onClick={() => handleDownload(item.file, item.title + '.mp3')}
                                    >
                                        <img src="/img/minuses/downloadMinus.svg" alt="Скачать минус" />
                                    </div>
                                    
                                    {/* Кружок с прогресс-баром и кнопкой play/pause */}
                                    <div 
                                        className={styles.roundContainer}
                                        onClick={() => playSong(item)}
                                    >
                                        {/* SVG прогресс-бар вокруг кружка */}
                                        <svg className={styles.progressRing} viewBox="0 0 120 120">
                                            {/* Фоновый круг */}
                                            <circle
                                                cx="60"
                                                cy="60"
                                                r="55"
                                                fill="none"
                                                stroke={appearance.roundColor}
                                                strokeWidth="4"
                                            />
                                            {/* Прогресс круг */}
                                            {isCurrentSong && (
                                                <circle
                                                    cx="60"
                                                    cy="60"
                                                    r="55"
                                                    fill="none"
                                                    stroke={appearance.progressColor}
                                                    strokeWidth="4"
                                                    strokeLinecap="round"
                                                    strokeDasharray={`${2 * Math.PI * 55}`}
                                                    strokeDashoffset={`${2 * Math.PI * 55 * (1 - progress / 100)}`}
                                                    transform="rotate(-90 60 60)"
                                                />
                                            )}
                                        </svg>
                                        
                                        {/* Основной кружок */}
                                        <div 
                                            className={styles.round} 
                                            style={{ backgroundColor: appearance.roundColor }}
                                        >
                                            {/* Показываем иконку play/pause если песня активна, иначе ноту */}
                                            {isCurrentSong ? (
                                                <div className={styles.playPauseButton}>
                                                    <img src={isPlaying ? appearance.stop : appearance.play} alt=""/>
                                                </div>
                                            ) : (
                                                <img className={styles.image} src={appearance.notePic} alt=""/>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <div className={styles.title}>
                                        {item.title}
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
                
                {/* Скрытый audio элемент для воспроизведения */}
                {currentSong && (
                    <audio
                        ref={audioRef}
                        src={currentSong.file}
                        autoPlay={isPlaying}
                    />
                )}
            </div>
        </>
    );
};

export default Minuses;