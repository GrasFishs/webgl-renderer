export type TextureParam =
  | {
      src: string
      filter: 'Linear' | 'Nearest'
    }
  | string

export class Texture {
  private id: WebGLTexture
  public loadAwait: Promise<Texture> | null = null

  constructor(param: TextureParam, private gl: WebGL2RenderingContext) {
    const src = typeof param === 'string' ? param : param.src
    const filter =
      typeof param === 'string'
        ? gl.LINEAR
        : { Linear: gl.LINEAR, Nearest: gl.NEAREST }[param.filter]
    this.id = gl.createTexture()!
    // 图像Y翻转
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
    const img = new Image()
    const format = src.endsWith('.png') ? gl.RGBA : gl.RGB
    this.loadAwait = new Promise((resolve) => {
      img.onload = () => {
        this.loadAwait = null
        this.bind()
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
        gl.texImage2D(gl.TEXTURE_2D, 0, format, format, gl.UNSIGNED_BYTE, img)
        gl.generateMipmap(gl.TEXTURE_2D)
        resolve(this)
      }
      img.src = src
    })
  }

  public bind(slot: number = 0) {
    this.gl.activeTexture(this.gl.TEXTURE0 + slot)
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.id)
  }

  public unbind() {
    this.gl.bindTexture(this.gl.TEXTURE_2D, null)
  }
}
