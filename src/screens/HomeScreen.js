import { Features } from '../data.js'

const HomeScreen = {
    render: () => {
        return `
       <ul class = "features"> 
            Features
            ${Features.map((feature) => `
            <li>
                <div class="feature">
                    <a href="/feature/${feature._id}">
                        <img src="${feature.image}" alt="${feature.name}" />
                    </a>
                    <div class="feature-name">
                        <a href="/feature/${feature._id}">
                            ${feature.name}
                        </a>
                    </div>
                </div>
            </li>
        `).join('\n')}`;
    },
};
export default HomeScreen;