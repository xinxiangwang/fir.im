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
