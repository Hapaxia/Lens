#version 120

// by Hapaxia (https://github.com/Hapaxia)

uniform sampler2D texture;

uniform bool useTexture = true;
uniform float gamma = 1.0;
uniform float desaturation = 0.0;
uniform float inversion = 0.0;
uniform float contrast = 0.0;
uniform float brightness = 0.0;

vec3 clampColor(vec3 color)
{
	return vec3(clamp(color.r, 0, 1), clamp(color.g, 0, 1), clamp(color.b, 0, 1));
}

vec3 gammaAdjustment(vec3 origColor)
{
	return pow(origColor, vec3(1.0 / gamma));
}

vec3 desaturationAdjustment(vec3 origColor)
{
	float relativeLuminance = 0.2126 * origColor.r + 0.7152 * origColor.g + 0.0722 * origColor.b;
	return mix(origColor, vec3(relativeLuminance), clamp(desaturation, 0, 1));
}

vec3 inversionAdjustment(vec3 origColor)
{
	vec3 invertedColor = vec3(1.0) - origColor;
	return mix(origColor, invertedColor, clamp(inversion, 0, 1));
}

vec3 colorizeAdjustment(vec3 origColor)
{
	return origColor * gl_Color.rgb;
}

vec3 contrastAdjustment(vec3 origColor)
{
	float factor = ((contrast + 1) / (1 - contrast));
	return clampColor((origColor - vec3(0.5)) * factor + 0.5);
}

vec3 brightnessAdjustment(vec3 origColor)
{
	return clampColor(origColor + vec3(brightness));
}

vec4 colorAdjustment(sampler2D tex, vec2 uv)
{
	float alpha;
	vec3 color;
	if (useTexture)
	{
		alpha = texture2D(tex, uv).a * gl_Color.a;
		color = vec3(texture2D(tex, uv).rgb);
		color = gammaAdjustment(color);
		color = desaturationAdjustment(color);
		color = inversionAdjustment(color);
		color = colorizeAdjustment(color);
	}
	else
	{
		alpha = gl_Color.a;
		color = gl_Color.rgb;
		color = gammaAdjustment(color);
		color = desaturationAdjustment(color);
		color = inversionAdjustment(color);
	}
	color = contrastAdjustment(color);
	color = brightnessAdjustment(color);
	return vec4(color, alpha);
}
 
void main (void)
{
	vec2 uv = gl_TexCoord[0].st;
	gl_FragColor = colorAdjustment(texture, uv);
}
