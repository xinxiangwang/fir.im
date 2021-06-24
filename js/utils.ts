export function throttle(fn: any, wait: number, immediate: boolean = false): () => void {
  let timer: number | null, context: any, args: any
  let later = () => setTimeout(() => {
    timer = null
    if (!immediate) {
      fn.apply(context, args)
    }
  }, wait)
  return function(this: any, ...params) {
    if (!timer) {
      if (immediate) {
        fn.apply(this, params)
        timer = later()
      } else {
        timer = later()
      }
    } else {
      context = this
      args = params
    }
  }
}

export function pushCode(dom: Element, code: Array<string>, speedTime: number):number {
  let i = 0
  let timer = setInterval(() => {
    dom.innerHTML += code[i++]
    if (i === code.length) {
      clearInterval(timer)
    }
  }, speedTime)
  return timer
}