
const itensCarrinho = [];
let total = 0;
let pontos = 0;

const botoes = document.querySelectorAll(".produto button[data-produto]");
const listaCarrinho = document.querySelector("#itens-carrinho");
const textoTotal = document.querySelector("#total-carrinho");

const botaoFinalizar = document.querySelector("#finalizar-pedido");
const mensagemPedido = document.querySelector("#mensagem-pedido");

const textoStatus = document.querySelector("#status-pedido");
const botaoAvancarStatus = document.querySelector("#avancar-status");
const textoPontos = document.querySelector("#pontos-cliente");
const seletorUnidade = document.querySelector("#unidade-restaurante");
const etapasPedido = [
    "Pedido recebido",
    "Em preparação",
    "Pronto para retirada"
];

let etapaAtual = -1;
let pedidoConfirmado = false;
let aguardandoPagamento = false;
function formatarPreco(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

botoes.forEach(function(botao) {
    botao.addEventListener("click", function() {
        if (pedidoConfirmado) {
            mensagemPedido.textContent =
                "Pedido já confirmado. Atualize a página para iniciar outro teste.";
            return;
        }

        const produto = botao.dataset.produto;
        const preco = Number(botao.dataset.preco);

        if (!produto || !Number.isFinite(preco) || preco <= 0) {
            mensagemPedido.textContent =
                "Não foi possível adicionar esse produto.";
            return;
        }

        itensCarrinho.push({
            nome: produto,
            preco: preco
        });

        total += preco;

        const item = document.createElement("li");
        item.textContent = produto + " - " + formatarPreco(preco);

        listaCarrinho.appendChild(item);
        textoTotal.textContent = "Total: " + formatarPreco(total);

        mensagemPedido.textContent = "";
    });
});

botaoFinalizar.addEventListener("click", function() {
    if (pedidoConfirmado) {
        mensagemPedido.textContent = "Este pedido já foi confirmado.";
        return;
    }

    if (itensCarrinho.length === 0) {
        mensagemPedido.textContent =
            "Adicione pelo menos um produto antes de finalizar.";
        return;
    }

aguardandoPagamento = true;
mensagemPedido.textContent =
    "Agora escolha a forma de pagamento e confirme a simulação.";
});

botaoAvancarStatus.addEventListener("click", function() {
    if (!pedidoConfirmado) {
        return;
    }

    if (etapaAtual < etapasPedido.length - 1) {
        etapaAtual++;
        textoStatus.textContent = etapasPedido[etapaAtual];
    }

    if (etapaAtual === etapasPedido.length - 1) {
        botaoAvancarStatus.hidden = true;
    }
});

const formularioAcesso = document.querySelector("#formulario-acesso");
const mensagemAcesso = document.querySelector("#mensagem-acesso");

formularioAcesso.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const email = document.querySelector("#email-cliente").value.trim();
    const senha = document.querySelector("#senha-cliente").value;

    if (!email || !senha) {
        mensagemAcesso.textContent = "Preencha o e-mail e a senha.";
        return;
    }

    mensagemAcesso.textContent =
        "Acesso demonstrativo validado! Este protótipo não possui autenticação real.";
});

const formularioCadastro = document.querySelector("#formulario-cadastro");
const mensagemCadastro = document.querySelector("#mensagem-cadastro");

formularioCadastro.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const nome = document.querySelector("#nome-cliente").value.trim();
    const email = document.querySelector("#email-cadastro").value.trim();
    const senha = document.querySelector("#senha-cadastro").value;

    if (!nome || !email || !senha) {
        mensagemCadastro.textContent = "Preencha todos os campos.";
        return;
    }

    mensagemCadastro.textContent =
        "Cadastro demonstrativo realizado com sucesso, " + nome + "!";
});
const seletorPagamento = document.querySelector("#forma-pagamento");
const botaoPagamento = document.querySelector("#confirmar-pagamento");
const mensagemPagamento = document.querySelector("#mensagem-pagamento");

botaoPagamento.addEventListener("click", function() {
    const forma = seletorPagamento.value;

    if (!forma) {
        mensagemPagamento.textContent =
            "Selecione uma forma de pagamento.";
        return;
    }

    if (pedidoConfirmado) {
        mensagemPagamento.textContent =
            "Este pedido já foi confirmado.";
        return;
    }

    if (!aguardandoPagamento || itensCarrinho.length === 0) {
        mensagemPagamento.textContent =
            "Adicione produtos e clique em Finalizar pedido antes de pagar.";
        return;
    }

    pedidoConfirmado = true;
    aguardandoPagamento = false;
    etapaAtual = 0;

    const pontosGanhos = Math.floor(total);
    pontos += pontosGanhos;

    const unidadeEscolhida =
        seletorUnidade.options[seletorUnidade.selectedIndex].text;

    mensagemPagamento.textContent =
        "Pagamento simulado confirmado! Forma escolhida: " +
        seletorPagamento.options[seletorPagamento.selectedIndex].text +
        ". Nenhuma cobrança real foi realizada.";

    mensagemPedido.textContent =
        "Pedido confirmado na unidade " + unidadeEscolhida +
        "! Total: " + formatarPreco(total) +
        ". Você ganhou " + pontosGanhos + " pontos!";

    textoPontos.textContent = "Seus pontos: " + pontos;
    textoStatus.textContent = etapasPedido[etapaAtual];
    botaoAvancarStatus.hidden = false;
});
