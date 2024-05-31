import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export const TodoModal = ({ isOpen, onClose, onSave, currentTask, onEdit }) => {
  const [task, setTask] = useState({
    titulo: '',
    descricao: '',
    dataVencimento: '',
    prioridade: 'Baixa',
    status: 'Prevista',
    tipoTarefa: 'Livre'
  });

  useEffect(() => {
    if (currentTask) {
      setTask(currentTask);
    }
  }, [currentTask]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentTask) {
      onEdit(task);
    } else {
      onSave(task);
    }
    setTask({
      titulo: '',
      descricao: '',
      dataVencimento: '',
      prioridade: 'Baixa',
      status: 'Prevista',
      tipoTarefa: 'Livre'
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Task Modal"
      className="Modal"
      overlayClassName="Overlay"
    >
      <h2>{currentTask ? 'Editar Tarefa' : 'Adicionar Tarefa'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='titulo'
          value={task.titulo}
          onChange={handleChange}
          placeholder='Título'
          className='todo-input'
          required
        />
        <input
          type='text'
          name='descricao'
          value={task.descricao}
          onChange={handleChange}
          placeholder='Descrição'
          className='todo-input'
          required
        />
        <input
          type='date'
          name='dataVencimento'
          value={task.dataVencimento}
          onChange={handleChange}
          className='todo-input'
        />
        <select
          name='prioridade'
          value={task.prioridade}
          onChange={handleChange}
          className='todo-input'
        >
          <option value='Baixa'>Baixa</option>
          <option value='Media'>Média</option>
          <option value='Alta'>Alta</option>
        </select>
        <button type='submit' className='todo-btn'>
          {currentTask ? 'Salvar' : 'Adicionar'}
        </button>
      </form>
      <button onClick={onClose} className='todo-btn close-btn'>Fechar</button>
    </Modal>
  );
};
