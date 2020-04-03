import '../../css/icons-sidebar.css';
import IconsMap from '../iconsMap';

export default class IconsSidebar {

    iconToHTML(key, icon) {
        return `<div class="sidebar__link" data-name="${key}"><span class="link__icon">${icon}</span></div>`;
    }

    constructor() {
        const sidebar = document.createElement('div');
        sidebar.classList.add('sidebar');
        sidebar.classList.add('sidebar-open');

        sidebar.innerHTML = Object.entries(IconsMap).map(([key, value]) => this.iconToHTML(key, value)).join('');

        const body = document.getElementsByTagName('body')[0];
        body.appendChild(sidebar);
        
    }
}

