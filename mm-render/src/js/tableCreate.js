export default class AttributesTable {

    constructor() {
        this.attributeToHTML = (id, attr = ['', '']) => `
        <td maxlength="10" contenteditable class="single-line" data-input="true">${attr[0]}</td>
        <td maxlength="10" contenteditable class="single-line" data-input="true">${attr[1]}</td>
        <td>
            <div class="td-action">
                <span class="ico arrow-up" data-btn="up" data-id="${id}"></span>
                <span class="ico arrow-down" data-btn="down" data-id="${id}"></span>
                <span class="ico cross ico-remove" data-btn="remove" data-id="${id}"></span>
            </div>
        </td>`;

        this.nodeForEdit = null;
        this.callback = null;
        this.body = document.getElementsByTagName('body')[0];

        const modal = document.createElement('div');
        modal.classList.add('bg-modal');
        modal.innerHTML = `
        <div class="modal-content">
            <div class="table-title">
                <h2>Edit Attributes</h2>
                <div class="modal-button">
                    <button id="save-attributes" class="btn btn-save">Save</button>
                    <button id="add-attribute" class="btn btn-add">Add</button>
                    <span id="close-modal" class="ico ico-close cross"></span>
                </div>
            </div>
            <table>
                <col style="width:20%">
                <col style="width:60%">
                <thead>
                <tr>
                    <td>Key</td>
                    <td>Value</td>
                    <td>Actions</td>
                </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>`;

        const clickListener = event => {
            if (event.target.dataset.btn) {
                const btnType = event.target.dataset.btn;
                const id = +event.target.dataset.id;
                const currentElement = document.querySelector(`tr[data-id="${id}"]`);

                switch(btnType) {
                    case 'up':
                        const previousSibling = currentElement.previousSibling;
                        
                        if (previousSibling) {
                            currentElement.parentElement.insertBefore(currentElement, previousSibling);
                        }
                        break;
                    case 'down':
                        const nextSibling = currentElement.nextSibling;
                        
                        if (nextSibling) {
                            currentElement.parentElement.insertBefore(currentElement, nextSibling.nextSibling);
                        }
                        break;
                    case 'remove':
                        currentElement.remove();
                        this.attributes_count--;
                        break;
                }
            }
        }

        const keydownListener = event => {
            if (event.target.dataset.input) {
                if (event.keyCode === 13) {
                    event.preventDefault();
                }
                else if (String.fromCharCode(event.keyCode).match(/(\w|\s)/g) && event.target.textContent.length > 10) {
                    if(true) { 
                        event.preventDefault();
                    }

                    recDescription.Document.InsertText(recDescription.Document.Selection.Start, Clipboard.GetText());
                }
            }
        };

        modal.addEventListener('click', clickListener);
        modal.addEventListener('keydown', keydownListener);

        this.body.appendChild(modal);
        this.table_body = document.getElementsByTagName('tbody')[0];

        document.getElementById('add-attribute').addEventListener('click', () => {
            this.addRow();
        });

        document.getElementById('close-modal').addEventListener('click', () => {
            document.querySelector('.bg-modal').style.display = 'none';
            this.callback();
            this.callback = null;
        });

        document.getElementById('save-attributes').addEventListener('click', () => {
            this.saveFromTable();
            document.querySelector('.bg-modal').style.display = 'none';
            this.callback();
            this.callback = null;
        });
    }

    tableCreate(nodeForEdit, callback) {
        this.attributes_count = 0;
        this.attributes = nodeForEdit.attributes;
        let new_tbody = document.createElement('tbody');

        this.attributes.forEach((attr, index) => {

            const html = this.attributeToHTML(index, attr);
            const trElement = document.createElement('tr');
            trElement.dataset.id = index;
            trElement.insertAdjacentHTML('afterbegin', html);

            new_tbody.appendChild(trElement);
            this.attributes_count++;
        });

        this.table_body.parentNode.replaceChild(new_tbody, this.table_body);
        this.table_body = new_tbody;
        this.nodeForEdit = nodeForEdit;
        this.callback = callback;
    }

    saveFromTable() {
        let attributes_array = [];
        let trs = document.querySelectorAll('table > tbody > tr');

        trs.forEach(function(tds){
            let temp_array = [];
            tds.querySelectorAll('td').forEach(function(element){
                temp_array.push(element.textContent);
            });
            attributes_array.push(temp_array);
        });

        this.nodeForEdit.attributes = attributes_array;
        this.nodeForEdit = null;
    }

    addRow() {
        if(this.attributes_count >= 6) {
            return;
        }

        const html = this.attributeToHTML(this.attributes.length);
        const trElement = document.createElement('tr');
        
        trElement.dataset.id = this.attributes.length;
        this.attributes.push(['', '']);
        trElement.insertAdjacentHTML('afterbegin', html);       

        this.table_body.appendChild(trElement);
        this.attributes_count++;
    }
    
    isCharacterKeyPress(evt) {
        if (typeof evt.which == "undefined") {
            // This is IE, which only fires keypress events for printable keys
            return true;
        } else if (typeof evt.which == "number" && evt.which > 0) {
            // In other browsers except old versions of WebKit, evt.which is
            // only greater than zero if the keypress is a printable key.
            // We need to filter out backspace and ctrl/alt/meta key combinations
            return !evt.ctrlKey && !evt.metaKey && !evt.altKey && evt.which != 8;
        }
        return false;
    }
}

