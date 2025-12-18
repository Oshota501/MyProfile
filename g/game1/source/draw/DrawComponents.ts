export type size = {
    width : number ;
    height : number ;
}
export class DrawSetting {
    public position : Transform = new Transform(0,0) ;
    public canvas : CanvasRenderingContext2D ;
    public screen : size
    constructor(canv:CanvasRenderingContext2D,screen:size){
        this.canvas = canv ;
        this.screen = screen ;
    }
}
export class Transform {
    public x : number ;
    public y : number ;
    constructor(x:number,y:number){
        this.x = x ;
        this.y = y ;
    }
}