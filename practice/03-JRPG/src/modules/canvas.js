const canvasWidth = 500, canvasHeight = 350

const canvas = document.getElementById('game')
canvas.width = canvasWidth
canvas.height = canvasHeight

const ctx = canvas.getContext('2d')
ctx.font = '18px VT323'

export default ctx
export { canvas }