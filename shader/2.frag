precision mediump float;
uniform vec2  m;       // mouse
uniform float t;       // time
uniform vec2  r;       // resolution
uniform sampler2D smp; // prev scene

float pi = 3.14159265 ;
float size = 1.0 ;
float speed = 20.0 ;

float nsin(float phase){
	return (sin(phase) + 1.0 )/2.0 ;
}
float ncos(float phase){
	return (cos(phase) + 1.0 )/2.0 ;
}

void main(void){
	vec2 p = ((gl_FragCoord.xy /r) - 0.5) * 2.0 ;
	vec2 mp = p - m ;
	float f = 0.5 / length(p - m);
	float ml = length(p - m) ;
	float l = length(p) ;
	
	vec4 color = vec4(
		nsin(t*speed - ml * 30.0)*ncos(atan(mp.y/mp.x)*4.0 + t*20.0) * (2.3-f),
		nsin(t*speed*1.15 - ml * 30.0)*nsin(atan(mp.y/mp.x)*4.0 + t*20.0 * (2.3-f)),
		nsin(t*speed*1.5 - ml * 30.0)*nsin(atan(mp.y/mp.x)*4.0 + t*20.0 + pi) * (2.3-f),
		1.0
	);
	
	color = color + vec4(
		abs(sin(mod(p.x*20.0,pi*2.0) + t*speed)),
		ncos(mod(p.x*20.0,pi*2.0)+pi + t*speed),
		nsin(mod(p.x*20.0,pi*2.0)+pi + t*speed),
		1.0
	) / 2.0;
	
	color = color + vec4(
		nsin(mod(p.y*20.0,pi*2.0) + t*speed),
		ncos(mod(p.y*20.0,pi*2.0)+pi + t*speed),
		nsin(mod(p.y*20.0,pi*2.0)+pi + t*speed),
		1.0
	) / 2.0;
	
	gl_FragColor = color * f;
	
}
