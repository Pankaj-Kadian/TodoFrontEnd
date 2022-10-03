import AboutUsScreen from './screens/AboutUsScreen.js';
import Error404Screen from './screens/Error404Screen.js';
import HomeScreen from './screens/HomeScreen.js';
import SchemaScreen from './screens/SchemaScreen.js';
import TestScreen from './screens/TestScreen.js';
import { parseRequestUrl } from './utils.js';
import './style.css';
const routes = {
    "/": HomeScreen,
    "/schema": SchemaScreen,
    "/tests/:id": TestScreen,
    "about_us": AboutUsScreen,
};
const router = () => {
    const request = parseRequestUrl();
    const parseUrl =
        (request.resource ? `/${request.resource}` : '/') +
        (request.id ? '/:id' : '') +
        (request.verb ? `/${request.verb}` : '');
    const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;
    const main = document.getElementById('main-container');
    main.innerHTML = screen.render();
    screen.after_render();
};
window.addEventListener('load', router);
window.addEventListener('hashchange', router);