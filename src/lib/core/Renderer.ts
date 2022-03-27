import { Camera } from './Camera'
import { Scene } from './Scene'

export class Renderer {
  public gl: WebGL2RenderingContext

  constructor(cvs: HTMLCanvasElement, public width: number, public height: number) {
    cvs.width = width
    cvs.height = height
    this.gl = cvs.getContext('webgl2')!
    this.gl.enable(this.gl.BLEND)
    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA)
    this.gl.enable(this.gl.DEPTH_TEST)
  }

  public setup(scene: Scene, cam: Camera) {
    scene.setup(this, cam)
  }

  private clear() {
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0)
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT)
  }

  public render(scene: Scene) {
    this.clear()
    scene.draw()
  }
}
