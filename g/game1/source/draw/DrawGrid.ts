import { DrawSetting } from "./DrawComponents";

export default function drawGrid(d:DrawSetting):void {
    const ctx = d.canvas ;
    ctx.beginPath() ;
    const d9 = Math.min(d.screen.height-d.position.y,d.screen.width-d.position.x)/9;
    const fdx = d.position.x ;
    const fdy = d.position.y ;
    for(let x = 0 ; x <= 9 ; x ++){
        ctx.moveTo(fdx+d9*x,fdy);
        ctx.lineTo(fdx+d9*x,fdy+d.screen.width);
    }
    for(let y = 0 ; y <= 9 ; y ++){
        ctx.moveTo(fdy,fdy+d9*y);
        ctx.lineTo(fdy+d.screen.width,fdy+d9*y);
    }
}

