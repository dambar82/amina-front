import React, {useEffect, useState} from 'react';
import styles from './Reviews.module.scss';
import multfilmStyles from '../Multfilm/Multfilm.module.scss';
import axios from "axios";

const sort_types = [
    {key: 'new', value: 'Яңалары', endpoint: 'amina/new_feedbacks'},
    {key: 'old', value: 'Искеләре', endpoint: 'amina/old_feedbacks'},
    {key: 'photo', value: 'Фотографияләр белән', endpoint: 'amina/image_feedbacks'}
]

const url = 'https://api.multfilm.tatar/api/';

const Reviews = () => {

    const [imgSrc, setImgSrc] = useState('./img/oblozhki/reviewsBig.png');
    const [selectValue, setSelectValue] = useState(sort_types[0])
    const [sortType, setSortType] = useState(sort_types[0].key);
    const [selectActive, setSelectActive] = useState(false);
    const [loading, setLoading] = useState(false);
    const [reviews, setReviews] = useState([]);

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
        const fetchReviews = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${url}${sort_types.find(s => s.key === sortType).endpoint}`);
                console.log(response.data.data)
                setReviews(response.data.data);
            } catch (error) {
                console.error('Ошибка загрузки отзывов:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [sortType]);

    const handleSelectValue = ( elem ) => {
        setSelectValue(elem)
        setSelectActive(false)
        setSortType(elem.key)
    }

    return (
        <div className={'pageWrapper'}>
            <div className={'pageHeaderImage'}>
                <img src={imgSrc} alt=""/>
                <span>Бәяләмәләр</span>
            </div>
            <div className={'pageContent'}>
                <div className={styles.reviews}>
                    <div className={styles.reviews_header}>
                        <button className={`${styles.button} ${styles.button_pink}`}>
                            Оставить отзыв
                        </button>
                        <div className={styles.sort}>
                            <div
                                className={`${styles.sort_value} ${selectActive ? styles._active : ''}`}
                                onClick={() => setSelectActive(prev => !prev)}
                            >
                                <span>{selectValue.value}</span>
                                <img src="./img/tudasuda.svg" alt=""/>
                            </div>
                            <div className={styles.sort_select}>
                                {sort_types.map(elem => (
                                    <div
                                        key={elem.key}
                                        onClick={() => handleSelectValue(elem)}
                                        className={elem.key === selectValue.key ? styles._active : ''}
                                    >
                                        {elem.value}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className={styles.reviews_list}>
                        {reviews.map(review => (
                            <div key={review.id} className={styles.reviews_card}>
                                <h3>{review.organization}</h3>
                                <p>{review.text}</p>
                                {review.image && <img src={review.image} alt="Отзыв" />}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className={`${multfilmStyles.footer} ${multfilmStyles.footer_multfilm}`}>
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

export default Reviews;