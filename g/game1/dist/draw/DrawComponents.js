export class DrawSetting {
    constructor(canv, screen) {
        this.position = new Transform(0, 0);
        this.canvas = canv;
        this.screen = screen;
    }
}
export class Transform {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
//# sourceMappingURL=DrawComponents.js.map