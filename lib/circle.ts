import { Coord } from './types'
import { 
  isofixPoint, drawSVGPoint, 
  isofixCircle, drawSVGCircle, rafDebounce 
} from './share'

export function useCircle() {
  let start = false

  let dumiPoints: SVGSVGElement[] = []            // 用于存储圆心的 SVG 元素
  let dumiCircle: null | SVGSVGElement = null     // 用于存储圆的 SVG 元素 临时存储动态绘制
  let c: Coord | null = null                      // 用于存储圆心
  let finishCircle: null | SVGSVGElement = null   // 用于存储圆的 SVG 元素

  function startCircle() {
    start = true
    document.addEventListener('click', onClick)
    document.addEventListener('mousemove', onMousemove)
    document.addEventListener('contextmenu', onContextMenu)
  }

  function endCircle() {
    start = false
    document.removeEventListener('click', onClick)
    document.removeEventListener('mousemove', onMousemove)
    document.removeEventListener('contextmenu', onContextMenu)
  }

  function onClick(event: MouseEvent) {
    if (!start) return

    /* 如果存在已经画好的圆 再次点击别的地方的时候就要删掉 保证页面直邮一个圆 */
    finishCircle && finishCircle.remove()
    /* 临时存储的圆心也删掉 */
    dumiPoints.forEach(point => point.remove())

    /* 圆心存在的时候 要进行画圆 */
    if (c) {
      const r = Math.sqrt(
        Math.pow(c.left - event.clientX, 2) +
        Math.pow(c.top - event.clientY, 2)
      )
      // 画圆并且定位
      finishCircle = drawSVGCircle(r)
      isofixCircle(finishCircle, c, r)
      // 画完之后删掉存储圆心的点坐标
      c = null
      return
    }
    // 没有圆心的时候就存储圆心
    const center = { left: event.clientX, top: event.clientY }
    const svg = drawSVGPoint()
    isofixPoint(svg, center)
    c = center
    dumiPoints.push(svg)
  }

  function onMousemove(event: MouseEvent) {
    if (!start) return
    if (!c) return

    const taskQueue: any[] = []
    const task = () => {
      // 如果存在临时存储的圆 就删掉 要重新动态绘制
      dumiCircle && dumiCircle.remove()
      const r = Math.sqrt(
        Math.pow(c!.left - event.clientX, 2) +
        Math.pow(c!.top - event.clientY, 2)
      )
      dumiCircle = drawSVGCircle(r)
      isofixCircle(dumiCircle, c!, r)
    }
    rafDebounce(task, taskQueue)
  }

  function onContextMenu(event: MouseEvent) {
    if (!start) return
    event.preventDefault()

    /* 右键表示绘制结束，全部变量清零处理 */
    dumiPoints.forEach(point => point.remove())
    dumiPoints = []
    dumiCircle && dumiCircle.remove()
    dumiCircle = null
    c = null
    
    endCircle()
  }

  return {
    startCircle,
    endCircle
  }
}
