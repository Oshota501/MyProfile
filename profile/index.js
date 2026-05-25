class WebGLCanvasFactory {
    /**
     * CanvasContext
     */
    context

    /**
     * HTML Element
     */
    canvas

    constructor(){
        const canvas = document.createElement("canvas");

        canvas.width = window.screen.width ;
        canvas.height = window.screen.height;
        canvas.style = "width:100vw;height:100vh;margin:0px;padding:0px;";

        this.context = canvas.getContext("webgl");

        if(!this.context) {
            alert(
                "Unable to initialize WebGL. Your browser or machine may not support it.",
            );
        }

        this.canvas = canvas;
        this.context.clearColor(0.0, 0.0, 0.0, 1.0);
        this.context.clear(this.context.COLOR_BUFFER_BIT);
    }
}

class Shader {
    #vertexSource ;
    /**
     * Vertex shader source
     * @returns string
     */
    get vertexSource () {
        return this.#vertexSource;
    }

    #fragmentSource ;
    /**
     * Fragment shader source
     * @return string
     */
    get fragmentSource () {
        return this.#fragmentSource;
    }

    /**
     * Shader program.
     */
    program

    /**
     * Shader program compiler.
     * @param {string} vertSource 
     * @param {string} fragSource 
     * @param {WebGLRenderingContext} contex
     */
    constructor(vertSource, fragSource, context) {
        this.#vertexSource = vertSource;
        this.#fragmentSource = fragSource;
        this.context = context;
        this.program = Shader.initShaderProgram(context, vertSource, fragSource);
    }

    use () {
        this.context.useProgram(this.program);
    }

    /**
     * 
     * @param {WebGLRenderingContext} gl 
     * @param {string} vsSource 
     * @param {string} fsSource 
     * @returns {WebGLProgram}
     */
    static initShaderProgram(gl, vsSource, fsSource) {
        const vertexShader = Shader.loadShader(gl, gl.VERTEX_SHADER, vsSource);
        const fragmentShader = Shader.loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

        // Create the shader program

        const shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);
        gl.linkProgram(shaderProgram);

        // If creating the shader program failed, alert

        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert(
            `Unable to initialize the shader program: ${gl.getProgramInfoLog(
                shaderProgram,
            )}`,
        );
        return null;
        }

        return shaderProgram;
    }

    /**
     * 
     * @param {WebGLRenderingContext} gl 
     * @param {number} type 
     * @param {number} source 
     * @returns {WebGLShader|null}
     */
    static loadShader(gl, type, source) {
        const shader = gl.createShader(type);
        // Send the source to the shader object
        gl.shaderSource(shader, source);
        // Compile the shader program
        gl.compileShader(shader);
        // See if it compiled successfully
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            alert(
              `An error occurred compiling the shaders: ${gl.getShaderInfoLog(shader)}`,
            );
            gl.deleteShader(shader);
            return null;
        }
        return shader;
    }
}

class ShaderUniform {
    #gl
    #shader
    #locations = new Map();

    /**
     * @param {WebGLRenderingContext} gl
     * @param {Shader} shader
     */
    constructor(gl, shader) {
        this.#gl = gl;
        this.#shader = shader;
    }

    /**
     * @param {string} name
     * @returns {WebGLUniformLocation|null}
     */
    get(name) {
        if (!this.#locations.has(name)) {
            this.#locations.set(name, this.#gl.getUniformLocation(this.#shader.program, name));
        }

        return this.#locations.get(name);
    }

    /**
     * @param {string} name
     * @param {number} value
     */
    set1f(name, value) {
        this.#gl.uniform1f(this.get(name), value);
    }

    /**
     * @param {string} name
     * @param {number[]} value
     */
    set2fv(name, value) {
        this.#gl.uniform2fv(this.get(name), value);
    }

    /**
     * @param {string} name
     * @param {number} value
     */
    set1i(name, value) {
        this.#gl.uniform1i(this.get(name), value);
    }

    /**
     * @param {string} name
     * @param {number[]} value
     */
    setMatrix4fv(name, value) {
        this.#gl.uniformMatrix4fv(this.get(name), false, value);
    }
}

class ShaderBuffer {
    #gl
    #buffers = new Map();

    /**
     * @param {WebGLRenderingContext} gl
     */
    constructor(gl) {
        this.#gl = gl;
    }

    /**
     * @param {string} name
     * @param {number[]} data
     * @returns {WebGLBuffer|null}
     */
    createArrayBuffer(name, data) {
        const buffer = this.#gl.createBuffer();
        this.#gl.bindBuffer(this.#gl.ARRAY_BUFFER, buffer);
        this.#gl.bufferData(this.#gl.ARRAY_BUFFER, new Float32Array(data), this.#gl.STATIC_DRAW);
        this.#buffers.set(name, buffer);

        return buffer;
    }

    /**
     * @param {string} name
     */
    bind(name) {
        this.#gl.bindBuffer(this.#gl.ARRAY_BUFFER, this.#buffers.get(name));
    }
}

class ITickable {
    /**
     * tick function.
     * @param {number} deltaMS 
     */
    tick = (deltaMS)=> {}
}

class TickableManager {
    /**
     * ITickable
     * @type {Set<ITickable>}
     */
    #impleTickable = new Set();
    #step
    #interval

    #fps
    /**
     * @returns number
     */
    get fps () {
        return this.#fps;
    }

    /**
     * Tickable manager constructor.
     * @param {number} fps 
     */
    constructor(fps) {
        this.#fps = fps;
        this.#step = (1/fps) * 1000;
    }

    start () {
        if(!this.#interval)
            this.#interval = setInterval(() => this._ticks(this.#step), this.#step);
        else
            console.warn("Ticker is started.");
    }

    stop () {
        if(this.#interval)
            clearInterval(this.#interval);
        else
            console.warn("Ticker is not started.");
    }

    /**
     * @param {ITickable} tickable 
     */
    append (tickable) {
        this.#impleTickable.add(tickable);
    }
    /**
     * @param {ITickable} tickable 
     */
    delete (tickable) {
        this.#impleTickable.delete(tickable);
    }
    /**
     * @param {number} deltaTime 
     */
    _ticks (deltaMS) {
        this.#impleTickable.forEach((value) => {
            value.tick(deltaMS);
        });
    }
}

/**
 * @implements {ITickable}
 */
class TickableShaderModule {
    tick (deltaMS) {
        this.#time += deltaMS;

        const gl = this.#shader.context;
        const canvas = gl.canvas;

        this.#shader.use();
        this.#buffer.bind("position");

        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.clearColor(0.06, 0.08, 0.12, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.enableVertexAttribArray(this.#positionLocation);
        gl.vertexAttribPointer(this.#positionLocation, 3, gl.FLOAT, false, 0, 0);

        this.#uniform.set1f("uTime", this.#time * 0.001);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
    #shader
    #uniform
    #buffer
    #positionLocation
    #time = 0
    /**
     * @param {Shader} shader
     * @param {ShaderUniform} uniform
     * @param {ShaderBuffer} buffer
     */
    constructor (shader, uniform, buffer) {
        this.#shader = shader;
        this.#uniform = uniform;
        this.#buffer = buffer;
        this.#positionLocation = shader.context.getAttribLocation(shader.program, "aVertexPosition");
    }
}

class ProfileBackgroundManager {
    canvas = new WebGLCanvasFactory();
    background ;
    tickable = new TickableManager();

    constructor () {
        const parentElement = document.getElementsByClassName("canvas-manager")[0];

        if(!parentElement) {
            throw new Error("Canvas Manager is undefined. please add the element that class=\"canvas-manager\" was implemented ");
        }

        parentElement.append(this.canvas.canvas);

        const shader = new Shader(
            /* vertex */ `
            attribute vec4 aVertexPosition;
            varying vec2 vUv;
            void main() {
                vUv = (aVertexPosition.xy + 1.0) * 0.5;
                gl_Position = aVertexPosition;
            }
            `,
            /* fragment */ `
            precision mediump float;
            uniform float uTime;
            varying vec2 vUv;
            void main() {
                vec3 color = vec3(
                    0.5 + 0.5 * sin(uTime + vUv.x * 6.2831),
                    0.5 + 0.5 * sin(uTime * 0.7 + vUv.y * 6.2831),
                    0.5 + 0.5 * sin(uTime * 1.3 + (vUv.x + vUv.y) * 3.1415)
                );
                gl_FragColor = vec4(color, 1.0);
            }
            `,
            this.canvas.context,
        );

        const uniform = new ShaderUniform(this.canvas.context, shader);
        const buffer = new ShaderBuffer(this.canvas.context);
        buffer.createArrayBuffer("position", [
            -1.0,  1.0, 0.0,
            -1.0, -1.0, 0.0,
             1.0,  1.0, 0.0,
             1.0, -1.0, 0.0,
        ]);

        this.background = new TickableShaderModule(
            shader,
            uniform,
            buffer,
        );

        this.tickable.append(this.background);
        this.tickable.start();
    }
}

new ProfileBackgroundManager();
