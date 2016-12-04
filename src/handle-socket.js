const online = {}

export default server => {
  global.io = require('socket.io')(server)

  io.on('connection', socket => {

    console.log('connection')

    socket.on('join', (data) => {
      const {uid} = data

      this.online[uid] = uid
      // console.dir(`[user]${uid} joined`, {colors: true})
      socket.join(uid)
    })

    socket.on('new-reply', data => {
      //uid: userId; cid: commentId
      const { from, to, cid } = data

      if(this.online[to]){
        // console.dir(`[user]${uid} reply [user]${to} with [comment]${JSON.stringify(comment)}`, {colors: true})
        io.sockets.to(to).emit('message', {message: 'new-reply', from, cid})
      }
    })

  })

  return io
}
