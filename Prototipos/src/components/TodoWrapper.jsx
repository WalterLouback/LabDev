import React, { useState, useEffect } from 'react';
import { TodoList } from './TodoList';
import { TodoModal } from './TodoModal';

export const TodoWrapper = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await fetch('https://labdev.onrender.com/tasks');
    const data = await response.json();
    setTasks(data);
  };

  const addTask = async (task) => {
    const response = await fetch('https://labdev.onrender.com/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    });
    const newTask = await response.json();
    setTasks([...tasks, newTask]);
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
    setCurrentTask(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const editTask = async (task) => {
    const response = await fetch(`https://labdev.onrender.com/tasks/${task.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    });
    const updatedTask = await response.json();
    setTasks(tasks.map(t => (t.id === updatedTask.id ? updatedTask : t)));
    setIsModalOpen(false);
  };

  const handleEdit = (task) => {
    setCurrentTask(task);
    setIsModalOpen(true);
  };

  const handleTaskClick = async (task) => {
    const response = await fetch(`https://labdev.onrender.com/tasks/${task}`);
    const data = await response.json();
    setCurrentTask(data);
    setIsModalOpen(true);
  };
  const updateTaskStatus = async (task, status) => {
    const updatedTask = { ...task, status };
    const response = await fetch(`https://labdev.onrender.com/tasks/${task.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    });
    const result = await response.json();
    setTasks(tasks.map(t => (t.id === result.id ? result : t)));
  };

  const categorizeTasks = (tasks) => {
    const currentDate = new Date();
    const todo = [];
    const overdue = [];
    const completed = [];

    tasks.forEach(task => {
      const dueDate = new Date(task.dataVencimento);
      if (task.status === 'Concluída') {
        completed.push(task);
      } else if (dueDate < currentDate) {
        overdue.push(task);
      } else {
        todo.push(task);
      }
    });

    return { todo, overdue, completed };
  };
  

  const { todo, overdue, completed } = categorizeTasks(tasks);

  return (
    <div className='TodoWrapper'>
      <h1>Lista de Tarefas</h1>
      <button onClick={openModal} className='open-modal-btn'>Adicionar Tarefa</button>
      <div className='TaskColumns'>
        <div className='TaskColumn'>
          <h2>Atrasadas</h2>
          <TodoList tasks={overdue} onEdit={handleEdit} onTaskClick={handleTaskClick} onUpdateStatus={updateTaskStatus}/>
          {/* <TodoList tasks={overdue} onEdit={handleEdit} /> */}
        </div>
        <div className='TaskColumn'>
          <h2>Previstas</h2>
          {/* <TodoList tasks={todo} onEdit={handleEdit} /> */}
          <TodoList tasks={todo} onEdit={handleEdit} onTaskClick={handleTaskClick} onUpdateStatus={updateTaskStatus}/>
        </div>
        <div className='TaskColumn'>
          <h2>Concluídas</h2>
          {/* <TodoList tasks={completed} onEdit={handleEdit} /> */}
          <TodoList tasks={completed} onEdit={handleEdit} onTaskClick={handleTaskClick} onUpdateStatus={updateTaskStatus}/>
        </div>
      </div>
      {isModalOpen && (
        <TodoModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSave={addTask}
          currentTask={currentTask}
          onEdit={editTask}
        />
      )}
    </div>
  );
};
