export default server => {
  global.io = require('socket.io')(server)
  io.on('connection', socket => {
    console.log('connection')
  })
  return io
}
