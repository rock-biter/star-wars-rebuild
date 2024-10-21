import Enemy from './src/enemy'
import Player from './src/player'
import './style.css'

const enemies = []
const player = new Player(enemies)
let tabFocus = true

document.addEventListener('visibilitychange', (event) => {
	console.log(event)
	console.log('document is hidden', document.hidden)

	if (document.hidden) {
		tabFocus = false
	} else {
		tabFocus = true
	}
})

const timer = setInterval(() => {
	tabFocus && new Enemy(enemies, player)
}, 500)

// for (let i = 0; i < 10; i++) {
// const element = array[i];
// enemies.push(new Enemy(enemies))
// }

let time = 0

function tic(t) {
	// console.log(time)
	const dt = Math.min((t - time) / 1000, 0.02)
	time = t

	// console.log(dt)
	// console.log(enemies)

	player.update()

	enemies.forEach((enemy) => {
		enemy.update(dt)
	})

	requestAnimationFrame(tic)
}

requestAnimationFrame(tic)
