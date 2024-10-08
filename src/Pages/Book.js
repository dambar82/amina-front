import React, {useState} from 'react';

const Book = () => {

    const pages = [
        './img/book/Эминэ_книга1 — копия.png',
        './img/book/Эминэ_книга14.png',
        './img/book/Эминэ_книга24.png',
        './img/book/Эминэ_книга28.png',
        './img/book/Эминэ_книга.png'
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const goToNextPage = () => {
        setCurrentIndex((currentIndex + 1) % pages.length);
    };

    const goToPrevPage = () => {
        setCurrentIndex((currentIndex - 1 + pages.length) % pages.length);
    };

    return (
        <div className={'pageWrapper'}>
            <div className={'bookContent bookContentPage'}>
                <div className={'bookBlock'}>
                    <div className="slider">
                        <div onClick={goToPrevPage} className="arrow left">
                            <img src="./img/left.svg" alt=""/>
                        </div>
                        <div className="pages-container">
                            <img src={pages[(currentIndex - 1 + pages.length) % pages.length]} alt="Previous Page" className="page previous" />
                            <img src={pages[currentIndex]} alt="Current Page" className="page current" />
                            <img src={pages[(currentIndex + 1) % pages.length]} alt="Next Page" className="page next" />
                        </div>

                        <div onClick={goToNextPage} className="arrow right">
                            <img src="./img/right.svg" alt=""/>
                        </div>
                    </div>
                </div>
                <div className={'bookTextBlock'}>
                    <div className={'bookText'}>
                        <h2>«Әминә» китабы</h2>
                        <p>
                            Амина – обычная девочка, которая вдруг оказывается в мире, полном тайн и загадок. Её ждут захватывающие приключения, магические существа и неожиданные открытия. Но самое главное – Амина должна понять, что её истинная сила скрыта в сердце и доброте. Она столкнётся с вызовами, которые изменят не только её жизнь, но и судьбу целого мира.
                        </p>
                        <p>
                            Готов ли ты отправиться вместе с ней в это удивительное путешествие? Нажми на кнопку и открой для себя мир волшебства, дружбы и смелости!
                        </p>
                    </div>
                    <div className={'readButton'}>
                        Читать
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Book;