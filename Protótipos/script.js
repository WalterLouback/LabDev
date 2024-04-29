document.getElementById('addTaskBtn').addEventListener('click', () => {
  document.getElementById('addTaskModal').style.display = 'block';
});

document.getElementsByClassName('close')[0].addEventListener('click', () => {
  document.getElementById('addTaskModal').style.display = 'none';
});

document.getElementById('taskForm').addEventListener('submit', (event) => {
  event.preventDefault();

  const newTask = {
    titulo: document.getElementById('title').value,
    descricao: document.getElementById('description').value,
    dataVencimento: document.getElementById('dueDate').value,
    prioridade: document.getElementById('priority').value,
    status: 'Pendente'
  };

  fetch('http://localhost:8080/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newTask)
  })
    .then(response => {
      if (response.status === 200) {
        alert('Tarefa criada com sucesso!');
        location.reload();
        document.getElementById('modal').style.display = 'none';
        fetchTasks();
      } else {
        alert('Erro ao criar tarefa. Por favor, tente novamente.');
      }
    })
    .catch(error => console.error('Erro ao criar tarefa:', error));
});

function fetchTasks() {
  fetch('http://localhost:8080/tasks')
    .then(response => response.json())
    .then(tasks => {
      const taskListDiv = document.getElementById('taskList');
      taskListDiv.innerHTML = '<h2>Tarefas</h2>';
      tasks.forEach(task => {
        const taskDiv = document.createElement('div');
        let newTask = JSON.stringify(task);
        taskDiv.innerHTML = `
            <p><strong>${task.titulo}</strong> - ${task.descricao}</p>
            <button onclick="showTaskDetails(${task.id})">Detalhes</button>
            <button onclick="completeTask('${task.id}', '${task.titulo}', '${task.descricao}', '${task.dataVencimento}', '${task.prioridade}')">Completar</button>
            <button onclick="removeTask(${task.id})">Remover</button>
          `;
        taskListDiv.appendChild(taskDiv);
      });
    })
    .catch(error => console.error('Erro ao buscar tarefas:', error));
}

function completeTask(id, title, description, date, priority){
  let data = {
    titulo: title,
    descricao: description,
    dataVencimento: date,
    prioridade: priority,
    status: 'Completo'
  }
  fetch(`http://localhost:8080/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json' // Defina o tipo de conteúdo do corpo da requisição como JSON
    },
    body: JSON.stringify(data) // Converte o objeto 'data' em uma string JSON para enviar no corpo da requisição
  })
    .then(response => {
      if (response.status === 200) {
        alert('Tarefa atualizada com sucesso!');
        location.reload();
        document.getElementById('taskDetailsModal').style.display = 'none';
        fetchTasks();
      } else {
        alert('Erro ao atualizar tarefa. Por favor, tente novamente.');
      }
    })
    .catch(error => console.error('Erro ao atualizar tarefa:', error));
}

function removeTask(id){
  fetch(`http://localhost:8080/tasks/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json' // Defina o tipo de conteúdo do corpo da requisição como JSON
    }
  })
    .then(response => {
      if (response.status === 200) {
        alert('Tarefa excluida com sucesso!');
        location.reload();
        fetchTasks();
      } else {
        alert('Erro ao atualizar tarefa. Por favor, tente novamente.');
      }
    })
    .catch(error => console.error('Erro ao atualizar tarefa:', error));
}

function editTask(id, title, description, date, priority) {
  document.getElementById('visual').style.display = 'none';
  document.getElementById('editer').style.display = 'block';
  document.getElementById('titleEditer').value = title;
  document.getElementById('descriptionEditer').value = description;
  let datePart = date.split('T')[0];
  document.getElementById('dateEditer').value = datePart;
  document.getElementById('priorityEditer').value = priority;
  document.getElementById('buttons').innerHTML = `<button onclick="saveTask('${id}')">Salvar</button>`;
}

function saveTask(id) {
  let data = {
    titulo: document.getElementById('titleEditer').value,
    descricao: document.getElementById('descriptionEditer').value,
    dataVencimento: document.getElementById('dateEditer').value,
    prioridade: document.getElementById('priorityEditer').value,
    status: 'Pendente'
  }
  fetch(`http://localhost:8080/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json' // Defina o tipo de conteúdo do corpo da requisição como JSON
    },
    body: JSON.stringify(data) // Converte o objeto 'data' em uma string JSON para enviar no corpo da requisição
  })
    .then(response => {
      if (response.status === 200) {
        alert('Tarefa atualizada com sucesso!');
        location.reload();
        document.getElementById('taskDetailsModal').style.display = 'none';
        fetchTasks();
      } else {
        alert('Erro ao atualizar tarefa. Por favor, tente novamente.');
      }
    })
    .catch(error => console.error('Erro ao atualizar tarefa:', error));

}

function showTaskDetails(taskId) {
  document.getElementById('editer').style.display = 'none';
  document.getElementById('visual').style.display = 'block';
  fetch(`http://localhost:8080/tasks/${taskId}`)
    .then(response => response.json())
    .then(task => {
      document.getElementById('taskTitle').innerText = task.titulo;
      document.getElementById('taskDescription').innerText = task.descricao;
      document.getElementById('taskDueDate').innerText = new Date(task.dataVencimento).toLocaleDateString('pt-BR');
      document.getElementById('taskPriority').innerText = task.prioridade;
      document.getElementById('taskStatus').innerText = task.status;
      document.getElementById('taskDetailsModal').style.display = 'block';
      document.getElementById('buttons').innerHTML =
        `<button onclick="editTask('${task.id}', '${task.titulo}', '${task.descricao}', '${task.dataVencimento}', '${task.prioridade}')">Editar</button>`;
    })
    .catch(error => console.error('Erro ao buscar detalhes da tarefa:', error));
}

// Fechar modal de detalhes quando clicar no botão de fechar
document.getElementsByClassName('close')[1].addEventListener('click', () => {
  document.getElementById('taskDetailsModal').style.display = 'none';
});

// Fechar modais quando clicar fora da área do modal
window.addEventListener('click', (event) => {
  const addTaskModal = document.getElementById('addTaskModal');
  const taskDetailsModal = document.getElementById('taskDetailsModal');
  if (event.target == addTaskModal) {
    addTaskModal.style.display = 'none';
  }
  if (event.target == taskDetailsModal) {
    taskDetailsModal.style.display = 'none';
  }
});

window.onload = fetchTasks;
