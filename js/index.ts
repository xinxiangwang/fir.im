import { throttle } from './utils.js'

class Page {
  constructor() {
    this.state = 0
    this.lastState = -1
    this.nav = document.querySelector('#nav')
    this.main = document.querySelector('main')
    this.loadingBox = document.querySelector('.loading')
    this.sectionOne = document.querySelector('.section-1')
    this.sectionTwo = document.querySelector('.section-2')
    this.changeView()
  }
  private state: number
  private lastState: number

  private nav: Element | null
  private loadingBox: Element | null
  private sectionOne: Element | null
  private sectionTwo: Element | null
  private main: Element | null

  public next() {
    this.lastState = this.state
    this.state = this.state + 1
    this.changeView()
  }

  public prev() {
    this.lastState = this.state
    this.state = this.state - 1 < 1 ? 1 : this.state - 1
    this.changeView()
  }


  private setMainClass(wait: number = 0) {
    setTimeout(() => {
      if (this.main) {
        this.main.className = 'active-' + this.state
      }
    }, wait)
  }

  private changeView() {
    switch (this.state) {
      case 0:
        this.loadingBox?.classList.add('spread')
        break
      case 1: // 第一页
        let wait = 0
        // 2 => 1
        if (this.lastState === 2) {
          this.sectionTwo?.classList.remove('animate-in')
          wait = 800 // 卡片翻转动画时长
        }

        // 0 => 1
        setTimeout(() => {
          this.setMainClass()
          if (this.sectionTwo) {
            this.sectionTwo.className = 'section-2'
          }
          if (!this.nav) return
          this.nav.className = ''

          if (this.loadingBox?.classList.contains('spread')) {
            this.loadingBox?.classList.remove('spread')
          }
          this.sectionOne?.classList.add('animate-in')
        }, wait)

        break
      case 2: // 第二页
        // 3 => 2
        this.sectionTwo?.classList.remove('toggle-page')

        // 1 => 2
        this.sectionOne?.classList.add('animate-out')
        setTimeout(() => { // 等飞机飞走
          this.setMainClass()
          this.sectionOne?.classList.remove('animate-in')
          this.sectionOne?.classList.remove('animate-out')
          this.nav?.classList.add('white-color')
          this.sectionTwo?.classList.add('animate-in')
        }, 1000)
        break
      case 3: // 第二页
        this.setMainClass()
        if (this.lastState === 4) {
          this.sectionTwo?.classList.remove('animate-out-4')
        }
        this.sectionTwo?.classList.add('toggle-page')
        break
      case 4: // 第三页
        if (this.lastState === 5) {
          this.setMainClass()
        } else {
          this.sectionTwo?.classList.add('animate-out-4')
          this.setMainClass(900)
        }
        break;
      case 5: // 第四页
        this.setMainClass()
        break;
      case 6: // 第五页
        this.setMainClass()
        break;
      default:
    }
  }
}

let page: Page

(function () {
  page = new Page()
  setTimeout(() => {
    page.next()
  }, 2600) // 扩散总时间2.8s 不能等完全扩散完毕才显示第一页
})();

window.addEventListener('wheel', throttle(function (e: WheelEvent) {
  pageState(e)
}, 500, true))

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

// function loading() {
//   const loadingEl = document.querySelector('.loading')
//   if (!loadingEl) return
//   loadingEl.className = 'loading spread'
// }

// setTimeout(() => {
//   loading()
// }, 3000)

