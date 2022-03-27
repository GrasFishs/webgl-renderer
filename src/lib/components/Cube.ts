import { TextureParam } from '../core/base/Texture'
import { GameObject } from '../core/GameObject'
import { Mesh } from '../core/Mesh'

const VERTEX_OBJ = `
-0.5, -0.5,  0.5,   0, -1, 0,   0, 0,
 0.5, -0.5,  0.5,   0, -1, 0,   1, 0,
 0.5, -0.5, -0.5,   0, -1, 0,   1, 1,
-0.5, -0.5, -0.5,   0, -1, 0,   0, 1,

-0.5, -0.5,  0.5,   0, 0, 1,    0, 0,
 0.5, -0.5,  0.5,   0, 0, 1,    1, 0,
 0.5,  0.5,  0.5,   0, 0, 1,    1, 1,
-0.5,  0.5,  0.5,   0, 0, 1,    0, 1,

 0.5, -0.5,  0.5,   1, 0, 0,    0, 0,
 0.5, -0.5, -0.5,   1, 0, 0,    1, 0,
 0.5,  0.5, -0.5,   1, 0, 0,    1, 1,
 0.5,  0.5,  0.5,   1, 0, 0,    0, 1,

 0.5, -0.5, -0.5,   0, 0, -1,   0, 0,
-0.5, -0.5, -0.5,   0, 0, -1,   1, 0,
-0.5,  0.5, -0.5,   0, 0, -1,   1, 1,
 0.5,  0.5, -0.5,   0, 0, -1,   0, 1,

-0.5, -0.5, -0.5,   -1, 0, 0,   0, 0,
-0.5, -0.5,  0.5,   -1, 0, 0,   1, 0,
-0.5,  0.5,  0.5,   -1, 0, 0,   1, 1,
-0.5,  0.5, -0.5,   -1, 0, 0,   0, 1,

-0.5,  0.5,  0.5,   0, 1, 0,    0, 0,
 0.5,  0.5,  0.5,   0, 1, 0,    1, 0,
 0.5,  0.5, -0.5,   0, 1, 0,    1, 1,
-0.5,  0.5, -0.5,   0, 1, 0,    0, 1
`

const SHADER = `
#shader vert
attribute vec4 Position;
attribute vec3 Normal;
attribute vec2 Coord;
varying vec2 v_coord;
varying vec3 v_normal;
varying vec3 v_fragPos;
uniform mat4 n;

uniform mat4 vp;
uniform mat4 m;

void main () {
  gl_Position = vp * m * Position;
  v_coord = Coord;
  v_normal = vec3((n * vec4(Normal, 1.0)).xyz);
  v_fragPos = vec3(m * Position);
}

#shader frag
precision mediump float;
uniform sampler2D u_Texture;
uniform vec4 u_Color;
varying vec2 v_coord;
varying vec3 v_normal;
varying vec3 v_fragPos;

vec3 getAmbient(float strenth) {
  return strenth * vec3(1.0, 1.0, 1.0);
}

vec3 getDiffuse () {
  vec3 lightDir = normalize(vec3(2.0, 3.0, 4.0));
  vec3 norm = normalize(v_normal);
  float diff = max(dot(norm, lightDir), 0.0);
  return diff * vec3(1.0, 1.0, 1.0);
}

void main () {
  vec3 diffuse = getDiffuse();

  float strenth = 0.1;
  vec3 ambient = getAmbient(strenth);
  vec4 color = vec4((v_normal + 1.0) / 2.0, 1);
  vec4 lighting = vec4((ambient + diffuse), 1);

  if (u_Color != vec4(0.0, 0.0, 0.0, 0.0)) {
    color = lighting * u_Color;
  } else {
    color = lighting * texture2D(u_Texture, v_coord);
  }
  gl_FragColor = color;
}`

const DATA = VERTEX_OBJ.replace(/[\n\s]/g, '')
  .split(',')
  .map((v) => Number(v))

const FACES = DATA.length / (8 * 4)

const indexes = Array.from({ length: FACES })
  .map((_, i) => [0, 1, 2, 2, 3, 0].map((n) => n + i * 4))
  .flat()

function resize(size: [number, number, number]): number[] {
  const x = size[0] / 2
  const y = size[1] / 2
  const z = size[2] / 2
  const d = DATA.slice()
  for (let i = 0; i < d.length; i += 8) {
    d[i] = d[i] < 0 ? -x : x
    d[i + 1] = d[i + 1] < 0 ? -y : y
    d[i + 2] = d[i + 2] < 0 ? -z : z
  }
  return d
}

type Param = {
  size: [number, number, number]
  texture?: TextureParam
  color?: [number, number, number, number]
}

export class Cube extends GameObject {
  constructor(private param: Param) {
    super()
  }

  public init(): void {
    const mesh = new Mesh()
    const data = resize(this.param.size)
    mesh.init({ data, indexes, shader: SHADER, texture: this.param.texture })
    this.meshes.push(mesh)
  }

  public draw(): void {
    if (this.param.color) {
      const shader = this.meshes[0].shader
      shader.bind()
      shader.setUniform4f('u_Color', this.param.color)
    }

    super.draw()
  }
}
