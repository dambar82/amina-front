import { Route, Routes, useLocation } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import Main from "./Pages/MainPage/Main";
import MultfilmPage from "./Pages/Multfilm/MultfilmPage";
import { useEffect } from "react";
import News from "./Pages/News";
import Songs from "./Pages/Songs/Songs";
import About from "./Pages/AboutPage/About";
import SongsText from "./Pages/SongsText/SongsText";
import Minuses from "./Pages/Minuses/Minuses";

const SITE_URL = "https://amina.tatar";
const SEO_BY_PATH = {
  "/": {
    title: "Әминә белән татар телен өйрәнәбез | Җырлар һәм мультфильмнар",
    description: "Әминә белән татар телен җырлар, мультфильмнар һәм кызыклы материаллар аша өйрәнегез. Балалар өчен бушлай белем бирү проекты.",
  },
  "/multfilm": {
    title: "Татарча мультфильмнар | Әминә",
    description: "Балалар өчен Әминә татарча мультфильмнары. Татар телен кызыклы сюжетлар һәм җырлар аша өйрәнү.",
  },
  "/songs": {
    title: "Балалар өчен татарча җырлар | Әминә",
    description: "Әминә белән татарча балалар җырларын тыңлагыз һәм татар телен җиңел өйрәнегез.",
  },
  "/songs_text": {
    title: "Татарча җыр сүзләре | Әминә",
    description: "Әминә проекты җырларының татарча текстлары. Җырлагыз, укыгыз һәм яңа сүзләр өйрәнегез.",
  },
  "/songs_minuses": {
    title: "Татарча җырларның минусовкалары | Әминә",
    description: "Балалар өчен татарча җырларның минусовкаларын тыңлагыз һәм йөкләгез.",
  },
  "/news": {
    title: "Яңалыклар | Әминә",
    description: "Әминә татар теле проектының соңгы яңалыклары, чаралары һәм яңа материаллары.",
  },
  "/about": {
    title: "Әминә проекты турында",
    description: "Балаларга татар телен җырлар һәм мультфильмнар аша өйрәтүче Әминә проекты турында.",
  },
  "/method": {
    title: "Әминә проектының методикасы",
    description: "Әминә белем бирү проектында татар телен балаларга өйрәтү методикасы.",
  },
};

const setMeta = (selector, attribute, value) => {
  const element = document.querySelector(selector);
  if (element) element.setAttribute(attribute, value);
};

function App() {
  const location = useLocation();

  useEffect(() => {
    const seo = SEO_BY_PATH[location.pathname] || SEO_BY_PATH["/"];
    const canonicalUrl = `${SITE_URL}${location.pathname === "/" ? "/" : location.pathname}`;
    document.title = seo.title;
    setMeta('meta[name="description"]', "content", seo.description);
    setMeta('meta[property="og:title"]', "content", seo.title);
    setMeta('meta[property="og:description"]', "content", seo.description);
    setMeta('meta[property="og:url"]', "content", canonicalUrl);
    setMeta('meta[name="twitter:title"]', "content", seo.title);
    setMeta('meta[name="twitter:description"]', "content", seo.description);
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute("href", canonicalUrl);

    // Отправляем хит в Яндекс.Метрику при смене роута
    if (window.ym) {
      window.ym(104538735, "hit", window.location.href);
    }

    // Логика изменения цвета фона в зависимости от маршрута
    switch (location.pathname) {
      case "/":
        document.body.style.backgroundImage = `url('./img/MainBackground.jpg')`;
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
        document.body.style.backgroundRepeat = "no-repeat";
        const mobileMenu = document.querySelector(".mobileMenu");
        if (mobileMenu) {
          mobileMenu.style.backgroundColor = "#FE89FF"; // Задайте нужный цвет
        }
        break;
      case "/multfilm":
        document.body.style.background =
          "linear-gradient(280deg, #CDBEFF -1.76%, #B8A3FF 100%)";
        const mobileMenuMultfilm = document.querySelector(".mobileMenu");
        if (mobileMenuMultfilm) {
          mobileMenuMultfilm.style.background =
            "linear-gradient(280deg, #CDBEFF -1.76%, #B8A3FF 100%)";
        }
        break;
      case "/news":
        document.body.style.background =
          "linear-gradient(279deg, #2AEB9A -1.88%, #1CD2EB 100%)";
        const mobileMenuNews = document.querySelector(".mobileMenu");
        if (mobileMenuNews) {
          mobileMenuNews.style.background =
            "linear-gradient(279deg, #2AEB9A -1.88%, #1CD2EB 100%)";
        }
        break;
      case "/reviews":
        document.body.style.background =
          "linear-gradient(280deg, #CDBEFF -1.76%, #B8A3FF 100%)";
        const mobileMenuBook = document.querySelector(".mobileMenu");
        if (mobileMenuBook) {
          mobileMenuBook.style.background =
            "linear-gradient(298deg, #739BFF 33.58%, #9B99FF 100%)";
        }
        break;
      case "/songs":
      case "/songs_minuses":
        document.body.style.background =
          "linear-gradient(280deg, #CDBEFF -1.76%, #B8A3FF 100%)";
        const mobileMenuSongs = document.querySelector(".mobileMenu");
        if (mobileMenuSongs) {
          mobileMenuSongs.style.background =
            "linear-gradient(280deg, #CDBEFF -1.76%, #B8A3FF 100%)";
        }
        break;
      case "/method":
      case "/about":
        document.body.style.background =
          "linear-gradient(297.92deg, #739BFF 33.58%, #9B99FF 100%)";
        const mobileMenuAbout = document.querySelector(".mobileMenu");
        if (mobileMenuAbout) {
          mobileMenuAbout.style.background =
            "linear-gradient(297.92deg, #739BFF 33.58%, #9B99FF 100%)";
        }
        break;
      case "/songs_text":
        document.body.style.background =
          "linear-gradient(279.48deg, #2AEB9A -1.88%, #1CD2EB 100%)";
        const mobileMenuSongsText = document.querySelector(".mobileMenu");
        if (mobileMenuSongsText) {
          mobileMenuSongsText.style.background =
            "linear-gradient(279.48deg, #2AEB9A -1.88%, #1CD2EB 100%)";
        }
        break;
      default:
        document.body.style.backgroundColor = "#fff"; // Белый для всех остальных
        break;
    }

    // Очистка при размонтировании компонента (восстановление фона по умолчанию)
    return () => {
      document.body.style.background = "#fff";
    };
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<Main />} />
        <Route path="/multfilm" element={<MultfilmPage />} />
        <Route path="/news" element={<News />} />
        {/*<Route path='/reviews' element={<Reviews/>}></Route>*/}
        <Route path="/about" element={<About />}></Route>
        <Route path="/method" element={<About />}></Route>
        <Route path="/songs" element={<Songs />} />
        <Route path="/songs_minuses" element={<Minuses />} />
        <Route path="/songs_text" element={<SongsText />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
