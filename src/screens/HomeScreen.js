import { Features } from '../data.js'

const HomeScreen = {
    after_render: () => {

    },
    render: () => {
        return `
       <ul class = "features"> 
            Features
            ${Features.map((feature) => `
            <li>
                <div class="feature">
                    <a href="/#/${feature.id}">
                        <img src="${feature.image}" alt="${feature.name}" />
                    </a>
                    <div class="feature-name">
                        <a href="/#/${feature.id}">
                            ${feature.name}
                        </a>
                    </div>
                </div>
            </li>
        `).join('\n')}`;
    },
};
export default HomeScreen;