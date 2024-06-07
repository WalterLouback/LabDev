import React from 'react';
import { TodoItem } from './TodoItem';

export const TodoList = ({ tasks }) => {
  return (
    <div className='TodoList'>
      {tasks.map(task => (
        <TodoItem key={task.id} task={task} />
      ))}
    </div>
  );
};
