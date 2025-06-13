let clientes = [];
let estoque = [];
let receitas = [];
let despesas = [];
let pedidos = [];

function login() {
  const usuario = document.getElementById('usuario').value;
  const senha = document.getElementById('senha').value;
  const status = document.getElementById('loginStatus');

  if (usuario === 'admin' && senha === '123') {
    status.innerText = 'Login bem-sucedido!';
    status.style.color = 'green';
  } else {
    status.innerText = 'Usuário ou senha incorretos.';
    status.style.color = 'red';
  }
}

function cadastrarCliente() {
  const nome = document.getElementById('nomeCliente').value;
  const email = document.getElementById('emailCliente').value;
  clientes.push({ nome, email });
  renderizarLista('listaClientes', clientes.map(c => `${c.nome} - ${c.email}`).join('<br>'));
}

function adicionarEstoque() {
  const produto = document.getElementById('produto').value;
  const quantidade = parseInt(document.getElementById('quantidade').value);
  estoque.push({ produto, quantidade });
  renderizarLista('estoqueLista', estoque.map(p => `${p.produto}: ${p.quantidade}`).join('<br>'));
  gerarGraficoEstoque();
}

function registrarReceita() {
  const descricao = document.getElementById('descricaoReceita').value;
  const valor = parseFloat(document.getElementById('valorReceita').value);
  receitas.push({ descricao, valor });
  renderizarLista('financeiroLista', receitas.map(r => `${r.descricao}: R$ ${r.valor.toFixed(2)}`).join('<br>'));
  gerarGraficoReceitas();
}

function registrarDespesa() {
  const descricao = document.getElementById('descricaoDespesa').value;
  const valor = parseFloat(document.getElementById('valorDespesa').value);
  despesas.push({ descricao, valor });
  renderizarLista('despesasLista', despesas.map(d => `${d.descricao}: R$ ${d.valor.toFixed(2)}`).join('<br>'));
}

function registrarPedido() {
  const produto = document.getElementById('pedidoProduto').value;
  const qtd = parseInt(document.getElementById('pedidoQtd').value);
  pedidos.push({ produto, qtd });
  renderizarLista('vendasLista', pedidos.map(p => `Produto: ${p.produto} - Quantidade: ${p.qtd}`).join('<br>'));
}

function renderizarLista(id, html) {
  document.getElementById(id).innerHTML = html;
}

function gerarGraficoReceitas() {
  const ctx = document.getElementById('graficoReceitas').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: receitas.map(r => r.descricao),
      datasets: [{
        label: 'Receitas',
        data: receitas.map(r => r.valor),
        backgroundColor: '#ec407a'
      }]
    }
  });
}

function gerarGraficoEstoque() {
  const ctx = document.getElementById('graficoEstoque').getContext('2d');
  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: estoque.map(p => p.produto),
      datasets: [{
        data: estoque.map(p => p.quantidade),
        backgroundColor: ['#f48fb1', '#f06292', '#ec407a', '#d81b60']
      }]
    }
  });
}
