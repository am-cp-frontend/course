import React from 'react'

import Todo from './Todo'

export default props => (
  <ul>
    {props.todos.map((todo, idx) => (
      <Todo 
        text={todo.text} 
        key={todo.id}
        deleteCallback={() => props.deleteCallback(todo.id)}
      />
    ))}
  </ul>
)