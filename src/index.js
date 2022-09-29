import HomeScreen from "./screens/HomeScreen.js"


const router = () => {
    const mainEl = document.getElementById("main-container")
    mainEl.innerHTML = HomeScreen.render()
};

window.addEventListener('load', router)
