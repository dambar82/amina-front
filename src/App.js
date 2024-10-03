import {Route, Routes, useLocation} from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import Main from "./Pages/Main";
import MultfilmPage from "./Pages/MultfilmPage";
import {useEffect} from "react";
import News from "./Pages/News";
import Book from "./Pages/Book";
import Songs from "./Pages/Songs";

function App() {

    const location = useLocation();

    useEffect(() => {
        // Логика изменения цвета фона в зависимости от маршрута
        switch (location.pathname) {
            case '/':
                document.body.style.backgroundImage = `url('./img/MainBackground.jpg')`;
                document.body.style.backgroundSize = '100% auto'; // Ширина на 100%, высота пропорциональна
                document.body.style.backgroundPosition = 'top'; // Привязка к верхней части
                document.body.style.backgroundRepeat = 'no-repeat'; // Без повторений
              //  document.body.style.minHeight = '5100px';
                break;
            case '/multfilm':
                document.body.style.background = 'linear-gradient(180deg, #C5E5FF 0%, #CDBEFF 100%)';
                break;
            case '/news':
                document.body.style.background = 'linear-gradient(150.93deg, #C8E8FF 18.23%, #1CD2EB 82.5%)';
                break;
            case '/book':
                document.body.style.background = 'linear-gradient(298deg, #739BFF 33.58%, #9B99FF 100%)';
                break;
            case '/songs':
                document.body.style.background = 'linear-gradient(280deg, #CDBEFF -1.76%, #B8A3FF 100%)';
                break;
            default:
                document.body.style.backgroundColor = '#fff'; // Белый для всех остальных
                break;
        }

        // Очистка при размонтировании компонента (восстановление фона по умолчанию)
        return () => {
            document.body.style.background = '#fff';
        };
    }, [location.pathname]);

  return (
      <Routes>
        <Route path='/' element={<MainLayout/>}>
            <Route path='/' element={<Main/>}/>
            <Route path='/multfilm' element={<MultfilmPage/>}/>
            <Route path='/news' element={<News/>}/>
            <Route path='/book' element={<Book/>}/>
            <Route path='/songs' element={<Songs/>}/>
        </Route>
      </Routes>
  );
}

export default App;
