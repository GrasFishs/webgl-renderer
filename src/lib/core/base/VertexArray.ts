import { Shader } from './Shader'
import { VertexBuffer } from './VertexBuffer'

type Layout = {
  name: string
  offset: number
  type: GLenum
  stripe: number
}

export class VertexArray {
  private layouts: Layout[] = []
  private id: WebGLVertexArrayObject
  constructor(private shader: Shader, private gl: WebGL2RenderingContext) {
    this.id = gl.createVertexArray()!
    this.bind()
  }

  public add(name: string, offset: number, type: GLenum) {
    this.layouts.push({
      name,
      offset,
      type,
      stripe: offset * this.getSize(type)
    })
  }

  public bind() {
    this.gl.bindVertexArray(this.id)
  }

  public unbind() {
    this.gl.bindVertexArray(0)
  }

  public setBuffer(vb: VertexBuffer) {
    this.bind()
    vb.bind()
    let total = 0
    const totalStripe = this.layouts.reduce((t, l) => t + l.stripe, 0)
    this.layouts.forEach(({ name, offset, type, stripe }) => {
      const loc = this.gl.getAttribLocation(this.shader.getId(), name)
      this.gl.enableVertexAttribArray(loc)
      this.gl.vertexAttribPointer(loc, offset, type, false, totalStripe, total)
      total += stripe
    })
  }

  private getSize(type: GLenum) {
    const { FLOAT, BYTE, UNSIGNED_SHORT } = this.gl
    return {
      [FLOAT]: 4,
      [BYTE]: 2,
      [UNSIGNED_SHORT]: 4
    }[type]
  }
}
