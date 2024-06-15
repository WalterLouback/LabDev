import React from 'react';
import { TodoItem } from './TodoItem';

export const TodoList = ({ tasks, onEdit }) => {
  return (
    <div className='TodoList'>
      {tasks.map((task) => (
        <TodoItem key={task.id} task={task} onEdit={onEdit} />
      ))}
    </div>
  );
};
