import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import styles from './Main.module.scss';
import reviewsStyles from '../Reviews/Reviews.module.scss';

const url = 'https://api.multfilm.tatar/api/';

const colors = ['#94EBFF', '#FF7DB9', '#B9FF43'];

const Main = () => {

    useEffect(() => {
        document.title = 'Әминә белән бергә җырла!';
    }, []);

    function formatDate(inputDate) {

        const parts = inputDate.split('-');

        if (parts.length !== 3) {
            throw new Error("Неверный формат даты. Ожидался формат DD-MM-YYYY.");
        }

        const day = parts[0];
        const month = parts[1];

        return `${day}.${month}`;
    }

    const [songs, setSongs] = useState([]);

    useEffect(() => {
        const getSongs = async () => {
            const response = await axios.get(`${url}amina/songs`);
            setSongs(response.data.data);
        }
        getSongs()
    }, [])

    return (
        <>
            <div className={'mainContent'}>
                <div className={'mainContent_blockPink'}>
                    <div className={'amina_pic'}>
                        <img src="./img/AminaPic.png" alt=""/>
                    </div>
                </div>
                <div className={'mainContent_blockPurple'}>
                    <div className={'blockHigh'}>
                        <div className={'blockHigh_headerPic'}>
                            <img src="./img/FriendshipWorld.png" alt=""/>
                        </div>
                        <div className={'blockHigh_headerText'}>
                            <p>
                                Әминә исемле тиктормас кыз белән бергә татар телен өйрәнү бик күңелле һәм кызык. Ул җырларда һәм мультфильмнарда сезне үзе, гаиләсе, бүлмәсе белән таныштырыр, саннар, төсләр дөньясына, бакчага, урманга сәяхәткә дә алып китәр. Әйдә, сез дә Әминәгә кушылыгыз!
                            </p>
                        </div>
                    </div>
                    <div className={'blockBottom'}>
                        <div className={`blockBottom_block blockBottom_blockImg blockImgLeft`}>
                            <Link to='/songs'>
                                <div className={'podlozhka podlozhka_left'}>
                                </div>
                                <img src='./img/songBlock.png' alt=""/>
                            </Link>
                        </div>
                        <div className={'blockBottom_block'}>
                            <img src="./img/Amina.png" alt=""/>
                        </div>
                        <div className={'blockBottom_block blockBottom_blockImg blockImgRight'}>
                            <Link to='/multfilm'>
                                <div className={'podlozhka podlozhka_right'}>
                                </div>
                                <img
                                    src='./img/multfilmBlock.png'
                                    alt=""
                                />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className={'mainContent_blockGreen'}>
                    <div className={'blockHigh'}>
                        <div className={'blockHigh_headerPic'}>
                            <img src="./img/songText.png" alt=""/>
                        </div>
                    </div>
                    <div className={styles.blockGreen_content}>
                        {
                            songs.slice(0, 3).map((song, index) => (
                                <div className={styles.songBLock} key={song.id}>
                                    <div
                                        className={styles.songBLock_nota}
                                        style={{ backgroundColor: colors[index % colors.length] }}
                                    >
                                        <img src="/img/whiteNota.svg" alt=""/>
                                    </div>
                                    <div className={styles.songBLock_content}>
                                        <h1>{song.title}</h1>
                                        <div className={`${styles.text}`}
                                             dangerouslySetInnerHTML={{__html: song.content}}
                                        ></div>
                                        <Link to='/songs_text'>
                                            <div className={styles.showMoreButton}
                                            >
                                                Тулысынча күрсәтергә
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <Link to='/songs_text'>
                        <div className={'showMoreButton'}>
                            <span>Күбрәк күрсәтергә</span>
                            <img src="./img/arrow.png" alt=""/>
                        </div>
                    </Link>
                </div>
                <div className={'mainContent_blockPurpleSecond'}>
                    <div className={'blockHigh'}>
                        <div className={'blockHigh_headerPic'}>
                            <img src="./img/about.png" alt=""/>
                        </div>
                    </div>
                    <div className={styles.blockPurple_content}>
                        <div className={styles.image}>
                            <img src="/img/aboutPic.jpg" alt=""/>
                        </div>
                        <div className={styles.textBlock}>
                            <p>
                                Проект Казан мэриясе ярдәме белән «Татармультфильм» студиясе тарафыннан гамәлгә ашырылды.  Проект балалар өчен белем бирү, татар телен популярлаштыру юнәлешендәге мәдәни контентны  үстерүгә йөз тота.
                            </p>
                            <p>
                                «Әминә» – Казан мэриясе проекты. Ул Татарстан Республикасы Рәисе каршындагы Татар телен һәм Татарстан Республикасында яшәүче халыклар вәкилләренең туган телләрен саклау, үстерү мәсьәләләре комиссиясе ярдәме белән «Татармультфильм» студиясе тарафыннан гамәлгә ашырылды.
                            </p>
                            <Link to='/about'>
                                <button className={`${reviewsStyles.button} ${reviewsStyles.button_pink}`}>Тулырак</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className={'main_footer'}>
                    <p>
                        Проект Казан мэриясе ярдәме белән «Татармультфильм» студиясе тарафыннан гамәлгә ашырылды.  Проект балалар өчен белем бирү, татар телен популярлаштыру юнәлешендәге мәдәни контентны  үстерүгә йөз тота.
                    </p>
                    <p>
                        © 2025 «Татармультфильм». Барлык хокуклар якланган.
                    </p>
                </div>
            </div>
        </>
    );
};

export default Main;