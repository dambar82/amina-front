import React from 'react';

const Book = () => {
    return (
        <div className={'pageWrapper'}>
            <div className={'bookContent bookContentPage'}>
                <div className={'bookBlock'}>
                    <img src="./img/AminaBook.png" alt=""/>
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