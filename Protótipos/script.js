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
          taskDiv.innerHTML = `
            <p><strong>${task.titulo}</strong> - ${task.descricao}</p>
            <button onclick="showTaskDetails(${task.id})">Detalhes</button>
          `;
          taskListDiv.appendChild(taskDiv);
        });
      })
      .catch(error => console.error('Erro ao buscar tarefas:', error));
  }
  
  function showTaskDetails(taskId) {
    fetch(`http://localhost:8080/tasks/${taskId}`)
      .then(response => response.json())
      .then(task => {
        document.getElementById('taskTitle').innerText = task.titulo;
        document.getElementById('taskDescription').innerText = task.descricao;
        document.getElementById('taskDueDate').innerText = new Date(task.dataVencimento).toLocaleDateString('pt-BR');
        document.getElementById('taskPriority').innerText = task.prioridade;
        document.getElementById('taskStatus').innerText = task.status;
        document.getElementById('taskDetailsModal').style.display = 'block';
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
  