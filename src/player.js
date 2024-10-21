import gsap from 'gsap'
import Laser from './laser'
import Enemy from './enemy'

const domElement = document.querySelector('.player')
const SPACE_3D = document.getElementById('spazio_3d')

const formatter = new Intl.NumberFormat('it-It')

export default class Player {
	domElement = domElement
	space = SPACE_3D
	life = 100
	score = 0
	scoreDomElement = document.querySelector('.punti')

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
		this.life -= 10

		console.log(this.life)

		if (this.life === 0) {
			this.score = 0
			this.life = 100
			this.enemies.forEach((e) => e.removeEnemy())
			this.updateScore(0)
		}

		gsap.to('.life circle', {
			strokeDasharray: `${(189 * this.life) / 100} 200`,
		})
	}

	updateScore(pts) {
		this.score += pts

		console.log(this.score, formatter.format(this.score))

		this.scoreDomElement.textContent = formatter.format(this.score)
		// gsap.set('.punti', { textContent: '' + formatter.format(this.score) })
	}

	checkCollision(laser) {
		const edges = laser.getEdges()

		const destroyedEnemy = []

		edges.forEach(({ x, y }) => {
			const enemy = this.enemies.find((enemy) => {
				const dx = Math.abs(enemy.x - x)
				const dy = Math.abs(enemy.y - y)

				// console.log(dx, dy)
				// console.log(enemy.sizes.x, enemy.sizes.y)

				const { sizes } = enemy

				if (dx < sizes.x * 0.5 && dy < sizes.y * 0.5 && enemy.z < 0) {
					this.updateScore(1000)
					return true
				}
			})

			if (enemy) {
				destroyedEnemy.push(enemy)
				// new Enemy(this.enemies)
			}
		})

		destroyedEnemy.forEach((enemy) => enemy.explode())
	}

	initMouseEvents() {
		window.addEventListener('mousemove', (e) => {
			const x = e.clientX - window.innerWidth * 0.5
			const y = e.clientY - window.innerHeight * 0.5

			const dx = this.pointer.x - x

			// this.spin = -dx
			gsap.to(this, { spin: -dx, duration: 0.2 })

			this.pointer.x = x
			this.pointer.y = y

			// console.log(this.pointer.x, this.pointer.y)
		})

		window.addEventListener('click', () => {
			this.fire()
		})
	}
}
