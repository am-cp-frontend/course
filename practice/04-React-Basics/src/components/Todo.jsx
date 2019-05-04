import React from 'react'

const Todo = props => (
  <li onClick={props.deleteCallback}>
    {props.text}
  </li> 
)

export default Todo