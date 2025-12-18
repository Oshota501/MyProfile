import { DrawSetting } from "./DrawComponents";

export default function clear(d:DrawSetting):void{
    d.canvas.beginPath();
    d.canvas.clearRect(d.position.x,d.position.y,d.screen.width,d.screen.height) ;
}