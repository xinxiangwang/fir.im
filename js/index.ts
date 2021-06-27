import { throttle, pushCode, makeImFirEl, sleep } from './utils.js'

class Page {
  constructor() {
    this.state = 0
    this.prevState = -1
    this.isAnimation = true
    this.pushCodeTimer = null
    this.ImTimer = null
    this.nav = document.querySelector('#nav')
    this.main = document.querySelector('main')
    this.loadingBox = document.querySelector('.loading')
    this.sectionOne = document.querySelector('.section-1')
    this.sectionTwo = document.querySelector('.section-2')
    this.ImFirElWrapper = document.querySelector('.imfir')
    this.changeView()
  }
  private isAnimation: boolean // 是否在执行动画，执行期间禁止触发翻页

  private state: number // 当前状态
  private prevState: number // 上一次的状态

  private nav: Element | null // 导航条
  private loadingBox: Element | null // 初始加载动画
  private sectionOne: Element | null
  private sectionTwo: Element | null
  private ImFirElWrapper: Element | null
  private main: Element | null

  private pushCodeTimer: number | null
  private ImTimer: number | null

  public next() {
    if (this.isAnimation) return
    this.prevState = this.state
    if (this.state < 6) {
      this.state = this.state + 1
    } else {
      this.state = 6
    }
    if (this.prevState === this.state) return
    this.changeView()
  }

  public prev() {
    if (this.isAnimation) return
    this.prevState = this.state
    this.state = this.state - 1 < 1 ? 1 : this.state - 1
    if (this.prevState === this.state) return
    this.changeView()
  }


  private setMainClass(wait: number = 0) {
    setTimeout(() => {
      if (this.main) {
        this.main.className = 'active-' + this.state
      }
    }, wait)
  }

  private showCode(wait: number) { // 光标跳动 wait s后开始显示代码
    const code = ["B", "e", "t", "a", "A", "p", "p", "H", "o", "s", "t", "<br/>",
      "{", "<br/>", "   ", "r", "e", "t", "u", "r", "n", " ", "\"", "f", "i", "r", ".", "i", "m", "\"", "<br/>", "}"]
    const dom = document.querySelector('.code > pre')
    if (dom) {
      setTimeout(() => {
        this.pushCodeTimer = pushCode(dom, code, 80)
      }, wait)
    }
  }

  private clearCode() {
    const dom = document.querySelector('.code > pre')
    if (dom) {
      this.pushCodeTimer && clearInterval(this.pushCodeTimer)
      dom.innerHTML = ''
    }
  }

  private changeView() {
    switch (this.state) {
      case 0:
        this.loadingBox?.classList.add('spread')
        setTimeout(() => {
          this.isAnimation = false
          this.next()
        }, 2600)
        break
      case 1: // 第一页
        this.isAnimation = true
        let wait = 0
        // 2 => 1
        if (this.prevState === 2) {
          this.sectionTwo?.classList.remove('animate-in')
          wait = 800 // 卡片翻转动画时长
        }

        // 0 => 1
        setTimeout(() => {
          this.setMainClass()
          this.showCode(1000)
          if (this.sectionTwo) {
            this.sectionTwo.className = 'section-2'
          }
          if (!this.nav) return
          this.nav.className = ''

          if (this.loadingBox?.classList.contains('spread')) {
            this.loadingBox?.classList.remove('spread')
          }
          this.sectionOne?.classList.add('animate-in')
          this.isAnimation = false
        }, wait)

        break
      case 2: // 第二页
        this.clearCode()
        this.isAnimation = true
        if (this.prevState === 3) {
          // 3 => 2
          this.sectionTwo?.classList.remove('toggle-page')
          this.setMainClass()
          this.isAnimation = false
        } else {
          // 1 => 2
          this.sectionOne?.classList.add('animate-out')
          setTimeout(() => { // 等飞机飞走
            this.setMainClass()
            this.sectionOne?.classList.remove('animate-in')
            this.sectionOne?.classList.remove('animate-out')
            this.nav?.classList.add('white-color')
            this.sectionTwo?.classList.add('animate-in')
            setTimeout(() => { // 等卡片翻转完毕
              this.isAnimation = false
            }, 600)
          }, 1000)
        }



        break
      case 3: // 第二页
        this.isAnimation = true
        this.setMainClass()
        if (this.prevState === 4) {
          this.sectionTwo?.classList.remove('animate-out-4')
        }
        this.sectionTwo?.classList.add('toggle-page')
        setTimeout(() => {
          this.isAnimation = false
        }, 600)
        break
      case 4: // 第三页
        this.isAnimation = true
        if (this.prevState === 5) {
          this.setMainClass()
        } else {
          this.sectionTwo?.classList.add('animate-out-4')
          this.setMainClass(900)
        }
        setTimeout(() => {
          this.isAnimation = false
        }, 900)
        break;
      case 5: // 第四页
        this.setMainClass()
        if (this.ImFirElWrapper) {
          this.ImFirElWrapper.innerHTML = ''
        }
        break;
      case 6: // 第五页
        this.setMainClass()
        const ImFirElWrapper = this.ImFirElWrapper
        const cursor = document.querySelector('.cursor')
        const sleepTime = 200
        if (ImFirElWrapper) {
          const [imFirChildOne, imFirChildTwo] = makeImFirEl();
          setTimeout(async () => {
            cursor?.classList.remove('finished')
            for (let i = 0; i < imFirChildOne.length; i++) {
              ImFirElWrapper.appendChild(imFirChildOne[i])
              await sleep(sleepTime)
            }
            await sleep(500)
            for (let i = imFirChildOne.length; i > 0; i--) {
              ImFirElWrapper.removeChild(ImFirElWrapper.childNodes[ImFirElWrapper.childNodes.length - 1])
              await sleep(sleepTime)
            }
            for (let i = 0; i < imFirChildTwo.length; i++) {
              ImFirElWrapper.appendChild(imFirChildTwo[i])
              await sleep(sleepTime)
            }
            cursor?.classList.add('finished')
          }, 300)
        }
        break;
      default:
    }
  }
}

let page: Page

(function () {
  page = new Page()
  // setTimeout(() => {

  // }, 2600) // 扩散总时间2.8s 不能等完全扩散完毕才显示第一页
})();

window.addEventListener('wheel', throttle(function (e: WheelEvent) {
  pageState(e)
}, 700, true))

function pageState(e: WheelEvent) {
  let isUp: boolean
  if (e.deltaY < 0) {
    page.prev()
    isUp = true
  } else {
    page.next()
    isUp = false
  }
}

interface ExtraEvent extends EventTarget {
  dataset: BrandItemDataSet
}

interface BrandItemDataSet {
  item: string
}

// 第四页动画
(function () {
  const brandWrapperEl = document.querySelectorAll('.brand-wrapper > div')
  const sectionFour = document.querySelector('.section-4')
  if (!brandWrapperEl || !sectionFour) return
  sectionFour.classList.add('active-jumei');
  [...brandWrapperEl].forEach(brandItemEl => {
    brandItemEl.addEventListener('mouseenter', function (e: Event) {

      sectionFour.classList.forEach(className => {
        if (className.startsWith('active')) {
          sectionFour.classList.remove(className)
        }
      })
      sectionFour.classList.add('active-' + (e.target as ExtraEvent).dataset.item)
    })
  })
})();


