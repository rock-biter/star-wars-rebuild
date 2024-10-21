import gsap from 'gsap'

const laser = document.createElement('div')
laser.classList.add('missili')
laser.innerHTML =
	'<audio src="media/laser.mp3" controls autoplay></audio><div class="missile top-dx"></div><div class="missile top-sx"></div><div class="missile bottom-dx"></div><div class="missile bottom-sx"></div>'
const SPACE_3D = document.getElementById('spazio_3d')

export default class Laser {
	domElement = laser.cloneNode(true)
	space = SPACE_3D

	constructor(x, y, spin) {
		this.x = x
		this.y = y

		this.space.appendChild(this.domElement)

		gsap.set(this.domElement, { x, y, rotate: spin })

		setTimeout(() => {
			// console.log('remove')
			this.domElement.remove()
		}, 1000)
	}

	getEdges() {
		return [
			{
				x: this.x + 165,
				y: this.y - 85,
			},
			{
				x: this.x - 165,
				y: this.y - 85,
			},
			{
				x: this.x + 165,
				y: this.y + 85,
			},
			{
				x: this.x - 165,
				y: this.y + 85,
			},
		]
	}
}
