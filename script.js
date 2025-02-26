const valorTelaCalculadora = document.querySelector('.resultado');
const calculadoraBtns = document.querySelectorAll('.calculadora-btn');

let valorAnterior = '';
let valorAtual = '';
let operacaoAtual = '';

const operadores = ['+', '-', '×', '/'];

calculadoraBtns.forEach(btn => {
    btn.addEventListener('click', (event) => {
        const valorBotao = event.target.value;
        executaClique(valorBotao);
    });
});

function executaClique(btn) {
    if(/[0-9]/.test(btn)) {
        valorAtual += btn;
        exibeResultado();
    } else if(operadores.includes(btn)){
                alteraOperacao(btn);
            } else {
                switch (btn) {
                    case 'C':
                        limpaTudo();
                        break;
                    case '=':
                        if(valorAnterior && valorAtual && operacaoAtual) {
                            realizaOperacao()
                        }
                        break;
                    case '+/-':
                        if(valorAtual) {
                            inverteSinal();
                        }
                        break;
                    case '.':
                        adicionaPonto();
                        break;
                    case 'x':
                     removeUltimoCaractere();
                }
    }
}

function limpaTudo() {
    operacaoAtual = '';
    valorAtual = '';
    valorAnterior = '';
    valorTelaCalculadora.innerHTML = 0;
}

function realizaOperacao() {
    valorAtual = calcula(parseFloat(valorAnterior), parseFloat(valorAtual), operacaoAtual);
    operacaoAtual = '';
    valorAnterior = '';
    exibeResultado();
}

function inverteSinal() {
    valorAtual = (parseFloat(valorAtual) * -1).toString();
    exibeResultado();
}

function adicionaPonto() {
    if(!valorAtual.includes('.')) {
        valorAtual == '' ? valorAtual = '0.' : valorAtual += '.';
        exibeResultado();
    }
}

function removeUltimoCaractere() {
    valorAtual = valorAtual.slice(0, -1);
    exibeResultado();
}

function calcula(a, b, operacao) {
    let resultado;
    switch (operacao) {
        case '+':
            resultado = a + b;
            break;
        case '-':
            resultado = a - b;
            break;  
        case '×':
            resultado = a * b;
            break;
        case '/':
            resultado = a / b;
            break;
    }
    return parseFloat(resultado.toFixed(5)).toString();
}

function alteraOperacao(operacao) {
    if(!valorAtual) {
        return;
    }
    if(!operacaoAtual) {
        valorAnterior = valorAtual;
        valorAtual = '';
        operacaoAtual = operacao;
        exibeResultado()
    }
}

function exibeResultado() {
    let valorAtualFormatado = formataNumeroComVirgulas(valorAtual);
    let valorAnteriorFormatado = formataNumeroComVirgulas(valorAnterior);

    
    if(valorAnterior) {
        valorTelaCalculadora.innerHTML = valorAnteriorFormatado + ' ' + operacaoAtual + ' ' + valorAtualFormatado;
        return;
    }
    if(valorAtual == '') {
        valorTelaCalculadora.innerHTML = '0';
        return;
    }
    if(!valorAnterior) {
        valorTelaCalculadora.innerHTML = valorAtualFormatado + operacaoAtual;
    }
}

// function FormataNumeroComVirgulas(numero) {} feita com auxílio do Copilot.
function formataNumeroComVirgulas(numero) {
    const partes = numero.toString().split('.');
    partes[0] = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return partes.join('.');
}