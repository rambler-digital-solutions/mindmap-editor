export default class AttributesTable {

    constructor() {
        this.attributeToHTML = (attr = ['', '']) => `
        <td contenteditable class="single-line" data-input="true">${attr[0]}</td>
        <td contenteditable class="single-line" data-input="true">${attr[1]}</td>
        <td>
            <div class="td-action">
                <span class="ico arrow-up" data-btn="up"></span>
                <span class="ico arrow-down" data-btn="down"></span>
                <span class="ico cross ico-remove" data-btn="remove"></span>
            </div>
        </td>`;

        this.nodeForEdit = null;
        this.callback = null;
        this.body = document.getElementsByTagName('body')[0];

        let modal = document.createElement('div');
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

        // $('.input-note').on('keydown', function (e) {
        //     if (e.keyCode === 13) {
        //         e.preventDefault();
        //         whenEnterPressed();
        //     }
        // });
    }

    tableCreate(nodeForEdit, callback) {
        let attributes = nodeForEdit.attributes;
        let new_tbody = document.createElement('tbody');

        attributes.forEach((attr) => {

            const html = this.attributeToHTML(attr);
            const trElement = document.createElement('tr');
            trElement.insertAdjacentHTML('afterbegin', html);

            new_tbody.appendChild(trElement);
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
        const html = this.attributeToHTML();
        const trElement = document.createElement('tr');
        trElement.insertAdjacentHTML('afterbegin', html);       

        this.table_body.appendChild(trElement);
    }
}
