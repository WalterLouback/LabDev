import React from 'react';

export const TodoItem = ({ task, onEdit }) => {
  return (
    <div className='TodoItem'>
      <h3>{task.titulo}</h3>
      <p>{task.descricao}</p>
      <p>Data de Vencimento: {task.dataVencimento}</p>
      <p>Prioridade: {task.prioridade}</p>
      <button onClick={() => onEdit(task)} className='edit-btn'>Editar</button>
    </div>
  );
};
