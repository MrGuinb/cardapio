document.addEventListener('DOMContentLoaded', () => {
  window.carregarProdutos = carregarProdutos;
  window.carregarCategorias = carregarCategorias;
  window.carregarPedidos = carregarPedidos;
  window.carregarConfiguracoes = carregarConfiguracoes;
});

// === PRODUTOS ===
async function carregarProdutos() {
  const res = await fetch('produtos.php');
  const dados = await res.json();
  const container = document.getElementById('conteudo');
  container.innerHTML = `
    <h2>Produtos</h2>
    <button onclick="formNovoProduto()">Novo Produto</button>
    <ul>${dados.map(p => `
      <li>
        <strong>${p.nome}</strong> - R$ ${p.preco}
        <button onclick="editarProduto(${p.id})">Editar</button>
        <button onclick="deletarProduto(${p.id})">Excluir</button>
      </li>
    `).join('')}</ul>
  `;
}

function formNovoProduto() {
  document.getElementById('conteudo').innerHTML = `
    <h2>Novo Produto</h2>
    <form onsubmit="salvarProduto(event)">
      <input type="text" name="nome" placeholder="Nome" required><br>
      <input type="text" name="descricao" placeholder="Descrição"><br>
      <input type="number" name="preco" step="0.01" placeholder="Preço" required><br>
      <input type="text" name="imagem_url" placeholder="URL da imagem"><br>
      <button type="submit">Salvar</button>
    </form>
  `;
}

async function salvarProduto(e) {
  e.preventDefault();
  const form = e.target;
  const dados = new FormData(form);
  await fetch('produtos.php', { method: 'POST', body: dados });
  carregarProdutos();
}

async function deletarProduto(id) {
  if (!confirm('Deseja realmente excluir este produto?')) return;
  await fetch(`produtos.php?id=${id}`, { method: 'DELETE' });
  carregarProdutos();
}

async function editarProduto(id) {
  const res = await fetch(`produtos.php?id=${id}`);
  const produto = await res.json();
  document.getElementById('conteudo').innerHTML = `
    <h2>Editar Produto</h2>
    <form onsubmit="atualizarProduto(event, ${id})">
      <input type="text" name="nome" value="${produto.nome}" required><br>
      <input type="text" name="descricao" value="${produto.descricao}"><br>
      <input type="number" name="preco" value="${produto.preco}" step="0.01" required><br>
      <input type="text" name="imagem_url" value="${produto.imagem_url}"><br>
      <button type="submit">Atualizar</button>
    </form>
  `;
}

async function atualizarProduto(e, id) {
  e.preventDefault();
  const form = e.target;
  const dados = new FormData(form);
  dados.append('id', id);
  await fetch('produtos.php', { method: 'PUT', body: dados });
  carregarProdutos();
}

// === CATEGORIAS ===

async function carregarCategorias() {
  const res = await fetch('categorias.php');
  const categorias = await res.json();
  const container = document.getElementById('conteudo');
  container.innerHTML = `
    <h2>Categorias</h2>
    <button onclick="formNovaCategoria()">Nova Categoria</button>
    <ul>${categorias.map(c => `
      <li>
        ${c.nome}
        <button onclick="editarCategoria(${c.id}, '${c.nome}')">Editar</button>
        <button onclick="deletarCategoria(${c.id})">Excluir</button>
      </li>
    `).join('')}</ul>
  `;
}

function formNovaCategoria() {
  document.getElementById('conteudo').innerHTML = `
    <h2>Nova Categoria</h2>
    <form onsubmit="salvarCategoria(event)">
      <input type="text" name="nome" placeholder="Nome da categoria" required><br>
      <button type="submit">Salvar</button>
    </form>
  `;
}

async function salvarCategoria(e) {
  e.preventDefault();
  const form = e.target;
  const dados = new FormData(form);
  await fetch('categorias.php', { method: 'POST', body: dados });
  carregarCategorias();
}

async function editarCategoria(id, nomeAtual) {
  document.getElementById('conteudo').innerHTML = `
    <h2>Editar Categoria</h2>
    <form onsubmit="atualizarCategoria(event, ${id})">
      <input type="text" name="nome" value="${nomeAtual}" required><br>
      <button type="submit">Atualizar</button>
    </form>
  `;
}

async function atualizarCategoria(e, id) {
  e.preventDefault();
  const form = e.target;
  const dados = new FormData(form);
  dados.append('id', id);
  await fetch('categorias.php', { method: 'PUT', body: dados });
  carregarCategorias();
}

async function deletarCategoria(id) {
  if (!confirm('Deseja excluir esta categoria?')) return;
  await fetch(`categorias.php?id=${id}`, { method: 'DELETE' });
  carregarCategorias();
}

// === PEDIDOS ===

async function carregarPedidos() {
  const res = await fetch('pedidos.php');
  const pedidos = await res.json();
  const container = document.getElementById('conteudo');
  container.innerHTML = `
    <h2>Pedidos</h2>
    <ul>${pedidos.map(p => `
      <li>
        <strong>#${p.id}</strong> - ${p.nome_cliente} - R$ ${p.valor_total}<br>
        <em>${p.pagamento} • ${p.data_pedido}</em><br>
        Itens: ${p.itens}<br>
        <small>Obs: ${p.observacoes}</small>
        <hr>
      </li>
    `).join('')}</ul>
  `;
}

// === CONFIGURAÇÕES ===

async function carregarConfiguracoes() {
  const res = await fetch('configuracoes.php');
  const { configuracoes, horarios } = await res.json();

  const container = document.getElementById('conteudo');
  container.innerHTML = `
    <h2>Configurações</h2>
    <form id="formConfig">
      <label>Nome da Loja</label><br>
      <input type="text" name="nome_loja" value="${configuracoes.nome_loja}"><br>
      <label>Mensagem WhatsApp</label><br>
      <textarea name="mensagem_whatsapp">${configuracoes.mensagem_whatsapp}</textarea><br>
      <label>Número WhatsApp</label><br>
      <input type="text" name="numero_whatsapp" value="${configuracoes.numero_whatsapp}"><br>
      <label>Taxa de entrega</label><br>
      <input type="number" name="taxa_entrega" step="0.01" value="${configuracoes.taxa_entrega}"><br>
      <label>Tempo estimado</label><br>
      <input type="text" name="tempo_estimado" value="${configuracoes.tempo_estimado}"><br>
      <label>Status</label><br>
      <select name="status">
        <option value="aberto" ${configuracoes.status === 'aberto' ? 'selected' : ''}>Aberto</option>
        <option value="fechado" ${configuracoes.status === 'fechado' ? 'selected' : ''}>Fechado</option>
      </select><br><br>

      <h3>Horários</h3>
      ${horarios.map(h => `
        <div>
          <strong>${h.dia_semana}</strong><br>
          <label>Abre:</label> <input type="time" name="abre_${h.id}" value="${h.abre || ''}">
          <label>Fecha:</label> <input type="time" name="fecha_${h.id}" value="${h.fecha || ''}">
          <label><input type="checkbox" name="fechado_${h.id}" ${h.fechado ? 'checked' : ''}> Fechado</label>
        </div><br>
      `).join('')}

      <button type="submit">Salvar</button>
    </form>
  `;

  document.getElementById('formConfig').onsubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const dados = {
      nome_loja: form.get('nome_loja'),
      mensagem_whatsapp: form.get('mensagem_whatsapp'),
      numero_whatsapp: form.get('numero_whatsapp'),
      taxa_entrega: form.get('taxa_entrega'),
      tempo_estimado: form.get('tempo_estimado'),
      status: form.get('status'),
      horarios: horarios.map(h => ({
        id: h.id,
        abre: form.get(`abre_${h.id}`),
        fecha: form.get(`fecha_${h.id}`),
        fechado: form.get(`fechado_${h.id}`) ? true : false
      }))
    };

    await fetch('configuracoes.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    });

    alert('Configurações salvas com sucesso!');
  };
}

async function carregarNovoPedido() {
  const produtos = await fetch('produtos.php').then(r => r.json());

  const conteudo = document.getElementById('conteudo');
  conteudo.innerHTML = `
    <h2>Novo Pedido</h2>
    <form id="form-pedido">
      <h3>Itens</h3>
      <div id="lista-itens"></div>
      <h3>Dados do Cliente</h3>
      <input type="text" name="nome_cliente" placeholder="Nome do cliente" required><br>
      <input type="text" name="telefone_cliente" placeholder="Telefone"><br>
      <input type="text" name="endereco" placeholder="Endereço"><br>
      <textarea name="observacoes" placeholder="Observações"></textarea><br>
      <select name="pagamento">
        <option value="PIX">PIX</option>
        <option value="Dinheiro">Dinheiro</option>
        <option value="Cartão">Cartão</option>
      </select><br><br>
      <strong>Total: R$ <span id="valor-total">0.00</span></strong><br><br>
      <button type="submit">Finalizar Pedido</button>
    </form>
  `;

  const lista = document.getElementById('lista-itens');
  produtos.forEach(prod => {
    const item = document.createElement('div');
    item.innerHTML = `
      <label>
        <input type="number" min="0" value="0" data-preco="${prod.preco}" data-nome="${prod.nome}" class="quantidade">
        ${prod.nome} - R$ ${Number(prod.preco).toFixed(2)}
      </label>
    `;
    lista.appendChild(item);
  });

  function atualizarTotal() {
    let total = 0;
    document.querySelectorAll('.quantidade').forEach(input => {
      const qtd = parseInt(input.value);
      const preco = parseFloat(input.dataset.preco);
      if (qtd > 0) total += qtd * preco;
    });
    document.getElementById('valor-total').textContent = total.toFixed(2);
  }

  lista.addEventListener('input', atualizarTotal);

  document.getElementById('form-pedido').addEventListener('submit', async e => {
    e.preventDefault();

    const form = e.target;
    const itensSelecionados = [];

    document.querySelectorAll('.quantidade').forEach(input => {
      const qtd = parseInt(input.value);
      if (qtd > 0) {
        itensSelecionados.push(`${qtd}x ${input.dataset.nome}`);
      }
    });

    const dados = {
      nome_cliente: form.nome_cliente.value,
      telefone_cliente: form.telefone_cliente.value,
      endereco: form.endereco.value,
      observacoes: form.observacoes.value,
      pagamento: form.pagamento.value,
      itens: itensSelecionados.join(', '),
      valor_total: parseFloat(document.getElementById('valor-total').textContent)
    };

    const resposta = await fetch('novo_pedido.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    }).then(r => r.json());

    if (resposta.status === 'ok') {
      alert('Pedido realizado com sucesso!');
      carregarPedidos();
    } else {
      alert('Erro ao salvar pedido: ' + (resposta.mensagem || 'desconhecido'));
    }
  });
}
