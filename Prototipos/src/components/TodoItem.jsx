import React from 'react';
import { FaTrash } from 'react-icons/fa';

export const TodoItem = ({ task }) => {
  return (
    <div className='Todo'>
      <p className={task.status === 'Concluída' ? 'completed' : 'incompleted'}>
        {task.titulo}
      </p>
      <div>
        <FaTrash className='delete-icon' />
      </div>
    </div>
  );
};
