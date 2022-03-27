import { mat4 } from 'gl-matrix'
import { IndexBuffer } from './base/IndexBuffer'
import { Shader } from './base/Shader'
import { Texture, TextureParam } from './base/Texture'
import { VertexArray } from './base/VertexArray'
import { VertexBuffer } from './base/VertexBuffer'
import { GameObject } from './GameObject'
import { Scene } from './Scene'

type MeshParam = {
  data: number[]
  indexes: number[]
  shader: string
  texture?: TextureParam
}

export class Mesh {
  protected vb!: VertexBuffer
  protected ib!: IndexBuffer
  protected va!: VertexArray
  public shader!: Shader
  private father!: GameObject
  private tex: Texture | null = null

  private param!: MeshParam

  public setup(father: GameObject, gl: WebGL2RenderingContext) {
    this.father = father
    const param = this.param
    this.vb = new VertexBuffer(new Float32Array(param.data), gl)
    this.ib = new IndexBuffer(new Int16Array(param.indexes), gl)
    this.shader = new Shader(param.shader, gl)
    this.va = new VertexArray(this.shader, gl)
    this.va.add('Position', 3, gl.FLOAT)
    this.va.add('Normal', 3, gl.FLOAT)
    this.va.add('Coord', 2, gl.FLOAT)
    this.va.setBuffer(this.vb)
    if (this.param.texture) {
      this.tex = new Texture(this.param.texture, gl)
    }
  }

  public init(param: MeshParam) {
    this.param = param
  }

  public async draw(scene: Scene) {
    const model = this.father.transform.get()
    const normal = mat4.transpose(mat4.create(), mat4.invert(mat4.create(), model))
    this.va.bind()
    this.shader.bind()
    if (this.tex) {
      if (this.tex.loadAwait) {
        await this.tex.loadAwait
        this.tex.bind(0)
        this.shader.setUniform1i('u_Texture', 0)
      }
    }
    this.shader.setUniformMatrix4fv('vp', scene.cam.get())
    this.shader.setUniformMatrix4fv('m', model)
    this.shader.setUniformMatrix4fv('n', normal)
    this.ib.draw()
  }
}
