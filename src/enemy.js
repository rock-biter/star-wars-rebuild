import gsap from 'gsap'
import Explosion from './explosion'

const domElement = document.querySelector('.enemy')
domElement.remove()
const SPACE_3D = document.getElementById('spazio_3d')

export default class Enemy {
	domElement = domElement.cloneNode(true)
	space = SPACE_3D
	spinSpeed = Math.random() - 0.5
	speed = 5000
	z = -10000
	sizes = {
		x: 150,
		y: 150,
	}

	constructor(enemies, player) {
		this.enemies = enemies
		this.player = player
		this.enemies.push(this)
		this.init()
	}

	init() {
		this.x = (Math.random() - 0.5) * window.innerWidth * 0.4
		this.y = (Math.random() - 0.5) * window.innerHeight * 0.4

		gsap.set(this.domElement, { x: this.x, y: this.y, z: this.z })

		this.space.prepend(this.domElement)
	}

	explode() {
		this.removeEnemy()
		// far coimparire l'esplosione
		new Explosion(this.x, this.y, this.z)
	}

	removeEnemy() {
		this.domElement.remove()
		const i = this.enemies.indexOf(this)

		if (i !== -1) {
			this.enemies.splice(i, 1)
		}
	}

	update(dt) {
		this.z += dt * this.speed
		gsap.set(this.domElement, {
			z: this.z,
			rotate: `+=${dt * 100 * this.spinSpeed}`,
		})

		if (this.z >= 0) {
			gsap.set(this.domElement, { zIndex: 200 })
		}

		if (this.z > 1000) {
			// console.log('elima t-fighter')
			// rimuovere el dal dom e dall'array enemies
			this.removeEnemy()

			this.player.hit()

			// togliere vita al giocatore
		}
	}
}
