import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

const Main = () => {

    const url = 'https://api.multfilm.tatar/api/'

    const [news, setNews] = useState([]);

    const [selectedNews, setSelectedNews] = useState(null)

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

    useEffect(() => {
        if (news.length > 0) {
            setSelectedNews(news[0]);
        }
    }, [news])

    const handleNewsClick = (newsItem) => {
        setSelectedNews(newsItem); // Устанавливаем выбранную новость
    };

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
                                Амина — девочка, которая своим добром и смелостью завоевала сердца многих. Мультфильм рассказывает о её увлекательных приключениях, где она вместе с друзьями преодолевает трудности и находит радость в каждом дне. Эти истории полны тепла и вдохновения как для детей, так и для взрослых.
                            </p>
                        </div>
                    </div>
                    <div className={'blockBottom'}>
                        <div className={'blockBottom_block'}>
                            <Link to='/'>
                                <img src="./img/rightBlock.png" alt=""/>
                            </Link>
                        </div>
                        <div className={'blockBottom_block'}>
                            <img src="./img/Amina.png" alt=""/>
                        </div>
                        <div className={'blockBottom_block'}>
                            <img src="./img/leftBlock.png" alt=""/>
                        </div>
                    </div>
                </div>
                <div className={'mainContent_blockGreen'}>
                    <div className={'blockHigh'}>
                        <div className={'blockHigh_headerPic'}>
                            <img src="./img/greenHeader.png" alt=""/>
                        </div>
                    </div>
                    <div className={'greenBlock_bottom'}>
                        {news.length > 0 && (
                          <>
                              <div className={'selectedNews'}>
                                  {
                                      selectedNews?.images[0] && (
                                          <div className={'selectedNews_image'}>
                                              <img src={selectedNews.images[0]} alt=""/>
                                          </div>
                                      )
                                  }
                                  <div className={'selectedNews_text'}>
                                      <h2>{selectedNews?.title}</h2>
                                      <p dangerouslySetInnerHTML={{__html: selectedNews?.content}}></p>
                                  </div>
                              </div>
                              <div className={'newsList'}>
                                  {news
                                      .slice(0,3).filter((newsItem) => newsItem.id !== selectedNews?.id) // Исключаем выбранную новость
                                      .map((newsItem) => (
                                          <div
                                              key={newsItem.id}
                                              className={'newsList_item'}
                                              onClick={() => handleNewsClick(newsItem)} // По клику на новость меняем выбранную
                                          >
                                              <div className={'newsItem_date'}>
                                                  {formatDate(newsItem.date)}
                                              </div>
                                              <div className={'newsItem_info'}>
                                                  <h2>{newsItem.title}</h2>
                                                  <p dangerouslySetInnerHTML={{__html: newsItem.content}}>
                                                  </p>
                                              </div>
                                          </div>
                                      ))}
                              </div>
                          </>
                        )}
                    </div>
                    <Link to='/news'>
                        <div className={'showMoreButton'}>
                            <span>Показать больше</span>
                            <img src="./img/arrow.png" alt=""/>
                        </div>
                    </Link>
                </div>
                <div className={'mainContent_blockPurpleSecond'}>
                    <div className={'blockHigh'}>
                        <div className={'blockHigh_headerPic'}>
                            <img src="./img/bookHeader.png" alt=""/>
                        </div>
                    </div>
                    <div className={'blockBottom'} style={{justifyContent: 'space-between'}}>
                        <div className={'bookPic'}>
                            <img src="./img/Book.jpg" alt=""/>
                        </div>
                        <div className={'bookTextBlock'}>
                            <p style={{color: 'white'}}>
                                Откройте захватывающий мир, полный тайн и волшебства, вместе с Аминой — храброй девочкой, которая отправляется в невероятное приключение, чтобы раскрыть древние секреты своего народа. Вас ждут удивительные персонажи, неожиданные повороты и мир, где дружба и отвага побеждают любые преграды. Погрузитесь в историю, которая вдохновляет и учит верить в себя."
                            </p>
                            <Link to='/book'>
                                <div className={'readButton'}>
                                    Читать книгу
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className={'main_footer'}>
                    <p>
                        Проект реализован студией "Татармультфильм" по заказу мэрии Казани  и направлен на развитие культурного и образовательного контента для детей.
                    </p>
                    <p>
                        © 2024 «Амина». Все права защищены. Использование материалов сайта возможно только с письменного разрешения.
                    </p>
                </div>
            </div>
        </>
    );
};

export default Main;