    var email = document.forms['formulario']['email'];
    var senha = document.forms['formulario']['senha'];
    
    var erro_email = document.getElementById('erro_email');
    var erro_senha = document.getElementById('erro_senha');
    
    email.addEventListener('textInput', verificaEmail);
    senha.addEventListener('textInput', verificaSenha);
    
    function validaAoEnviar(){
        if (email.value.length < 9) {
            email.style.border = "1px solid red";
            erro_email.style.display = "block";
            email.focus();
            return false;
        }
        if (senha.value.length < 6) {
            senha.style.border = "1px solid red";
            erro_senha.style.display = "block";
            senha.focus();
            return false;
        }
    
    }
    function verificaEmail(){
        
        if (email.value.length >= 8) {
            email.style.border = "1px solid silver";
            erro_email.style.display = "none";
            return true;
        }
    }
    function verificaSenha(){
        if (senha.value.length >= 5) {
            senha.style.border = "1px solid silver";
            erro_senha.style.display = "none";
            return true;
        }
    }
    
    