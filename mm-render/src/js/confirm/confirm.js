import './confirm.css';

export default class Confirm {
    
    constructor() {

        const html = `
        <div id="freezeLayer" class="freeze-layer" style="display: none;"></div>
        <div id="dialogCont" class="dlg-container">
        <div class="dlg-header">Confirm</div>
        <div id="dlgBody" class="dlg-body">Do you want to continue?</div>
        <div class="dlg-footer">
            <a class="confirm-ok" id="confirmDlgOK">OK</a>
            <a id="confirmDlgCancel">Cancel</a>
        </div>
        </div>
        `;

        document.body.innerHTML += html;
        document.getElementById('confirmDlgOK').addEventListener('click', () => {
            this.okay();
        });
        document.getElementById('confirmDlgCancel').addEventListener('click', () => {
            this.cancel();
        });
    }

    show(msg, callback, cancelCallback = null) {
        const dlg = document.getElementById('dialogCont');
        const dlgBody = dlg.querySelector('#dlgBody');
        
        dlg.style.top = '10%';
        dlg.style.opacity = 1;
        dlgBody.textContent = msg;
                
        this.callback = callback;
        this.cancelCallback = cancelCallback;
        document.getElementById('freezeLayer').style.display = '';
    }

    okay() {
        if(this.callback) {
            this.callback(); 
        }
        this.close();
    }

    cancel() {
        if(this.cancelCallback) {
            this.cancelCallback();
        }
        this.close();
    }

    close() {
        const dlg = document.getElementById('dialogCont');
        dlg.style.top = '-30%';
        dlg.style.opacity = 0;
        document.getElementById('freezeLayer').style.display = 'none';
    }
}