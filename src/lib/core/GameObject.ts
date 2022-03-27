import { Mesh } from './Mesh'
import { Model } from './Model'
import { Scene } from './Scene'

export abstract class GameObject extends Model {
  protected gl!: WebGL2RenderingContext

  protected scene!: Scene

  protected meshes: Mesh[] = []

  public setup(scene: Scene) {
    this.gl = scene.gl
    this.scene = scene
    this.init(scene)
    this.meshes.forEach((mesh) => {
      mesh.setup(this, this.gl)
    })
  }

  public abstract init(scene: Scene): void

  public draw() {
    this.meshes.forEach((m) => {
      m.draw(this.scene)
    })
  }
}
