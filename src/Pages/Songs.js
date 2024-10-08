import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";

const Songs = () => {

    const url = 'https://api.multfilm.tatar/api/'

    const [songs, setSongs] = useState([]);
    const [durations, setDurations] = useState({});
    const [currentSong, setCurrentSong] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(1);
    const audioRef = useRef(null);

    const pics = ['./img/songPink.png', './img/songPurple.png', './img/songGreen.png']

    const [imgSrc, setImgSrc] = useState('./img/SongsHeaderImage.png');

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

        updateImage();

        window.addEventListener('resize', updateImage);

        return () => {
            window.removeEventListener('resize', updateImage);
        };
    }, []);

    useEffect(() => {
        const getSongs = async () => {
            const response = await axios.get(`${url}amina/audio`);
            const fetchedSongs = response.data.data;
            setSongs(fetchedSongs);
            fetchedSongs.forEach(song => {
                const audio = new Audio(song.audio);
                audio.addEventListener('loadedmetadata', () => {
                    setDurations(prev => ({
                        ...prev,
                        [song.id]: formatDuration(audio.duration)
                    }));
                });
            })
        }
        getSongs();
    }, [])

    const formatDuration = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    const playSong = (song) => {
        setCurrentSong(song);
        setIsPlaying(true);
        setCurrentTime(0);  // Сброс текущего времени при смене песни
    };

    const togglePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime);
    };

    const handleSeek = (e) => {
        const seekTime = (e.target.value / 100) * audioRef.current.duration;
        audioRef.current.currentTime = seekTime;
        setCurrentTime(seekTime);
    };

    const handleVolumeChange = (e) => {
        const newVolume = e.target.value;
        audioRef.current.volume = newVolume;
        setVolume(newVolume);
    };

    const handleProgressClick = (e) => {
        const progressBar = e.currentTarget;
        const rect = progressBar.getBoundingClientRect();  // Получаем координаты прогресс-бара
        const clickX = e.clientX - rect.left;  // Определяем точную горизонтальную позицию клика
        const clickRatio = clickX / rect.width;  // Определяем соотношение клика относительно ширины прогресс-бара
        const newTime = clickRatio * audioRef.current.duration;  // Вычисляем новое время песни

        audioRef.current.currentTime = newTime;
        setCurrentTime(newTime);
    };

    const playPreviousSong = () => {
        if (currentSong) {
            const currentIndex = songs.findIndex(song => song.id === currentSong.id);
            if (currentIndex > 0) {
                setCurrentSong(songs[currentIndex - 1]);  // Воспроизвести предыдущую песню
                setCurrentTime(0);  // Сброс текущего времени
            }
        }
    };

    const playNextSong = () => {
        if (currentSong) {
            const currentIndex = songs.findIndex(song => song.id === currentSong.id);
            if (currentIndex < songs.length - 1) {
                setCurrentSong(songs[currentIndex + 1]);  // Воспроизвести следующую песню
                setCurrentTime(0);  // Сброс текущего времени
            }
        }
    };

    return (
        <div className={'pageWrapper'}>
            <div className={'pageHeaderImage'}>
                <img src={imgSrc} alt=""/>
            </div>
            <div className={'pageContent'}>
                <div className={'songsContent'}>
                    {songs.map((song, index) => (
                        <div key={song.id} className={`songItem ${currentSong === song ? 'songItem_current' : ''}`} onClick={() => playSong(song)}>
                            <span className="songNumber">{(index + 1).toString().padStart(2, '0')}</span>
                            <div>
                                <img src={pics[index % pics.length]} alt=""/>
                            </div>
                            <span className="songTitle">{song.title}</span>
                            <span className="songDuration">{durations[song.id] || '00:00'}</span>
                        </div>
                    ))}
                </div>
            </div>
            {currentSong && (
                <div className="audioPlayer">
                    <audio
                        ref={audioRef}
                        src={currentSong.audio}
                        autoPlay={isPlaying}
                        onTimeUpdate={handleTimeUpdate}
                        onEnded={() => setIsPlaying(false)} // Возвращаем состояние в паузу, если песня закончилась
                        controls={false} // Отключаем стандартные контролы
                    />

                    {/* Прогресс-бар */}
                    <div className="progressBarContainer">
                        <div className="controls">
                            <img src="./img/previousSong.png" alt="" onClick={playPreviousSong}/>
                            {
                                isPlaying ? (<img src="./img/playerStop.svg" alt="" onClick={togglePlayPause}/>) : (
                                    <img src="./img/playerPlay.svg" alt="" onClick={togglePlayPause}/>)
                            }
                            <img src="./img/nextSong.svg" alt="" onClick={playNextSong}/>
                        </div>
                        <div className="timeDisplay">
                            <span>{formatDuration(currentTime)}</span>/
                            <span>{durations[currentSong.id]}</span>
                        </div>
                        <input
                                onClick={handleProgressClick}
                                type="range"
                                className="progressBar"
                                value={(currentTime / (audioRef.current?.duration || 1)) * 100}
                                onChange={handleSeek}
                                style={{ '--value': (currentTime / (audioRef.current?.duration || 1)) * 100 }}
                        />
                        <div className='volume'>
                            <img src="./img/volumeImage.svg" alt=""/>
                            <input
                                type="range"
                                className="volumeControl"
                                min="0"
                                max="1"
                                step="0.01"
                                value={volume}
                                onChange={handleVolumeChange}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Songs;