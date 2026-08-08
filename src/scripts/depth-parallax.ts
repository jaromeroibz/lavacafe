/**
 * Depth-map displacement parallax.
 *
 * Samples a greyscale depth map (white = near, black = far) and offsets the
 * colour image's UVs per-pixel against the pointer. The glass and the hand
 * travel one way, the blurred shelving behind travels the other — which is what
 * separates this from moving the whole photo as one flat plane.
 *
 * Raw WebGL1 on purpose: this is ~120 lines and a fullscreen quad, so pulling in
 * a 3D library would cost more bytes than the effect itself.
 */

const VERT = `
attribute vec2 a_pos;
varying vec2 v_uv;
void main() {
  v_uv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}`;

const FRAG = `
precision highp float;
varying vec2 v_uv;

uniform sampler2D u_image;
uniform sampler2D u_depth;
uniform vec2  u_res;        // canvas size in px
uniform float u_imgAspect;  // image w/h
uniform float u_focusY;     // matches CSS object-position
uniform vec2  u_pointer;    // smoothed, roughly -1..1
uniform float u_strength;
uniform float u_amount;     // 0..1 fade-in

void main() {
  // Reproduce object-fit: cover so the canvas frames the photo exactly the way
  // the <img> underneath it does.
  float canvasAspect = u_res.x / u_res.y;
  vec2 s = canvasAspect > u_imgAspect
    ? vec2(1.0, u_imgAspect / canvasAspect)
    : vec2(canvasAspect / u_imgAspect, 1.0);

  // Matches how CSS resolves object-position: the image's focusY point is
  // aligned to the container's focusY point, so canvas and <img> frame alike.
  float centerY = (1.0 - s.y) * u_focusY + s.y * 0.5;
  vec2 uv = vec2((v_uv.x - 0.5) * s.x + 0.5, (v_uv.y - 0.5) * s.y + centerY);

  float depth = texture2D(u_depth, uv).r;

  // Centred on 0.5 so near and far move in opposite directions.
  vec2 offset = u_pointer * (depth - 0.5) * u_strength * u_amount;

  gl_FragColor = texture2D(u_image, uv + offset);
}`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn('[depth-parallax] shader failed:', gl.getShaderInfoLog(shader));
    return null;
  }
  return shader;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`could not load ${src}`));
    img.src = src;
  });
}

function makeTexture(gl: WebGLRenderingContext, img: HTMLImageElement) {
  const tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);
  // WebGL's texture origin is bottom-left, an <img>'s is top-left. Without this
  // the photo renders upside down.
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  // Non-power-of-two sources: clamp and no mipmaps.
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
  return tex;
}

export interface DepthParallaxOptions {
  imageSrc: string;
  depthSrc: string;
  /** Image aspect ratio, width / height. */
  aspect: number;
  /** Vertical focal point, matching CSS object-position. */
  focusY?: number;
  /** Peak UV displacement. 0.03 ≈ 3% of the image. */
  strength?: number;
}

/** Resolves to a teardown function, or null if WebGL is unavailable. */
export async function initDepthParallax(
  canvas: HTMLCanvasElement,
  opts: DepthParallaxOptions
): Promise<(() => void) | null> {
  const gl =
    (canvas.getContext('webgl', { antialias: false, alpha: false }) as WebGLRenderingContext) ||
    (canvas.getContext('experimental-webgl') as WebGLRenderingContext | null);

  if (!gl) return null;

  const vs = compile(gl, gl.VERTEX_SHADER, VERT);
  const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
  if (!vs || !fs) return null;

  const program = gl.createProgram()!;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.warn('[depth-parallax] link failed:', gl.getProgramInfoLog(program));
    return null;
  }
  gl.useProgram(program);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const aPos = gl.getAttribLocation(program, 'a_pos');
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  let image: HTMLImageElement, depth: HTMLImageElement;
  try {
    [image, depth] = await Promise.all([loadImage(opts.imageSrc), loadImage(opts.depthSrc)]);
  } catch (err) {
    console.warn('[depth-parallax]', err);
    return null;
  }

  gl.activeTexture(gl.TEXTURE0);
  makeTexture(gl, image);
  gl.activeTexture(gl.TEXTURE1);
  makeTexture(gl, depth);

  const u = {
    image: gl.getUniformLocation(program, 'u_image'),
    depth: gl.getUniformLocation(program, 'u_depth'),
    res: gl.getUniformLocation(program, 'u_res'),
    imgAspect: gl.getUniformLocation(program, 'u_imgAspect'),
    focusY: gl.getUniformLocation(program, 'u_focusY'),
    pointer: gl.getUniformLocation(program, 'u_pointer'),
    strength: gl.getUniformLocation(program, 'u_strength'),
    amount: gl.getUniformLocation(program, 'u_amount'),
  };

  gl.uniform1i(u.image, 0);
  gl.uniform1i(u.depth, 1);
  gl.uniform1f(u.imgAspect, opts.aspect);
  gl.uniform1f(u.focusY, opts.focusY ?? 0.5);
  gl.uniform1f(u.strength, opts.strength ?? 0.03);

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.round(canvas.clientWidth * dpr);
    const h = Math.round(canvas.clientHeight * dpr);
    if (w === 0 || h === 0) return;
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
    gl.viewport(0, 0, w, h);
    gl.uniform2f(u.res, w, h);
  };

  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);

  const target = { x: 0, y: 0 };
  const current = { x: 0, y: 0 };
  let amount = 0;
  let raf = 0;
  let running = true;

  const onPointerMove = (e: PointerEvent) => {
    target.x = (e.clientX / window.innerWidth - 0.5) * 2;
    target.y = (e.clientY / window.innerHeight - 0.5) * 2;
  };

  const render = () => {
    if (!running) return;
    // Critically damped enough to feel like weight rather than lag.
    current.x += (target.x - current.x) * 0.06;
    current.y += (target.y - current.y) * 0.06;
    amount += (1 - amount) * 0.04;

    gl.uniform2f(u.pointer, current.x, current.y);
    gl.uniform1f(u.amount, amount);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    raf = requestAnimationFrame(render);
  };

  window.addEventListener('pointermove', onPointerMove, { passive: true });
  raf = requestAnimationFrame(render);

  return () => {
    running = false;
    cancelAnimationFrame(raf);
    ro.disconnect();
    window.removeEventListener('pointermove', onPointerMove);
  };
}
