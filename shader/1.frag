precision mediump float;
uniform vec2  m;       // mouse
uniform float t;       // time
uniform vec2  r;       // resolution
uniform sampler2D smp; // prev scene

float pi = 3.1415926 ;

void main(void){
	vec2 p = gl_FragCoord.xy /r;
	gl_FragColor = vec4(
		abs(sin(p.x + asin(p.x/p.y) + t )) ,
		abs(cos(p.x + asin(p.y/p.x) + t )) ,
		abs(sin(p.x + atan(p.x/p.y) + t + pi)) ,
		1.0 
	);
}