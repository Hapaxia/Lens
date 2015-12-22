// https://github.com/Hapaxia/Lens

#version 120

uniform sampler2D texture;
uniform float amount = 1.0;

void main()
{
	vec4 pixel = texture2D(texture, gl_TexCoord[0].xy);
	vec4 color = pixel * gl_Color;
	gl_FragColor = color * amount + pixel * (1.0 - amount);
}
