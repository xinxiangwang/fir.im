var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { throttle, pushCode, makeImFirEl, sleep } from './utils.js';
class Page {
    constructor() {
        this.state = 0;
        this.prevState = -1;
        this.isAnimation = true;
        this.pushCodeTimer = null;
        this.ImTimer = null;
        this.nav = document.querySelector('#nav');
        this.main = document.querySelector('main');
        this.loadingBox = document.querySelector('.loading');
        this.sectionOne = document.querySelector('.section-1');
        this.sectionTwo = document.querySelector('.section-2');
        this.ImFirElWrapper = document.querySelector('.imfir');
        this.changeView();
    }
    next() {
        if (this.isAnimation)
            return;
        this.prevState = this.state;
        if (this.state < 6) {
            this.state = this.state + 1;
        }
        else {
            this.state = 6;
        }
        if (this.prevState === this.state)
            return;
        this.changeView();
    }
    prev() {
        if (this.isAnimation)
            return;
        this.prevState = this.state;
        this.state = this.state - 1 < 1 ? 1 : this.state - 1;
        if (this.prevState === this.state)
            return;
        this.changeView();
    }
    setMainClass(wait = 0) {
        setTimeout(() => {
            if (this.main) {
                this.main.className = 'active-' + this.state;
            }
        }, wait);
    }
    showCode(wait) {
        const code = ["B", "e", "t", "a", "A", "p", "p", "H", "o", "s", "t", "<br/>",
            "{", "<br/>", "   ", "r", "e", "t", "u", "r", "n", " ", "\"", "f", "i", "r", ".", "i", "m", "\"", "<br/>", "}"];
        const dom = document.querySelector('.code > pre');
        if (dom) {
            setTimeout(() => {
                this.pushCodeTimer = pushCode(dom, code, 80);
            }, wait);
        }
    }
    clearCode() {
        const dom = document.querySelector('.code > pre');
        if (dom) {
            this.pushCodeTimer && clearInterval(this.pushCodeTimer);
            dom.innerHTML = '';
        }
    }
    changeView() {
        var _a, _b, _c, _d, _e, _f, _g;
        switch (this.state) {
            case 0:
                (_a = this.loadingBox) === null || _a === void 0 ? void 0 : _a.classList.add('spread');
                setTimeout(() => {
                    this.isAnimation = false;
                    this.next();
                }, 2600);
                break;
            case 1: // 第一页
                this.isAnimation = true;
                let wait = 0;
                // 2 => 1
                if (this.prevState === 2) {
                    (_b = this.sectionTwo) === null || _b === void 0 ? void 0 : _b.classList.remove('animate-in');
                    wait = 800; // 卡片翻转动画时长
                }
                // 0 => 1
                setTimeout(() => {
                    var _a, _b, _c;
                    this.setMainClass();
                    this.showCode(1000);
                    if (this.sectionTwo) {
                        this.sectionTwo.className = 'section-2';
                    }
                    if (!this.nav)
                        return;
                    this.nav.className = '';
                    if ((_a = this.loadingBox) === null || _a === void 0 ? void 0 : _a.classList.contains('spread')) {
                        (_b = this.loadingBox) === null || _b === void 0 ? void 0 : _b.classList.remove('spread');
                    }
                    (_c = this.sectionOne) === null || _c === void 0 ? void 0 : _c.classList.add('animate-in');
                    this.isAnimation = false;
                }, wait);
                break;
            case 2: // 第二页
                this.clearCode();
                this.isAnimation = true;
                if (this.prevState === 3) {
                    // 3 => 2
                    (_c = this.sectionTwo) === null || _c === void 0 ? void 0 : _c.classList.remove('toggle-page');
                    this.setMainClass();
                    this.isAnimation = false;
                }
                else {
                    // 1 => 2
                    (_d = this.sectionOne) === null || _d === void 0 ? void 0 : _d.classList.add('animate-out');
                    setTimeout(() => {
                        var _a, _b, _c, _d;
                        this.setMainClass();
                        (_a = this.sectionOne) === null || _a === void 0 ? void 0 : _a.classList.remove('animate-in');
                        (_b = this.sectionOne) === null || _b === void 0 ? void 0 : _b.classList.remove('animate-out');
                        (_c = this.nav) === null || _c === void 0 ? void 0 : _c.classList.add('white-color');
                        (_d = this.sectionTwo) === null || _d === void 0 ? void 0 : _d.classList.add('animate-in');
                        setTimeout(() => {
                            this.isAnimation = false;
                        }, 600);
                    }, 1000);
                }
                break;
            case 3: // 第二页
                this.isAnimation = true;
                this.setMainClass();
                if (this.prevState === 4) {
                    (_e = this.sectionTwo) === null || _e === void 0 ? void 0 : _e.classList.remove('animate-out-4');
                }
                (_f = this.sectionTwo) === null || _f === void 0 ? void 0 : _f.classList.add('toggle-page');
                setTimeout(() => {
                    this.isAnimation = false;
                }, 600);
                break;
            case 4: // 第三页
                this.isAnimation = true;
                if (this.prevState === 5) {
                    this.setMainClass();
                }
                else {
                    (_g = this.sectionTwo) === null || _g === void 0 ? void 0 : _g.classList.add('animate-out-4');
                    this.setMainClass(900);
                }
                setTimeout(() => {
                    this.isAnimation = false;
                }, 900);
                break;
            case 5: // 第四页
                this.setMainClass();
                if (this.ImFirElWrapper) {
                    this.ImFirElWrapper.innerHTML = '';
                }
                break;
            case 6: // 第五页
                this.setMainClass();
                const ImFirElWrapper = this.ImFirElWrapper;
                const cursor = document.querySelector('.cursor');
                const sleepTime = 200;
                if (ImFirElWrapper) {
                    const [imFirChildOne, imFirChildTwo] = makeImFirEl();
                    setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                        cursor === null || cursor === void 0 ? void 0 : cursor.classList.remove('finished');
                        for (let i = 0; i < imFirChildOne.length; i++) {
                            ImFirElWrapper.appendChild(imFirChildOne[i]);
                            yield sleep(sleepTime);
                        }
                        yield sleep(500);
                        for (let i = imFirChildOne.length; i > 0; i--) {
                            ImFirElWrapper.removeChild(ImFirElWrapper.childNodes[ImFirElWrapper.childNodes.length - 1]);
                            yield sleep(sleepTime);
                        }
                        for (let i = 0; i < imFirChildTwo.length; i++) {
                            ImFirElWrapper.appendChild(imFirChildTwo[i]);
                            yield sleep(sleepTime);
                        }
                        cursor === null || cursor === void 0 ? void 0 : cursor.classList.add('finished');
                    }), 300);
                }
                break;
            default:
        }
    }
}
let page;
(function () {
    page = new Page();
    // setTimeout(() => {
    // }, 2600) // 扩散总时间2.8s 不能等完全扩散完毕才显示第一页
})();
window.addEventListener('wheel', throttle(function (e) {
    pageState(e);
}, 700, true));
function pageState(e) {
    let isUp;
    if (e.deltaY < 0) {
        page.prev();
        isUp = true;
    }
    else {
        page.next();
        isUp = false;
    }
}
// 第四页动画
(function () {
    const brandWrapperEl = document.querySelectorAll('.brand-wrapper > div');
    const sectionFour = document.querySelector('.section-4');
    if (!brandWrapperEl || !sectionFour)
        return;
    sectionFour.classList.add('active-jumei');
    [...brandWrapperEl].forEach(brandItemEl => {
        brandItemEl.addEventListener('mouseenter', function (e) {
            sectionFour.classList.forEach(className => {
                if (className.startsWith('active')) {
                    sectionFour.classList.remove(className);
                }
            });
            sectionFour.classList.add('active-' + e.target.dataset.item);
        });
    });
})();
