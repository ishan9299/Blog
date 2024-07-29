#version 300 es
precision mediump float;
in highp vec4 aVertexPosition;
void main(void) {
	gl_Position = aVertexPosition;
}
