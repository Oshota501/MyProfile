precision mediump float;
uniform vec2  m;       // mouse
uniform float t;       // time
uniform vec2  r;       // resolution
uniform sampler2D smp; // prev scene

float scale = 10.0 ;
float radial_scale = 30.0 ;
float rotation_speed = 12.0 ;

float pi = 3.141592 ;

float clean (float num) {
	if(num >= 0.9){
		return 1.0 ;
	}
	return 0.0 ;
}
void main(void){
	vec2 p = gl_FragCoord.xy / r -0.5;
	float l = length (p) ;
	vec4 color = vec4(1.0,1.0,1.0,1.0) ;
	float ph = atan(p.y/p.x) ;
	if(mod(l*cos(l*pi+pi/2.0)+t/rotation_speed,0.05)>0.025){
		color.b = clean((sin(ph*radial_scale+t*rotation_speed)+1.0)/2.0) ;
		color.r = clean((sin(ph*radial_scale+t*rotation_speed)+1.0)/2.0) ;
	}else{
		color.r = clean((sin(ph*radial_scale+t*rotation_speed)+1.0)/2.0) ;
		color.g = clean((sin(ph*radial_scale+t*rotation_speed)+1.0)/2.0) ;
	}
	gl_FragColor = color ;
}

