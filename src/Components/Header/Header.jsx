import React, {useState} from 'react';
import styles from './Header.module.scss';
import {Link, useLocation} from "react-router-dom";

const Header = () => {
    const location = useLocation();
    const [mobileMenuShow, setMobileMenuShow] = useState(false);

    const getBackgroundColor = () => {
        switch (location.pathname) {
            case '/':
                return styles.mainBackground;
            case '/multfilm':
                return styles.multfilmBackground; // Замените на ваш класс или стиль
            case '/songs':
                return styles.songsBackground; // Замените на ваш класс или стиль
            case '/reviews':
                return styles.reviewsBackground; // Замените на ваш класс или стиль
            default:
                return ''; // Замените на ваш класс или стиль по умолчанию
        }
    };

    return (
        <header className="header">
            {mobileMenuShow && (
                <div className={`mobileMenu ${getBackgroundColor()}`}>
                    <div className="mobileMenu_menu" >
                        <ul>
                            <Link to='/multfilm'>
                                <li className={`mobileMenu_Element`}>
                                    Мультфильмнар
                                </li>
                            </Link>
                            <Link to='/songs'>
                                <li className="mobileMenu_Element">
                                    Җырлар
                                </li>
                            </Link>
                            <Link to='/reviews'>
                                <li className="mobileMenu_Element">
                                    Отзывлар
                                </li>
                            </Link>
                        </ul>
                    </div>
                    <div className={'burger'} onClick={() => setMobileMenuShow(false)}>
                        <img src="./img/closeMobileIcon.png" alt=""/>
                    </div>
                </div>
            )}
            <div className="container-fluid">
                <div className="header__block">
                    <div className="header__logo">
                        <Link to='/'>
                            <img src="/img/logo.svg" alt=""/>
                        </Link>
                        <div className="header__city"></div>
                    </div>
                    <div className={'burger'} onClick={() => setMobileMenuShow(true)}>
                        <img src="./img/burgerIcon.svg" alt=""/>
                    </div>
                    <div className="header__menu">
                        <ul>
                            <Link to='/multfilm'>
                                <li className={`menuElement ${location.pathname === '/multfilm' ? `${styles.active} ${styles.active_multfilm}` : ''}`}>
                                    Мультфильмнар
                                    <div className="appElement">
                                        <div className="appElement_box">
                                            <div className="appElement__icon"><img src="/img/icon.svg" alt=""/></div>
                                            <div className="appElement__txt">Бүлек эшләнә</div>
                                        </div>
                                    </div>
                                </li>
                            </Link>
                            <Link to='/reviews'>
                                <li className={`menuElement ${location.pathname === '/reviews' ? `${styles.active} ${styles.active_multfilm}` : ''}`}>
                                    Отзывлар
                                    <div className="appElement">
                                        <div className="appElement_box">
                                            <div className="appElement__icon"><img src="/img/icon.svg" alt=""/></div>
                                            <div className="appElement__txt">Отзывлар</div>
                                        </div>
                                    </div>
                                </li>
                            </Link>
                            <Link to='/songs_text'>
                                <li className={`menuElement ${location.pathname === '/songs_text' ? `${styles.active} ${styles.active_about}` : ''}`}>
                                    Җыр сүзләре
                                    <div className="appElement">
                                        <div className="appElement_box">
                                            <div className="appElement__icon"><img src="/img/icon.svg" alt=""/></div>
                                            <div className="appElement__txt">Җыр сүзләре </div>
                                        </div>
                                    </div>
                                </li>
                            </Link>
                            <Link to='/songs'>
                                <li className={`menuElement ${location.pathname === '/songs' ? `${styles.active} ${styles.active_songs}` : ''}`}>
                                    Җырлар
                                    <div className="appElement">
                                        <div className="appElement_box">
                                            <div className="appElement__icon"><img src="/img/icon.svg" alt=""/></div>
                                            <div className="appElement__txt">Бүлек эшләнә</div>
                                        </div>
                                    </div>
                                </li>
                            </Link>
                            <Link to='/about'>
                                <li className={`menuElement ${location.pathname === '/about' ? `${styles.active} ${styles.active_about}` : ''}`}>
                                    Проект турында
                                    <div className="appElement">
                                        <div className="appElement_box">
                                            <div className="appElement__icon"><img src="/img/icon.svg" alt=""/></div>
                                            <div className="appElement__txt">Проект турында</div>
                                        </div>
                                    </div>
                                </li>
                            </Link>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;