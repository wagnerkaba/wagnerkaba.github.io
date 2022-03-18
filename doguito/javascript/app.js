import {valida} from './validacao.js';

const inputs = document.querySelectorAll('input');

inputs.forEach(input => {

    // A função valida() é chamada sempre que ocorre o evento 'blur' em algum input
    // The blur event fires when an element has lost focus.
    //https://developer.mozilla.org/en-US/docs/Web/API/Element/blur_event
    input.addEventListener('blur', (evento)=> {
        valida(evento.target);
    })
})