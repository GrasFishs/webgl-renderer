import { vec3 } from 'gl-matrix'

export class Vector3 {
  protected v: vec3

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

  constructor(x: number, y: number, z: number) {
    this.v = vec3.fromValues(x, y, z)
  }

  get() {
    return vec3.fromValues(this.x, this.y, this.z)
  }

  add(v: Vector3) {
    vec3.add(this.v, this.v, v.get())
  }

  sub(v: Vector3) {
    vec3.sub(this.v, this.v, v.get())
  }

  mul(v: Vector3) {
    vec3.mul(this.v, this.v, v.get())
  }

  div(v: Vector3) {
    vec3.div(this.v, this.v, v.get())
  }

  sqrLen() {
    return vec3.sqrLen(this.v)
  }

  static from(v: vec3) {
    return new Vector3(v[0], v[1], v[2])
  }

  static dot(v: Vector3, u: Vector3) {
    return vec3.dot(v.get(), u.get())
  }

  static cross(v: Vector3, u: Vector3) {
    return this.from(vec3.cross(vec3.create(), v.get(), u.get()))
  }

  static normalize(v: Vector3) {
    return this.from(vec3.normalize(vec3.create(), v.get()))
  }

  static distance(v: Vector3, u: Vector3) {
    return vec3.distance(v.get(), u.get())
  }
}
