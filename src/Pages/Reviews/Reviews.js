import React, {useState} from 'react';
import styles from './Reviews.module.scss';

const sort_types = [
    {key: 'new', value: 'новые'},
    {key: 'old', value: 'старые'},
    {key: 'photo', value: 'с фото'}
]

const Reviews = () => {

    const [imgSrc, setImgSrc] = useState('./img/oblozhki/reviewsBig.png');
    const [selectValue, setSelectValue] = useState(sort_types[0])
    const [sortType, setSortType] = useState(sort_types[0].key);
    const [selectActive, setSelectActive] = useState(false);

    const updateImage = () => {

        if (window.innerWidth < 600) {
            setImgSrc('./img/SongsHeaderImageMobile.png');
        } else if (window.innerWidth < 1024) {
            setImgSrc('./img/SongsHeaderImage1024.png');
        } else {
            setImgSrc('./img/SongsHeaderImage.png');
        }
    };

    const handleSelectValue = ( elem ) => {
        setSelectValue(elem)
        setSelectActive(false)
        setSortType(elem.key)
    }

    return (
        <div className={'pageWrapper'}>
            <div className={'pageHeaderImage'}>
                <img src={imgSrc} alt=""/>
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
                                {selectValue.value}
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
                </div>
            </div>
        </div>
    );
};

export default Reviews;