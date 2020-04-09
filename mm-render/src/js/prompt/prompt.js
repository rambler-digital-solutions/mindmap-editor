import './prompt.css';

export default class Prompt {

    constructor() {
        const html = `
        <div id="promptFreezeLayer" class="freeze-layer" style="display: none;"></div>
        <div id="promptDialog" class="pmt-dialog">
            <div class="pmt-dlg-header">
                Custom Prompt
            </div>
            <div class="pmt-dlg-body">
                <div id="pmtDlgMessage"></div>
                <input type="text" class="pmt-dlg-input" id="dialogInputEl">    
            </div>
            <div class="pmt-dlg-footer">
                <a id="promptDlgOK">OK</a>
                <a id="promptDlgCancel">Cancel</a>
            </div>
        </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', html);

        this.dialogCont = document.getElementById('promptDialog');
        this.dialogMessage = document.getElementById('pmtDlgMessage');
        this.dlgInput = document.getElementById('dialogInputEl');
        this.freezeLayer = document.getElementById('promptFreezeLayer');

        this.setHandlers();        
    }

    setHandlers() {
        document.getElementById('promptDlgOK').addEventListener('click', () => {
            this.okay();
        });
        document.getElementById('promptDlgCancel').addEventListener('click', () => {
            this.cancel();
        });   
    }

    show(msg, defaultMsg, callback) {
        if(!defaultMsg) {
            defaultMsg = '';
        }

        this.dialogCont.style.top = '10%';
        this.dialogCont.style.opacity = 1;

        this.dialogMessage.textContent = msg;
        this.dlgInput.focus();
        this.dlgInput.value = '';
        this.callback = callback;

        this.freezeLayer.style.display = '';
    }

    okay() {       
        this.callback(this.dlgInput.value); 
        this.close();
    }

    cancel() {
        this.callback(null); 
        this.close();
    }

    close() {
        this.dialogCont.style.top = '-30%';
        this.dialogCont.style.opacity = 0;
        this.freezeLayer.style.display = 'none';
    }
}