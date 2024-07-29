#version 300 es
precision highp float;

uniform float iTime;
uniform vec2 iResolution;

out vec4 fragColor;

#define hash3(p) fract(sin(1e3 * dot(p, vec3(1, 57, -13.7))) * 4375.5453)

float noise3(vec3 x) {
    vec3 p = floor(x), f = fract(x);
    f = f * f * (3.0 - 2.0 * f);

    return mix(
        mix(
            mix(hash3(p + vec3(0, 0, 0)), hash3(p + vec3(1, 0, 0)), f.x),
            mix(hash3(p + vec3(0, 1, 0)), hash3(p + vec3(1, 1, 0)), f.x), f.y),
        mix(
            mix(hash3(p + vec3(0, 0, 1)), hash3(p + vec3(1, 0, 1)), f.x),
            mix(hash3(p + vec3(0, 1, 1)), hash3(p + vec3(1, 1, 1)), f.x), f.y), f.z);
}

#define noise(x) (noise3(x) + noise3(x + 11.5)) / 2.0

void main(void) {
    vec2 R = iResolution.xy;
    vec2 fragCoord = gl_FragCoord.xy;
    float n = noise(vec3(fragCoord * 8.0 / R.y, 0.1 * iTime));
    float v = sin(6.28 * 5.0 * n);
    float t = iTime;

    float threshold = 0.9 * abs(v);
    v = smoothstep(1.0, 0.0, threshold);

    vec3 color1 = vec3(0.98, 0.79, 0.50); // mimosa
    vec3 color2 = vec3(0.98, 0.85, 0.69); // peach
		vec3 color3 = vec3(0.96,0.59,0.44); // coral
    vec3 color4 = vec3(0.965,0.592,0.439); // crimson

		vec3 white = vec3(1., 1., 1.);
		vec3 red = vec3(0.231,0.016,0.016);

    vec3 finalColor = mix(
        mix(color1, color2, noise(vec3(fragCoord * 8.0 / R.y, 0.1 * t))),
        mix(red, color4, noise(vec3(fragCoord * 8.0 / R.y + 5.0, 0.1 * t))),
        v);

    fragColor = vec4(finalColor, 1.0);
}
