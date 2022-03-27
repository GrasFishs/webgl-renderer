import { Cube } from './lib/components/Cube'
import { Camera } from './lib/core/Camera'
import { Renderer } from './lib/core/Renderer'
import { Scene } from './lib/core/Scene'
import { radians } from './lib/math'
import { Vector3 } from './lib/math/Vector3'
import wall from './res/img/wall.jpg'

const scene = new Scene()

const cube = new Cube({
  size: [1, 1, 1],
  color: [1, 1, 0.5, 1]
})

const plane = new Cube({
  size: [10, 0.01, 10],
  texture: {
    src: wall,
    filter: 'Nearest'
  }
})

plane.transform.y = -0.5

scene.add(plane)
scene.add(cube)

const renderer = new Renderer(document.querySelector('canvas')!, 600, 400)

const camera = new Camera(radians(45), renderer.width / renderer.height, 1 / 256, 256)
camera.transform.translate(2, 2, 2)
camera.lookAt(new Vector3(0, 0, 0))
renderer.setup(scene, camera)

let angle = 0

function animate() {
  cube.transform.rotateY(radians(angle++))
  renderer.render(scene)
  requestAnimationFrame(animate)
}

animate()
