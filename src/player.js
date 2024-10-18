import gsap from 'gsap'
import Laser from './laser'
import Enemy from './enemy'

const domElement = document.querySelector('.player')
const SPACE_3D = document.getElementById('spazio_3d')

export default class Player {
	domElement = domElement
	space = SPACE_3D
	life = 100
	score = 0

	pointer = {
		x: 0,
		y: 0,
	}

	spin = 0

	constructor(enemies) {
		this.enemies = enemies
		this.init()
	}

	init() {
		//
		this.initMouseEvents()
	}

	update() {
		gsap.to(this.domElement, {
			x: this.pointer.x,
			y: this.pointer.y,
			rotate: this.spin,
			duration: 0.2,
		})
	}

	fire() {
		// console.log('fuoco!!!!!')

		// console.log(this.space)

		// this.space.appendChild(laser.cloneNode(true))

		const laser = new Laser(this.pointer.x, this.pointer.y, this.spin)

		this.checkCollision(laser)
	}

	hit() {
		this.life--

		console.log(this.life)

		gsap.to('.life circle', {
			strokeDasharray: `${(189 * this.life) / 100} 200`,
		})

		if (this.life === 0) {
			console.log('game over')
		}
	}

	updateScore(pts) {
		this.score += pts

		gsap.set('.punti', { textContent: this.score })
	}

	checkCollision(laser) {
		const enemy = this.enemies.find((enemy) => {
			const dx = Math.abs(enemy.x - laser.x)
			const dy = Math.abs(enemy.y - laser.y)

			console.log(dx, dy)
			console.log(enemy.sizes.x, enemy.sizes.y)

			const { sizes } = enemy

			if (dx < sizes.x * 0.5 && dy < sizes.y * 0.5) {
				console.log('mi hai colpito')

				this.updateScore(1000)

				return true
			}
		})

		if (enemy) {
			enemy.explode()
			// new Enemy(this.enemies)
		}
	}

	initMouseEvents() {
		window.addEventListener('mousemove', (e) => {
			const x = e.clientX - window.innerWidth * 0.5
			const y = e.clientY - window.innerHeight * 0.5

			const dx = this.pointer.x - x

			this.spin = -dx
			// gsap.to(this, { spin: -dx, duration: 0.2 })

			this.pointer.x = x
			this.pointer.y = y

			// console.log(this.pointer.x, this.pointer.y)
		})

		window.addEventListener('click', () => {
			this.fire()
		})
	}
}
