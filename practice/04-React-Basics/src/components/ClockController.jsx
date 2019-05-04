import React from 'react'

import ClockView from './ClockView'

export default class Clock extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      date: new Date(),
    }
  }

  componentDidMount () {
    this.interval = setInterval(() => this.tick(), 1000)
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }

  tick () {
    this.setState({
      date: new Date(),
    })
  }

  render () {
    return (
      <ClockView date={this.state.date} />
    )
  }
}