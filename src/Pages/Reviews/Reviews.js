import React, {useEffect, useRef, useState} from 'react';
import styles from './Reviews.module.scss';
import multfilmStyles from '../Multfilm/Multfilm.module.scss';
import axios from "axios";

const sort_types = [
    {key: 'new', value: 'Яңалары', endpoint: 'amina/new_feedbacks'},
    {key: 'old', value: 'Искеләре', endpoint: 'amina/old_feedbacks'},
    {key: 'photo', value: 'Фотографияләр белән', endpoint: 'amina/image_feedbacks'}
]

const organization_types = [
    {key: 'школа', value: 'Мәктәп'},
    {key: 'детский сад', value: 'Балалар бакчасы'},
    {key: 'частное лицо', value: 'Шәхси зат'},
]


const url = 'https://api.multfilm.tatar/api/';

function formatName(fullName) {
    const nameParts = fullName.split(' ');
    const firstName = nameParts[1];
    const lastNameInitial = nameParts[0].charAt(0) + '.';
    return `${firstName} ${lastNameInitial}`;
}

const Reviews = () => {

    const [imgSrc, setImgSrc] = useState('./img/oblozhki/reviewsBig.png');
    const [selectValue, setSelectValue] = useState(sort_types[0])
    const [sortType, setSortType] = useState(sort_types[0].key);
    const [selectActive, setSelectActive] = useState(false);
    const [loading, setLoading] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [overflowingReviews, setOverflowingReviews] = useState({});
    const textRef = useRef(null);
    const [showForm, setShowForm] = useState(false);
    const [selectOrganizationValue, setSelectOrganizationValue] = useState(organization_types[0]);
    const [organizationSelectActive, setOrganizationSelectActive] = useState(false);
    const [districtsSelectActive, setDistrictsSelectActive] = useState(false);
    const [organizationType, setOrganizationType] = useState(organization_types[0].key);
    const [districts, setDistricts] = useState([]);
    const [districtValue, setDistrictValue] = useState(null);
    const [organizationName, setOrganizationName] = useState('');
    const [fio, setFio] = useState('');
    const [job, setJob] = useState('');
    const [email, setEmail] = useState('');
    const fileInputRef = React.useRef(null);
    const [files, setFiles] = useState([])

    const handleAttachClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const selectedFiles  = event.target.files;
        const newFiles = Array.from(selectedFiles).map((file, index) => ({
            id: Date.now() + index, // уникальный id для каждого файла
            file: file
        }));
        setFiles(prevFiles => [...prevFiles, ...newFiles]);
    };

    const [formData, setFormData] = useState({
        institution: "Мәктәп",
        city: "Казань",
        name: "",
        job: "",
        email: "",
        experience: "",
        file: null,
    });

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

    useEffect(() => {
        const fetchDistricts = async () => {
            const response = await axios.get(`${url}amina/districts`);
            console.log('disctricts', response.data);
            setDistricts(response.data)
            setDistrictValue(response.data[0])
        }
        fetchDistricts()
    }, [])

    const handleSelectValue = ( elem ) => {
        setSelectValue(elem)
        setSelectActive(false)
        setSortType(elem.key)
    }

    const handleSelectOrganization = ( elem ) => {
        setSelectOrganizationValue(elem)
        setOrganizationSelectActive(false);
        setOrganizationType(elem.key)
    }

    const handleSelectDistrict = ( elem ) => {
        setDistrictValue(elem);
        setDistrictsSelectActive(false);
    }

    const [expandedReviews, setExpandedReviews] = useState({});

    const toggleExpand = (id) => {
        setExpandedReviews((prev) => ({
            ...prev,
            [id]: !prev[id], // Переключаем состояние конкретной песни
        }));
    };

    useEffect(() => {
        const checkOverflow = () => {
            const newOverflowingReviews = {};
            reviews.forEach(review => {
                const textElement = document.getElementById(`review-text-${review.id}`);
                if (textElement) {
                    const prevMaxHeight = textElement.style.maxHeight;
                    textElement.style.maxHeight = "none"; // Убираем ограничение
                    const fullHeight = textElement.scrollHeight;
                    textElement.style.maxHeight = prevMaxHeight; // Возвращаем обратно
                    newOverflowingReviews[review.id] = fullHeight > 110;
                }
            });
            setOverflowingReviews(newOverflowingReviews);
        };

        checkOverflow();
    }, [reviews]);

    const deleteFile = ( fileId ) => {
        setFiles(prev => prev.filter(el => el.id !== fileId))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
    }

    return (
        <>
            {showForm && (
                <div className={styles.overlay} onClick={() => setShowForm(false)}>
                    <div className={styles.reviewForm} onClick={(e) => e.stopPropagation()}>
                        <h1>Фикер калдырырга</h1>
                        <form onSubmit={handleSubmit}>
                            <div className={styles.inputs}>
                                <div className={styles.grid}>
                                    <div className={styles.select}>
                                        <label className={styles.label}>Оешма төре</label>
                                        <div className={styles.select_wrapper}>
                                            <div className={`${styles.value} ${organizationSelectActive ? styles._active : ''}`}
                                                onClick={() => {setOrganizationSelectActive(prev => !prev); setDistrictsSelectActive(false)}}
                                            >
                                                <span>{selectOrganizationValue.value}</span>
                                            </div>
                                            <div className={styles.select_values}>
                                                {organization_types.map(elem => (
                                                    <div
                                                        key={elem.key}
                                                        onClick={() => handleSelectOrganization(elem)}
                                                        className={elem.key === selectOrganizationValue.key ? styles._active : ''}
                                                    >
                                                        {elem.value}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.select}>
                                        <label className={styles.label}>Төбәк</label>
                                        <div className={styles.select_wrapper}>
                                            <div className={`${styles.value} ${districtsSelectActive ? styles._active : ''}`}
                                                 onClick={() => {setDistrictsSelectActive(prev => !prev); setOrganizationSelectActive(false)}}
                                            >
                                                <span>{districtValue.title}</span>
                                            </div>
                                            <div className={styles.select_values}>
                                                {districts.map(elem => (
                                                    <div
                                                        key={elem.title}
                                                        onClick={() => handleSelectDistrict(elem)}
                                                        className={elem.title === districtValue.title ? styles._active : ''}
                                                    >
                                                        {elem.title}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {organizationType !== 'частное лицо' && (
                                    <div className={styles.input_wrapper}>
                                        <label>Учреждение исеме</label>
                                        <div className={styles.input_custom}>
                                            <input
                                                type="text"
                                                placeholder='Мәктәп/лицей исеме'
                                                onChange={(e) => setOrganizationName(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                )}
                                <div className={styles.grid}>
                                    <div className={styles.input_wrapper}>
                                        <label>ФИО</label>
                                        <div className={styles.input_custom}>
                                            <input
                                                type="text"
                                                placeholder='Исемегезне яки тулы исем-фамилиягезне күрсәтегез'
                                                onChange={(e) => setFio(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className={styles.input_wrapper}>
                                        <label>Вазыйфа</label>
                                        <div className={styles.input_custom}>
                                            <input
                                                type="text"
                                                placeholder='Мәсәлән: Укытучы, Тәрбияче'
                                                onChange={(e) => setJob(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.input_wrapper}>
                                    <label>Почта</label>
                                    <div className={styles.input_custom}>
                                        <input
                                            type="email"
                                            placeholder='Электрон почта'
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className={styles.input_wrapper}>
                                    <label>Үз тәҗрибәгез турында сөйләгез</label>
                                    <div className={styles.input_custom}>
                                        <div className={styles.textarea_wrapper}>
                                            <textarea
                                               type="text"
                                               placeholder='Бәяләмә тексты. Нәрсә ошады? Нәрсәне яхшыртырга мөмкин? Балаларның мультсериалга мөнәсәбәте?'
                                            />
                                            <div className={styles.textarea_wrapper_low}>
                                                <button onClick={handleAttachClick}><img src="./img/attachPic.svg" alt=""/><span>Рәсем өстәргә</span></button>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    ref={fileInputRef}
                                                    style={{ display: 'none' }}
                                                    onChange={handleFileChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {files.length > 0 && (
                                <div className={styles.files}>
                                    {files.map(file => (
                                        <div key={file.id} className={styles.file}>
                                            <span>{file?.file.name}</span>
                                            <img src="./img/deletePic.svg" alt="" onClick={() => deleteFile(file.id)}/>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <div className={styles.buttons}>
                                <button className={`${styles.button} ${styles.button_pink}`}>
                                    Фикер калдырырга
                                </button>
                                <button className={`${styles.button}`} onClick={() => setShowForm(false)}>
                                    Фикер калдырырга
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            <div className={'pageWrapper'}>
                <div className={'pageHeaderImage'}>
                    <img src={imgSrc} alt=""/>
                    <span>Бәяләмәләр</span>
                </div>
                <div className={'pageContent'}>
                    <div className={styles.reviews}>
                        <div className={styles.reviews_header}>
                            <button className={`${styles.button} ${styles.button_pink}`} onClick={() => setShowForm(true)}>
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
                                    <div className={styles.cardHeader}>
                                        <div className={styles.avatar}>
                                            <img src={review.creator === "частное лицо" ? './img/personPic.png' : review.creator === "школа" ? './img/schoolPic.png' : review.creator === "организация" && './img/sadikPic.png'} alt=""/>
                                        </div>
                                        <div className={styles.textPart}>
                                            <div className={styles.name}>
                                                <div className={styles.fio}>
                                                    {formatName(review.fio)}
                                                </div>
                                                <div className={styles.org}>
                                                    {review.organization? review.organization : 'Частное лицо'}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.content}>
                                        <div
                                            ref={textRef}
                                            className={`${styles.text} ${expandedReviews[review.id] ? styles.expanded : ""}`}>{review.text}</div>
                                        {(overflowingReviews[review.id] || expandedReviews[review.id]) && (
                                            <div
                                                className={styles.showMoreButton}
                                                onClick={() => toggleExpand(review.id)}
                                            >
                                                {expandedReviews[review.id] ? "Төреп куярга" : "Тулысынча күрсәтергә"}
                                            </div>
                                        )}
                                        {review.images?.length > 0 && (
                                            <div className={`${styles.images} ${review.images.length === 1 ? styles.singleImage : styles.multipleImages}`}>
                                                {review.images.map((image, index) => (
                                                    <img key={index} src={image} alt="Отзыв" />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
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
        </>
    );
};

export default Reviews;