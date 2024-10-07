import React, {useEffect, useState} from 'react';
import axios from "axios";

const News = () => {
    const url = 'https://api.multfilm.tatar/api/';
    const [news, setNews] = useState([]);
    const [expandedNews, setExpandedNews] = useState({});
    const colors = ['#94EBFF', '#FF7DB9', '#CFA0FF', '#B9FF43'];

    const [imgSrc, setImgSrc] = useState('./img/NewsHeaderImage.png');

    const updateImage = () => {

        if (window.innerWidth < 600) {
            setImgSrc('./img/NewsHeaderImageMobile.png');
        } else if (window.innerWidth < 1024) {
            setImgSrc('./img/NewsHeaderImage1024.png');
        } else {
            setImgSrc('./img/NewsHeaderImage.png');
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

    function formatDate(inputDate) {
        const parts = inputDate.split('-');
        if (parts.length !== 3) {
            throw new Error("Неверный формат даты. Ожидался формат DD-MM-YYYY.");
        }
        const day = parts[0];
        const month = parts[1];
        return `${day}.${month}`;
    }

    useEffect(() => {
        const getNews = async () => {
            const response = await axios.get(`${url}amina/news`);
            setNews(response.data.data);
            console.log(response.data.data);
        };
        getNews();
    }, []);

    const toggleExpansion = (index) => {
        setExpandedNews((prevState) => ({
            ...prevState,
            [index]: !prevState[index],
        }));
    };

    return (
        <div className={'pageWrapper'}>
            <div className={'pageHeaderImage'}>
                <img src={imgSrc} alt=""/>
            </div>
            <div className={'pageContent'}>
                <div className={'newsContent'}>
                    {
                        news.map((newsItem, index) => (
                            <div className={'newsItem'} key={index}>
                                <div
                                    className={'newsItem_date'}
                                    style={{ backgroundColor: colors[index % colors.length] }}
                                >
                                    {formatDate(newsItem.date)}
                                </div>
                                <div className={'newsItem_info'}>
                                    {newsItem.images[0] &&
                                        <div className={'newsItem_image'}>
                                            <img src={newsItem.images[0]} alt=""/>
                                        </div>
                                    }
                                    <div className={'newsItem_text'}>
                                        <h2>{newsItem.title}</h2>
                                        <p
                                            dangerouslySetInnerHTML={{__html: newsItem.content}}
                                            style={{
                                                padding: '10px 0',
                                                maxHeight: expandedNews[index] ? 'none' : '100px',
                                                overflow: 'hidden'
                                            }}
                                        />
                                        <div
                                            className={'readFull'}
                                            onClick={() => toggleExpansion(index)}
                                        >
                                            {expandedNews[index] ? 'Скрыть' : 'Читать полностью'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default News;