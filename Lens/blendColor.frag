// https://github.com/Hapaxia/Lens

#version 120

uniform sampler2D texture;
uniform float amount = 0.0;

void main()
{
	vec4 pixel = texture2D(texture, gl_TexCoord[0].xy);
	gl_FragColor = gl_Color * amount + pixel * (1.0 - amount);
}
