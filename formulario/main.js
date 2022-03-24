let inputNome = document.forms['formulario']['nome'];
let inputEmail = document.forms['formulario']['email'];
let inputTelefone = document.forms['formulario']['telefone'];
let inputSenha = document.forms['formulario']['senha'];

let containerErroNome = document.getElementById('erro_nome');
let containerErroEmail = document.getElementById('erro_email');
let containerErroTelefone = document.getElementById('erro_telefone');
let containerErroSenha = document.getElementById('erro_senha');


inputNome.addEventListener('input', verificaNome);
inputEmail.addEventListener('input', verificaEmail);
inputTelefone.addEventListener('input', verificaTelefone);
inputSenha.addEventListener('input', verificaSenha);

function validaAoEnviar(event) {
    
    if (!verificaNome() && !verificaEmail() && !verificaTelefone() && !verificaSenha()){

        //se houver alguma falha na validação, preventDefault() impede que o formulario seja enviado.
        event.preventDefault();
    }

}

function verificaNome() {

    // expressão regular para letras (inclusive acentos e cedilha) e espaços
    // o nome deve ter entre 6 e 100 caracteres
    const expressaoRegularLetrasEEspacos = /^[a-zA-Z\u00C0-\u00FF ]{6,100}$/;

    return validar(inputNome, expressaoRegularLetrasEEspacos, containerErroNome);

}


function verificaEmail() {

    // Expressão regular para email válido
    const expressaoRegularEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    return validar(inputEmail, expressaoRegularEmail, containerErroEmail);

}

function verificaTelefone() {

    // Expressão regular para telefone válido
    // o telefone pode ter 8 ou 9 digitos. Além disso, pode ter DDD com ou sem parênteses. 
    // Exemplos de telefones válidos:
    // (45) 91231-6165
    // (89) 3231-6165
    // 32 91231-6165
    // 16 3231-6164
    // 3231-6165
    // 91231-6165
    // 33271543
    // 55997180314
    const expressaoRegularTelefone = /^(\(?\d{2}\)?\s?)?(\d{4,5}\-?\d{4})$/;

    return validar(inputTelefone, expressaoRegularTelefone, containerErroTelefone);

}

function verificaSenha() {

    // Expressão regular senha
    // A senha deve ter de 8 a 15 caracteres, pelo menos uma letra minuscula, uma letra maiuscula, um número e um caracter especial
    const expressaoRegularSenha = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

    return validar(inputSenha, expressaoRegularSenha, containerErroSenha);
}

// Verifica se o valor do campo input está de acordo com uma expresão regular
// Se não estiver de acordo, torna visivel o container com a mensagem de erro e coloca o foco no campo input
function validar(campoInput, expressaoRegular, containerErro) {

    if (campoInput.value.match(expressaoRegular)) {
        containerErro.style.display = "none";
        return true;
    } else {
        containerErro.style.display = "block";

        //se o botão "enviar" é clicado e existe algum campo a ser corrigido, é preciso colocar o foco nesse campo.
        campoInput.focus();
        return false;
    }


}

