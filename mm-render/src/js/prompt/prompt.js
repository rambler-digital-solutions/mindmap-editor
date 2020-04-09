import './prompt.css';

export default class Prompt {
    constructor() {
        const HTMLElementConfirm = `
        <div class="prompt" id="prompt-confirm">
        <div class="prompt-content">
            <span class="close-btn" id="close-btn-confirm">&times;</span>
            <p class="prompt-text" id="prompt-text-confirm"></p>
            <button class="prompt-btn prompt-cancel" id="prompt-cancel">Cancel</button>
            <button class="prompt-btn prompt-confirm" id="prompt-confirm">OK</button>
        </div>
        </div>`;

        const HTMLElementInput = `
        <div class="prompt" id="prompt-input">
        <div class="prompt-content">
            <span class="close-btn" id="close-btn-input">&times;</span>
            <p class="prompt-text" id="prompt-text-input"></p>
            <input class="prompt-input" type="text" id="input" name="input">
            <button class="prompt-btn prompt-confirm" id="prompt-submit">OK</button>
        </div>
        </div>`;
        
        document.body.insertAdjacentHTML('beforeend', HTMLElementConfirm);
        this.modalConfirm = document.getElementById('prompt-confirm');

        document.body.insertAdjacentHTML('beforeend', HTMLElementInput);
        this.modalInput = document.getElementById('prompt-input');

        this.setCloseHandlers();
        this.setConfirmHandlers();
    }

    showConfirm(text, resolveCallback) {
        this.resolveCallback = resolveCallback;

        document.getElementById('prompt-text-confirm').textContent = text;
        document.getElementById('prompt-confirm').style.display = 'block';
    }

    showInput(text) {
        document.getElementById('prompt-text-input').textContent = text;
        document.getElementById('prompt-input').style.display = 'block';
    }

    setCloseHandlers() {
        document.addEventListener('click', (event) => {            
            if (event.target == this.modalInput) {
                this.modalInput.style.display = 'none';
            } else if(event.target == this.modalConfirm) {
                this.modalConfirm.style.display = 'none';
            }
        });

        document.getElementById('close-btn-input').addEventListener('click', () => {
            this.modalInput.style.display = 'none';
        });

        document.getElementById('close-btn-confirm').addEventListener('click', () => {
            this.closeModalConfirm();
        });
    }

    setConfirmHandlers() {
        document.getElementById('prompt-cancel').addEventListener('click', () => {
            this.closeModalConfirm();
        });

        document.getElementById('prompt-confirm').addEventListener('click', () => {
            if(this.resolveCallback) { 
                throw new Error('resolveCallback is undefined');
            }
            
            this.resolveCallback();
            this.closeModalConfirm();
        });
    }

    closeModalConfirm() {
        this.modalConfirm.style.display = 'none';
    }
}