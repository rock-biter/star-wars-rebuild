import Enemy from './src/enemy'
import Player from './src/player'
import './style.css'

const enemies = []
const player = new Player(enemies)

const timer = setInterval(() => {
	new Enemy(enemies, player)
}, 500)

// for (let i = 0; i < 10; i++) {
// const element = array[i];
// enemies.push(new Enemy(enemies))
// }

let time = 0

function tic(t) {
	// console.log(time)
	const dt = (t - time) / 1000
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
