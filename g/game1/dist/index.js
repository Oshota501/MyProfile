import { DrawSetting } from "./draw/DrawComponents";
import drawGrid from "./draw/DrawGrid";
export const c_screen = {
    width: 400,
    height: 400,
};
const elm = document.getElementById("cv");
export const context = (function () {
    const canv = document.createElement("canvas");
    canv.width = c_screen.width;
    canv.height = c_screen.height;
    canv.style = `
        border:1px solid;
    `;
    elm === null || elm === void 0 ? void 0 : elm.appendChild(canv);
    return canv.getContext("2d");
})();
const data = new DrawSetting(context, c_screen);
drawGrid(data);
//# sourceMappingURL=index.js.map