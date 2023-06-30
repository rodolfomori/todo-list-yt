const button = document.querySelector('.button-add-task');
const input = document.querySelector('.input-task');
const listaCompleta = document.querySelector('.list-tasks');

let minhaListaDeItens = [];

function adicionarNovaTarefa() {
  if (input.value === '') {
    alert('Por favor, digite uma tarefa');
    return;
  }
  minhaListaDeItens.push({
    tarefa: input.value,
    concluida: false,
  });

  input.value = '';

  mostrarTarefas();
}

function mostrarTarefas() {
  let novaLi = '';

  minhaListaDeItens.forEach((item, posicao) => {
    novaLi +=
      `
        <li class="task ${item.concluida && 'done'}">
            <img id="finish" src="./img/checked.png" alt="check-na-tarefa" onclick="concluirTarefa(${posicao})">
            <p>${item.tarefa}</p>
            <img id="remove" src="./img/trash.png" alt="tarefa-para-o-lixo" onclick="deletarItem(${posicao})">
        </li>
      `;
  });

  listaCompleta.innerHTML = novaLi;

  adicionarEventoHover(); // Adiciona o evento de hover nas tarefas atualizadas

  localStorage.setItem('lista', JSON.stringify(minhaListaDeItens));
}

function concluirTarefa(posicao) {
  minhaListaDeItens[posicao].concluida = !minhaListaDeItens[posicao].concluida;

  mostrarTarefas();
}

function deletarItem(posicao) {
  minhaListaDeItens.splice(posicao, 1);

  mostrarTarefas();
}

function recarregarTarefas() {
  const tarefasDoLocalStorage = localStorage.getItem('lista');

  if (tarefasDoLocalStorage) {
    minhaListaDeItens = JSON.parse(tarefasDoLocalStorage);
  }

  mostrarTarefas();
}

function adicionarEventoHover() {
  const tasks = document.querySelectorAll('.task');
  tasks.forEach(task => {
    const imgFinish = task.querySelector('#finish');
    const imgRemove = task.querySelector('#remove');
    
    imgFinish.addEventListener('mouseenter', () => {
      task.classList.add('hover-finish');
    });
    imgFinish.addEventListener('mouseleave', () => {
      task.classList.remove('hover-finish');
    });
    
    imgRemove.addEventListener('mouseenter', () => {
      task.classList.add('hover-remove');
    });
    imgRemove.addEventListener('mouseleave', () => {
      task.classList.remove('hover-remove');
    });
  });
}

recarregarTarefas();
button.addEventListener('click', adicionarNovaTarefa);
