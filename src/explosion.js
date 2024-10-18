import gsap from 'gsap'

const domElement = document.createElement('div')
domElement.classList.add('esplosione')
// <div class="esplosione"><audio src="media/boom.mp3" controls autoplay></div>

const SPACE_3D = document.getElementById('spazio_3d')

export default class Explosion {
	domElement = domElement.cloneNode(true)
	space = SPACE_3D

	constructor(x, y, z) {
		this.space.appendChild(this.domElement)

		gsap.set(this.domElement, { x, y, z })

		setTimeout(() => {
			// this.domElement.remove()
		}, 500)
	}
}
