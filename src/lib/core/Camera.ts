import { mat4 } from 'gl-matrix'
import { Vector3 } from '../math/Vector3'
import { Model } from './Model'

export class Camera extends Model {
  private proj: mat4

  private front = new Vector3(0, 0, -1)
  private up = new Vector3(0, 1, 0)

  private view = mat4.create()

  constructor(fov: number, aspect: number, near: number, far: number) {
    super()
    this.proj = mat4.perspective(mat4.create(), fov, aspect, near, far)
  }

  public lookAt(target: Vector3) {
    const eye = new Vector3(this.transform.x, this.transform.y, this.transform.z)
    mat4.lookAt(this.view, eye.get(), target.get(), this.up.get())
  }

  public get() {
    return mat4.mul(mat4.create(), this.proj, this.view)
  }
}
