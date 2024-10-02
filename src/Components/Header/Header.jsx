import React from 'react';
import styles from './Header.module.scss';
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <header className="header">
            <div className="container-fluid">
                <div className="header__block">
                    <div className="header__logo">
                        <Link to='/'>
                            <img src="/img/logo.svg" alt=""/>
                        </Link>
                        <div className="header__city"></div>
                    </div>
                    <div className="header__menu">
                        <ul>
                            <Link to='/multfilm'>
                                <li className="menuElement">
                                    Мультфильмнар
                                    <div className="appElement">
                                        <div className="appElement_box">
                                            <div className="appElement__icon"><img src="/img/icon.svg" alt=""/></div>
                                            <div className="appElement__txt">Бүлек эшләнә</div>
                                        </div>
                                    </div>
                                </li>
                            </Link>
                            <Link to='/book'>
                                <li className="menuElement">
                                    «Әминә» китабы
                                    <div className="appElement">
                                        <div className="appElement_box">
                                            <div className="appElement__icon"><img src="/img/icon.svg" alt=""/></div>
                                            <div className="appElement__txt">Бүлек эшләнә</div>
                                        </div>
                                    </div>
                                </li>
                            </Link>
                            <Link to='/songs'>
                                <li className="menuElement">
                                    Җырлар
                                    <div className="appElement">
                                        <div className="appElement_box">
                                            <div className="appElement__icon"><img src="/img/icon.svg" alt=""/></div>
                                            <div className="appElement__txt">Бүлек эшләнә</div>
                                        </div>
                                    </div>
                                </li>
                            </Link>
                            <Link to='/news'>
                                <li className="menuElement">
                                    Яңалыклар
                                    <div className="appElement">
                                        <div className="appElement_box">
                                            <div className="appElement__icon"><img src="/img/icon.svg" alt=""/></div>
                                            <div className="appElement__txt">Бүлек эшләнә</div>
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