import { Camera } from './Camera'
import { GameObject } from './GameObject'
import { Renderer } from './Renderer'

export class Scene {
  public gl!: WebGL2RenderingContext

  public cam!: Camera

  private gameObjects: GameObject[] = []

  public setup(renderer: Renderer, cam: Camera) {
    this.gl = renderer.gl
    this.cam = cam
    this.gameObjects.forEach((go) => go.setup(this))
  }

  public draw() {
    this.gameObjects.forEach((go) => go.draw())
  }

  public add(go: GameObject) {
    this.gameObjects.push(go)
  }
}
