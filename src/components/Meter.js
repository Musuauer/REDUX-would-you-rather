import React from 'react'

const Meter = (props) => {
  const {
    percent = 0,
    width = 100,
    height = 10,
    color,
    label
  } = props

  // get width of results rectangle based of votes
  const w = percent ? Math.max(height, width * Math.min(percent, 1)) : 0

  return (
    <svg
      width={width}
      height={height}
      aria-label={label}
    >
      <rect
        width={width}
        height={height}
        fill='#ccc' />
      <rect
        width={w}
        height={height}
        fill={color}
      />
    </svg>
  )
}

export default Meter
