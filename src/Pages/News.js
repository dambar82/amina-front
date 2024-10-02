import React, {useEffect, useState} from 'react';
import axios from "axios";

const News = () => {

    const url = 'https://api.multfilm.tatar/api/'

    const [news, setNews] = useState([]);

    const colors = ['#94EBFF', '#FF7DB9', '#CFA0FF', '#B9FF43'];

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

            console.log(response.data.data)
        }
        getNews();
    }, [])


    return (
        <div className={'pageWrapper'}>
            <div className={'pageHeaderImage'}>
                <img src='./img/NewsHeaderImage.png' alt=""/>
            </div>
            <div className={'pageContent'}>
                <div className={'newsContent'}>
                    {
                        news.map((newsItem, index) => (
                            <div className={'newsItem'}>
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
                                        </div>}
                                    <h2>{newsItem.title}</h2>
                                    <p dangerouslySetInnerHTML={{__html: newsItem.content}}>
                                    </p>
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