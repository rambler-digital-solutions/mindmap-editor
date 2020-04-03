import '../../css/icons-sidebar.css';
import IconsMap from '../iconsMap';
import {SpecialIconsMap} from '../iconsMap';

export default class IconsSidebar {

    iconToHTML(key, icon) {
        return `<div class="sidebar__link" data-name="${key}" title="${key}"><span class="link__icon">${icon}</span></div>`;
    }

    getAllIcons()  {
        const specialIcons = Object.entries(SpecialIconsMap);
        const icons = Object.entries(IconsMap);
        const allIcons = specialIcons.concat(icons);

        return allIcons.map(([key, value]) => this.iconToHTML(key, value)).join('');
    }

    constructor() {
        const sidebar = document.createElement('div');
        sidebar.classList.add('sidebar');
        sidebar.classList.add('sidebar-open');

        sidebar.innerHTML = this.getAllIcons();

        const body = document.getElementsByTagName('body')[0];
        body.appendChild(sidebar);

    }
}

