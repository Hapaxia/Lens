// https://github.com/Hapaxia/Lens

#version 110

uniform sampler2D texture;

void main()
{
	gl_FragColor = texture2D(texture, gl_TexCoord[0].xy) * gl_Color;
}
