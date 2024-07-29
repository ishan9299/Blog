async function loadShaderFile(url) {
	const response = await fetch(url);
	console.log(url);
	console.log(response.text());
	return await response.text();
}

async function main() {
	const canvas = document.getElementById('glCanvas');
	const gl = canvas.getContext('webgl2');
	if (!gl) {
		console.error("WebGL 2 not available");
		return;
	}

	const vertexShaderSource = await loadShaderFile("{% static 'blog_app/shaders/home_vertex.glsl' %}");
	const fragmentShaderSource = await loadShaderFile("{% static 'blog_app/shaders/home_fragment.glsl' %}");

	const vertexShader = gl.createShader(gl.VERTEX_SHADER);
	gl.shaderSource(vertexShader, vertexShaderSource);
	gl.compileShader(vertexShader);
	if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
		console.error('An error occurred compiling the vertex shaders: ' + gl.getShaderInfoLog(vertexShader));
		gl.deleteShader(vertexShader);
		return;
	}

	const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
	gl.shaderSource(fragmentShader, fragmentShaderSource);
	gl.compileShader(fragmentShader);
	if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
		console.error('An error occurred compiling the fragment shaders: ' + gl.getShaderInfoLog(fragmentShader));
		gl.deleteShader(fragmentShader);
		return;
	}

	const shaderProgram = gl.createProgram();
	gl.attachShader(shaderProgram, vertexShader);
	gl.attachShader(shaderProgram, fragmentShader);
	gl.linkProgram(shaderProgram);
	if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
		console.error('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
		return;
	}

	gl.useProgram(shaderProgram);

	const vertexPosition = gl.getAttribLocation(shaderProgram, 'aVertexPosition');

	const vertices = new Float32Array([
		1.0,  1.0,
		1.0, -1.0,
		-1.0,  1.0,
		1.0, -1.0,
		-1.0, -1.0,
		-1.0,  1.0,
	]);

	const positionBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

	gl.vertexAttribPointer(vertexPosition, 2, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(vertexPosition);

	const iResolution = gl.getUniformLocation(shaderProgram, 'iResolution');
	const iTime = gl.getUniformLocation(shaderProgram, 'iTime');

	window.addEventListener('resize', () => {
		gl.viewport(0, 0, canvas.width, canvas.height);
	});

	function render(time) {
		gl.uniform2f(iResolution, canvas.width, canvas.height);
		gl.uniform1f(iTime, time * 0.001);

		gl.clear(gl.COLOR_BUFFER_BIT);

		gl.viewport(0, 0, canvas.width, canvas.height);
		gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 2);

		requestAnimationFrame(render);
	}
	requestAnimationFrame(render);
}

main();
