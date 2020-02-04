export default class AttributesTable {
    constructor() {
        this.nodeForEdit = null;
        this.callback = null;
        this.body = document.getElementsByTagName('body')[0];

        let bgModal = document.createElement('div');
        bgModal.className = 'bg-modal';
        bgModal.innerHTML = `
        <div class="modal-content">
            <div id="close-icon" class="close">+</div>
            <div id="add-icon" class="table-add">+</div>

            <table>
                <col style="width:30%">
                <col style="width:70%">
                <thead>
                <tr>
                    <td>Key</td>
                    <td>Value</td>
                </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>`;

        this.body.appendChild(bgModal);
        this.table_body = document.getElementsByTagName('tbody')[0];

        document.getElementById('add-icon').addEventListener('click', () => {
            this.addRow();
        });

        document.getElementById('close-icon').addEventListener('click', () => {
            this.saveFromTable();
            document.querySelector('.bg-modal').style.display = 'none';
            this.callback();
            this.callback = null;
        });
    }

    tableCreate(nodeForEdit, callback) {
        let attributes = nodeForEdit.attributes;
        let new_tbody = document.createElement('tbody');

        attributes.forEach((attr) => {
            let key = attr[0], value = attr[1];
            let tr = document.createElement('tr');
            let tdKey = document.createElement('td');
            tdKey.appendChild(document.createTextNode(key));
            tdKey.setAttribute('contenteditable', true);

            let tdValue = document.createElement('td');
            tdValue.appendChild(document.createTextNode(value));
            tdValue.setAttribute('contenteditable', true);

            tr.appendChild(tdKey);
            tr.appendChild(tdValue);

            new_tbody.appendChild(tr);
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
        let tr = document.createElement('tr');
        let tdKey = document.createElement('td');
        tdKey.setAttribute('contenteditable', true);

        let tdValue = document.createElement('td');
        tdValue.setAttribute('contenteditable', true);

        tr.appendChild(tdKey);
        tr.appendChild(tdValue);

        this.table_body.appendChild(tr);
    }
}
