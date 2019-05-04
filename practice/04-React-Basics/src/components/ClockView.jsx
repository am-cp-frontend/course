import React from 'react'

// import '../styles/clock.css'

export default props => (
  <h2 className="clock">
    The time is: { props.date.toLocaleTimeString() }
  </h2>
)