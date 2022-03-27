export class VertexBuffer {
  private id: WebGLBuffer

  constructor(data: Float32Array, private gl: WebGL2RenderingContext) {
    this.id = gl.createBuffer()!
    this.bind()
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW)
  }

  public bind() {
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.id)
  }

  public unbind() {
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, 0)
  }
}
