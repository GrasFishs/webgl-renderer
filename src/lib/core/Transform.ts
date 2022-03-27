import { mat4, vec3 } from 'gl-matrix'

/**
 * 0  1  2  12
 * 3  4  5  13
 * 6  7  8  14
 * 9 10 11  15
 */
export class Transform {
  private tm: mat4 = mat4.create()
  private rm: mat4 = mat4.create()
  private sm: mat4 = mat4.create()

  public get x() {
    return this.tm[12]
  }

  public set x(v: number) {
    this.tm[12] = v
  }

  public get y() {
    return this.tm[13]
  }

  public set y(v: number) {
    this.tm[13] = v
  }

  public get z() {
    return this.tm[14]
  }

  public set z(v: number) {
    this.tm[14] = v
  }

  public translate(x: number, y: number, z: number) {
    this.x = x
    this.y = y
    this.z = z
    return this
  }

  public scale(s: number) {
    mat4.scale(this.sm, mat4.create(), vec3.fromValues(s, s, s))
    return this
  }

  public scaleX(x: number) {
    mat4.scale(this.sm, mat4.create(), vec3.fromValues(x, this.sm[4], this.sm[8]))
    return this
  }

  public scaleY(y: number) {
    mat4.scale(this.sm, mat4.create(), vec3.fromValues(this.sm[0], y, this.sm[8]))
    return this
  }

  public scaleZ(z: number) {
    mat4.scale(this.sm, mat4.create(), vec3.fromValues(this.sm[0], this.sm[4], z))
    return this
  }

  public rotate(rad: number, axisX: number, axisY: number, axisZ: number) {
    mat4.rotate(this.rm, mat4.create(), rad, vec3.fromValues(axisX, axisY, axisZ))
    return this
  }

  public rotateX(rad: number) {
    mat4.rotateX(this.rm, mat4.create(), rad)
    return this
  }

  public rotateY(rad: number) {
    mat4.rotateY(this.rm, mat4.create(), rad)
    return this
  }

  public rotateZ(rad: number) {
    mat4.rotateZ(this.rm, mat4.create(), rad)
    return this
  }

  public get() {
    const res = mat4.create()
    mat4.mul(res, res, this.tm)
    mat4.mul(res, res, this.rm)
    mat4.mul(res, res, this.sm)
    return res
  }
}
