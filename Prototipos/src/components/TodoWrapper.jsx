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

  return (
    <div className='TodoWrapper'>
      <h1>Lista de Tarefas</h1>
      <button onClick={openModal} className='open-modal-btn'>Adicionar Tarefa</button>
      <TodoList tasks={tasks} onEdit={handleEdit} />
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
