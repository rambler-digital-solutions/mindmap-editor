import '../css/style.css';
import '../css/menu-style.css';
import '../css/context-menu-style.css';
import '../../favicon.ico';
import * as $ from 'jquery';
import { saveAs } from "file-saver";
import MindMapRender from 'mm-render/src/js/mm-render';

const mmRender = new MindMapRender();

const btnNew = document.getElementById('new');
const btnOpen = document.getElementById('open');
const btnSaveJSON = document.getElementById('saveAsJSON');
const btnSaveXML = document.getElementById('saveAsXML');
const btnExpandAll = document.getElementById('expandAll');
const btnCollapseAll = document.getElementById('collapseAll');
const btnFocusRoot = document.getElementById('focusRoot');
const fileInput = document.getElementById('fileInput');
const btnRemoveTested = document.getElementById('removeTested');
const btnRemoveBug = document.getElementById('removeBug');
const btnShowAttributes = document.getElementById('showAttributes');

let isOpen = false;

function submitClosing(callback) {
    if (isOpen) {
        mmRender.confirm.show('You will close the current file! Proceed?', callback);
    } else {
        callback();
    }
}

btnNew.addEventListener('click', () => {
    submitClosing(() => {
        mmRender.open();
        toggleOpen();
    });
});

btnSaveJSON.addEventListener('click', () => {
    if (isOpen) {
        saveAsJson();
    } else {
        mmRender.showError('No thing to save!');
    }
});

btnSaveXML.addEventListener('click', () => {
    if (isOpen) {
        mmRender.exportFreemind();
    } else {
        mmRender.showError('No thing to save!');
    }
});

btnExpandAll.addEventListener('click', () => {
    mmRender.expandAllNodes();
});

btnCollapseAll.addEventListener('click', () => {
    mmRender.collapseAll();
});

btnFocusRoot.addEventListener('click', () => {
    mmRender.focusRoot();
});

btnOpen.onclick = function(e) {
    if (isOpen) {
        mmRender.confirm.show('You will close the current file! Proceed?', () => fileInput.click());
    } else {
        fileInput.click();
    }
}

btnOpen.addEventListener('change', () => {
    let selectedFile = fileInput.files[0];
    try {
        mmRender.open(selectedFile);
        toggleOpen();
    } catch (e) {
        mmRender.showError(e.message);
    }
});

$(".drop").mouseover(function () {
    $(this).children('.dropdown').show();

});

$(".drop").mouseleave(function () {
    $(this).children('.dropdown').hide();
});

function toggleOpen() {
    isOpen = true;

    document.querySelectorAll('.toggle').forEach((elem) => {
        elem.style.display = 'block';
    });
}

function saveAsJson() {
    let blob = new Blob([mmRender.getTreeData()], {type: "application/json"});
    saveAs(blob, `${mmRender.reader.fileName}.json`);
}

btnRemoveTested.addEventListener('click', () => {
    mmRender.removeFlags('isTested');
});

btnRemoveBug.addEventListener('click', () => {
    mmRender.removeFlags('isBug');
});

btnShowAttributes.addEventListener('click', () => {
    mmRender.toggleAttributes();
});

document.getElementById('showIcons').addEventListener('click', () => {
    document.querySelector('.sidebar').classList.toggle('sidebar-open');
});

window.onresize = function() {
    mmRender.init();
};