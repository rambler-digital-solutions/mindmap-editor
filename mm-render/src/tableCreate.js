export function tableCreate(attributes) {

    let old_tbody = document.getElementsByTagName('tbody')[0];
    let new_tbody = document.createElement('tbody');

    attributes.forEach((attr) => {
        let key = attr[0], value = attr[1];
        let tr = document.createElement('tr');
        let tdKey = document.createElement('td');
        tdKey.appendChild(document.createTextNode(key));
        tdKey.setAttribute('contenteditable', true);

        let tdValue = document.createElement('td');
        tdValue.appendChild(document.createTextNode(value));

        // tdValue.setAttribute('rowSpan', '2');
        tdValue.setAttribute('contenteditable', true);

        tr.appendChild(tdKey);
        tr.appendChild(tdValue);

        new_tbody.appendChild(tr);
    });

    old_tbody.parentNode.replaceChild(new_tbody, old_tbody);
}

export function saveFromTable() {
    let attributes_array = [];
    let trs = document.querySelectorAll('table > tbody > tr');

    trs.forEach(function(tds){
        let temp_array = [];
        tds.querySelectorAll('td').forEach(function(element){
            temp_array.push(element.textContent);
        });
        attributes_array.push(temp_array);
    });

    return attributes_array;
}
