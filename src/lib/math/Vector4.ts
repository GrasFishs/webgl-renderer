import { vec4 } from 'gl-matrix'

export class Vector4 {
  protected v: vec4

  public get x() {
    return this.v[0]
  }

  public set x(v: number) {
    this.v[0] = v
  }

  public get y() {
    return this.v[1]
  }

  public set y(v: number) {
    this.v[1] = v
  }

  public get z() {
    return this.v[2]
  }

  public set z(v: number) {
    this.v[2] = v
  }

  public get w() {
    return this.v[3]
  }

  public set w(v: number) {
    this.v[3] = v
  }

  constructor(x: number, y: number, z: number, w: number) {
    this.v = vec4.fromValues(x, y, z, w)
  }

  get() {
    return vec4.fromValues(this.x, this.y, this.z, this.w)
  }

  add(v: Vector4) {
    vec4.add(this.v, this.v, v.get())
  }

  sub(v: Vector4) {
    vec4.sub(this.v, this.v, v.get())
  }

  mul(v: Vector4) {
    vec4.mul(this.v, this.v, v.get())
  }

  div(v: Vector4) {
    vec4.div(this.v, this.v, v.get())
  }

  sqrLen() {
    return vec4.sqrLen(this.v)
  }

  static from(v: vec4) {
    return new Vector4(v[0], v[1], v[2], v[3])
  }

  static dot(v: Vector4, u: Vector4) {
    return vec4.dot(v.get(), u.get())
  }

  static normalize(v: Vector4) {
    return this.from(vec4.normalize(vec4.create(), v.get()))
  }

  static distance(v: Vector4, u: Vector4) {
    return vec4.distance(v.get(), u.get())
  }
}
