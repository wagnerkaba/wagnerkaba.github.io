export function valida(input) {
    const tipoDeInput = input.dataset.tipo;

    // verifica se input é válido
    // para entender, vide pasta notas-de-aula, o arquivo "function-as-object-property.js"
    if (validadores[tipoDeInput]) {
        validadores[tipoDeInput](input)
    }

    // se o input digitado pelo usuário não for válido, a classe "input-container--invalido" é utilizada para mostrar mensagem de erro
    if (input.validity.valid) {
        input.parentElement.classList.remove('input-container--invalido');
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = '';
    } else {
        input.parentElement.classList.add('input-container--invalido');
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = mostraMensagemDeErro(tipoDeInput, input);
    }
}


//---------------------------------------------------------
// ARRAY com TIPOS DE ERRO que input.validity pode retornar
const tiposDeErro = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'customError'
]


//---------------------------------------------------------
// TODAS AS MENSAGENS DE ERRO EXISTENTES
const mensagensDeErro = {
    nome: {
        valueMissing: 'O campo nome não pode estar vazio.'
    },
    email: {
        valueMissing: 'O campo de email não pode estar vazio',
        typeMismatch: 'O email digitado não é válido.'
    },
    senha: {
        valueMissing: 'O campo de senha não pode estar vazio.',
        patternMismatch: 'A senha deve ter entre 4 e 20 caracteres e pelo menos um numero'
    },
    dataNascimento: {
        valueMissing: 'O campo de data de nascimento não pode estar vazio.',
        customError: 'Você deve ser maior que 18 anos para se cadastrar'
    },
    cpf: {
        valueMissing: 'O campo de cpf não pode estar vazio.',
        customError: 'O CPF digitado não é válido.'
    },
    cep: {
        valueMissing: 'O campo de CEP não pode estar vazio.',
        patternMismatch: 'O CEP digitado não é válido.',
        customError: 'O CEP informado não existe'
    },
    logradouro: {
        valueMissing: 'O campo de logradouro não pode estar vazio.',
    },
    cidade: {
        valueMissing: 'O campo de cidade não pode estar vazio.',
    },
    estado: {
        valueMissing: 'O campo de estado não pode estar vazio.',
    },


}

//---------------------------------------------------------
// VALIDADORES EXISTENTES 
const validadores = {
    dataNascimento: input => validaDataNascimento(input),
    cpf: input => validaCPF(input),
    cep: input => recuperarCEP(input)
}

//---------------------------------------------------------
// FUNÇÃO PARA MOSTRAR MENSAGEM DE ERRO
function mostraMensagemDeErro(tipoDeInput, input) {
    let mensagem = '';

    tiposDeErro.forEach(erro => {

        if (input.validity[erro]) {
            mensagem = mensagensDeErro[tipoDeInput][erro];
        }
    })
    return mensagem;
}

//**************************************************************
// VERIFICAÇÃDO DA DATA DE NASCIMENTO
//**************************************************************
function validaDataNascimento(input) {
    let mensagem = '';
    const dataRecebida = new Date(input.value);
    if (!maiorQue18(dataRecebida)) {
        mensagem = 'Você deve ser maior que 18 anos para se cadastrar'
    }
    //The HTMLSelectElement.setCustomValidity() method sets the custom validity message for the selection element to the specified message. 
    //Use the empty string to indicate that the element does not have a custom validity error.
    input.setCustomValidity(mensagem);
}

function maiorQue18(data) {
    const dataAtual = new Date();

    //The getUTCFullYear() method returns the year in the specified date according to universal time.
    //The getUTCMonth() returns the month of the specified date according to universal time
    //The getUTCDate() method returns the day of the month(from 1 to 31) in the specified date according to universal time.
    const dataMais18 = new Date(data.getUTCFullYear() + 18, data.getUTCMonth(), data.getUTCDate());

    return dataMais18 <= dataAtual;

}

//**************************************************************
// VERIFICAÇÃO DO CPF
//**************************************************************
// OBS: O ALGORITMO DO PROFESSOR ESTÁ ERRADO. ELE NÃO VALIDA O SEGUINTE CPF 34996770910
// BAIXEI O CÓDIGO PRONTO (PASTA "validacao-doguito-aula4") E O CÓDIGO PRONTO TAMBÉM NÃO FUNCIONA COM ESSE CPF
// FÓRMULA PARA CALCULAR CPF VÁLIDO ESTÁ NO ARQUIVO "cpf-formula.md" 
//**************************************************************
function validaCPF(input) {
    //substitui qualquer caracter que não seja um número por vazio
    const cpfFormatado = input.value.replace(/\D/g, '');
    let mensagem = '';

    if (!checaCPFNumerosRepetidos(cpfFormatado) || !checaEstruturaCPF(cpfFormatado)) {
        mensagem = 'O CPF digitado não é válido.';
    }
    input.setCustomValidity(mensagem);
}

function checaCPFNumerosRepetidos(cpf) {
    const valoresRepetidos = [
        "00000000000",
        "11111111111",
        "22222222222",
        "33333333333",
        "44444444444",
        "55555555555",
        "66666666666",
        "77777777777",
        "88888888888",
        "99999999999"
    ]
    let cpfValido = true;
    valoresRepetidos.forEach(valor => {
        if (valor == cpf) {
            cpfValido = false;
        }
    })
    return cpfValido;
}

function checaEstruturaCPF(cpf) {
    const multiplicador = 10;
    return checaDigitoVerificador(cpf, multiplicador);
}

function checaDigitoVerificador(cpf, multiplicador) {

    if (multiplicador >= 12) {
        return true;
    }

    let multiplicadorInicial = multiplicador;
    let soma = 0;
    const cpfSemDigitos = cpf.substr(0, multiplicador - 1).split('');
    const digitoVerificador = cpf.charAt(multiplicador - 1);
    for (let contador = 0; multiplicadorInicial > 1; multiplicadorInicial--) {
        soma = soma + cpfSemDigitos[contador] * multiplicadorInicial;
        contador++;
    }

    if (digitoVerificador == confirmaDigito(soma)) {
        return checaDigitoVerificador(cpf, multiplicador + 1);
    }
    return false;
}

function confirmaDigito(soma) {
    return 11 - (soma % 11);
}

//**************************************************************
// VERIFICAÇÃO DO CEP
//**************************************************************

function recuperarCEP(input) {
    //substitui qualquer caracter que não seja um número por vazio
    const cep = input.value.replace(/D/g, '');
    const url = `https://viacep.com.br/ws/${cep}/json`;
    const options = {
        method: 'GET',
        mode: 'cors',
        headers: {
            'content-type': 'application/json;charset=utf-8'
        }
    };

    // verifica se o input não contém erros "patternMismatch" ou "valueMissing"
    if (!input.validity.patternMismatch && !input.validity.valueMissing) {
        //busca informações sobre CEP na API do VIACEP
        fetch(url, options)
            .then(
                response => response.json()
            ).then(
                data => {
                    console.log(data);
                    //se a api VIACEP retornar um erro
                    if(data.erro){
                        input.setCustomValidity('O CEP informado não existe');
                        return;
                    }
                    input.setCustomValidity('');
                    preencheCamposComCEP(data);
                    return;
                }
            )

    }
}

function preencheCamposComCEP(data){
    const logradouro = document.querySelector('[data-tipo="logradouro"]');
    const cidade = document.querySelector('[data-tipo="cidade"]');
    const estado = document.querySelector('[data-tipo="estado"]');

    logradouro.value = data.logradouro;
    cidade.value = data.localidade;
    estado.value = data.uf;

}