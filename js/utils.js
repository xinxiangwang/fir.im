export function throttle(fn, wait, immediate = false) {
    let timer, context, args;
    let later = () => setTimeout(() => {
        timer = null;
        if (!immediate) {
            fn.apply(context, args);
        }
    }, wait);
    return function (...params) {
        if (!timer) {
            if (immediate) {
                fn.apply(this, params);
                timer = later();
            }
            else {
                timer = later();
            }
        }
        else {
            context = this;
            args = params;
        }
    };
}
export function pushCode(dom, code, speedTime) {
    let i = 0;
    let timer = setInterval(() => {
        dom.innerHTML += code[i++];
        if (i === code.length) {
            clearInterval(timer);
        }
    }, speedTime);
    return timer;
}
export function makeImFirEl() {
    const classArrOne = ['icon-i', 'icon-comma', 'icon-m', 'icon-f i-behind', 'icon-i', 'icon-r'];
    const classArrTwo = ['icon-f', 'icon-i', 'icon-r', 'icon-comma trans', 'icon-i i-behind', 'icon-m'];
    const classNameToEle = (classArr, tagName) => {
        return classArr.map(className => {
            const ele = document.createElement(tagName);
            ele.className = className;
            return ele;
        });
    };
    const ImFirELOne = classNameToEle(classArrOne, 'i');
    const ImFirELTwo = classNameToEle(classArrTwo, 'i');
    return [ImFirELOne, ImFirELTwo];
}
export function sleep(time) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
}
