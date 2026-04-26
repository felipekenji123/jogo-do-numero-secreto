//let titulo = document.querySelector("h1");
//seleciona uma parte especifica, que nesse caso é o h1, do document (html)
//titulo.innerHTML = "JOGO DO NÚMERO SECRETO";

//let paragrafo = document.querySelector("p");
//paragrafo.innerHTML = "Escolha um número entre 1 e 10:";

let listaDeNumerosSorteados = [];
let numeroLimite = 30; //numero que vai ser usado no metodo gerarNumeroAleatorio() que vai determinar o intervalo de numeros do nosso jogo
exibirMensagemInicial();
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;


function verificarChute() {
    let chute = document.querySelector("input").value; //quando usa o .value, ele pega o valor que foi inserido no input, não será nós que atribuimos um valor
    //console.log (chute == numeroSecreto); vai retornar um valor booleano false, ja que essa condição não foi verdadeira, e retornará true se os dois forem iguais

    let palavraTentativa = tentativas > 1 ? "TENTATIVAS" : "TENTATIVA";
    let mensagemTentativas = `PARABENS!, VOCÊ ACERTOU O NÚMERO SECRETO EM ${tentativas} ${palavraTentativa}`;
    
    if (chute == numeroSecreto) {
        exibirTextoNTela("h1", "ACERTOU!");
        exibirTextoNTela("p", mensagemTentativas);
        document.getElementById("reiniciar").removeAttribute("disabled");
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNTela("p", `Tente novamente, o número secreto é MENOR que ${chute}`);
        } else {
            exibirTextoNTela("p", `Tente novamente, o número secreto é MAIOR que ${chute}`);
        }
        tentativas++
        limparCampo();
    }
}

function exibirMensagemInicial() {
    //agora atribuimos os valores/parametros que as funções vão receber para preencher os campos h1 e p, neste caso
    exibirTextoNTela("h1", "JOGO DO NÚMERO SECRETO"); 
    exibirTextoNTela("p", `Escolha um número entre 1 e ${numeroLimite}:`);
}

function exibirTextoNTela(tag, texto) { //essa função está sendo criada, para que não tenha que ficar escrevendo varias vezes o texto que está la no topo da tela, pois ele se repete
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = []; // ou seja, se todos os numeros ja tiverem sido sorteados, o array sera limpo/zerado, para que possam sortear todos novamente.
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) { //include é o contains, ou seja, nesse if verificamos se o numero escolhido ja foi sorteado anteriormente
        return gerarNumeroAleatorio(); //se tiver sido sorteado, chama a função dnv e sorteia dnv até achar um que ainda não foi sorteado
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido); //push pega o numero que você esta dando na variavel e coloca como ultimo elemento no array
        return numeroEscolhido; //e agora sim retorna um numero que não foi sorteado ainda
    }
}

function limparCampo() {
    chute = document.querySelector("input");
    chute.value = "";
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById("reiniciar").setAttribute("disabled", true);
}
