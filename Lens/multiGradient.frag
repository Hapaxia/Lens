// https://github.com/Hapaxia/Lens

#version 130

// by Hapaxia (https://github.com/Hapaxia)

uniform bool useTexture = false;
uniform int numberOfSteps = 1;
uniform int windowHeight;

uniform sampler2D texture;
uniform float heights[16];
uniform vec4 colors[16];

vec4 a(int y, float heightA, float heightB, vec4 colorA, vec4 colorB)
{
	float ratio = (y - heightA) / (heightB - heightA);
	return mix(colorA, colorB, ratio);
}

void main()
{
	int y = windowHeight - int(round(gl_FragCoord.y));
	vec4 color = vec4(1, 1, 1, 1);
	if (numberOfSteps == 1)
		color = colors[0];
	else if (numberOfSteps > 1)
	{
		if (y <= heights[0])
			color = colors[0];
		else if (y >= heights[numberOfSteps - 1])
			color = colors[numberOfSteps - 1];
		else
		{
			for (int i = 1; i < numberOfSteps; ++i)
			{
				if (y == heights[i])
					color = colors[i];
				else if (y < heights[i])
				{
					color = a(y, heights[i - 1], heights[i], colors[i - 1], colors[i]);
					break;
				}
			}
		}
	}
	if (useTexture)
		color = color * texture2D(texture, gl_TexCoord[0].xy);
	gl_FragColor = color * gl_Color;	
}
