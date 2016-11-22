const yargs = require('yargs')
const socket = require('socket.io-client')('http://localhost:7999')
const querystring = require('querystring')

const options = yargs(process.argv.slice(2))

options
.alias('j', 'join')
.alias('r', 'reply')

let {argv} = options

const parse = (data) => querystring.parse(data)

socket.on('connect', () => {
	argv.join && socket.emit('join', parse(argv.join))
	argv.reply && socket.emit('new-reply', parse(argv.reply))
})


socket.on('message', data => {
	console.log(data)
})
