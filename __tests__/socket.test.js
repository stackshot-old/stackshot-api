const io = require('socket.io-client')
import {url} from './config'

const options = {
	transports: ['websocket'],
	'force new connection': true
}

describe('socket', () => {
	it('should send and receive comment' , async() => {
		const client1 = io.connect(url, options)
		const client2 = io.connect(url, options)

		client1.on('connect', () => {
			client1.emit('join', {uid: '1'})
		})

		client2.on('connect', () => {
			client2.emit('join', {uid: '2'})
			client2.emit('new-reply', { from: '2', to: '1', cid: '001' })
		})

		client1.on('message', msg=> {
			expect(msg).toContainEqual({ message: 'new-reply', from: '2', cid: '001' })
			client1.emit('new-reply', { from: '1', to: '2', cid: '002'})
		})

		client2.on('message', msg=> {
			expect(msg).toContainEqual({ message: 'new-reply', from: '1', cid: '002' })
		})

	})
})
