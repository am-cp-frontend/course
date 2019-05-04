import React from 'react'

import TodoInput from './TodoInput'
import TodoList from './TodoList'

let currentId = 0

const genId = () => currentId++

export default class TodoController extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      todos: []
    }

    this.addTodo = this.addTodo.bind(this)
    this.removeTodo = this.removeTodo.bind(this)
  }

  addTodo (text) {
    this.setState(state => state.todos.push({
      id: genId(),
      text,
    }))
  }

  removeTodo (id) {
    this.setState(state => 
      state.todos = state.todos.filter(todo => todo.id !== id)
    )
  }

  render () {
    return (
      <div>
        <TodoInput handler={this.addTodo} />
        <TodoList todos={this.state.todos} deleteCallback={this.removeTodo} />
      </div>
    )
  }
}