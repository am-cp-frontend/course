import React from 'react'

export default class TodoInput extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      value: ''
    }

    this.processInput = this.processInput.bind(this)
    this.processSubmit = this.processSubmit.bind(this)
  }

  processInput (event) {
    this.setState({
      value: event.target.value,
    })
  }

  processSubmit (event) {
    event.preventDefault()

    this.setState(state => {
      this.props.handler(state.value.trim())

      state.value = ''
    })
  }

  render () {
    return (
      <form onSubmit={this.processSubmit}>
        <input value={this.state.value} onChange={this.processInput} />
        <button type="submit">Добавить</button>
      </form>
    )
  }
}