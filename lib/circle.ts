import { Coord } from './types'
import { isofixPoint, drawSVGPoint, isofixCircle, drawSVGCircle } from './share'

export function useCircle() {
  let start = false

  let pointArray: Coord[] = []
  let dumiCircle: null | SVGSVGElement = null
  let dumiPoints: SVGSVGElement[] = []
  let finishCircle: null | SVGSVGElement = null

  function startCircle() {
    start = true
    document.addEventListener('click', onClick)
    document.addEventListener('mousemove', onMousemove)
  }

  function endCircle() {
    start = false
    document.removeEventListener('click', onClick)
  }

  function onClick(event: MouseEvent) {
    if(!start) return

    // 如果已经存在一个圆，就删除
    finishCircle && finishCircle.remove()
    dumiPoints.forEach(point => point.remove())

    const center = { left: event.clientX, top: event.clientY }
    if(pointArray.length === 1) {
      const r = Math.sqrt(
        Math.pow(pointArray[0].left - event.clientX, 2) +
        Math.pow(pointArray[0].top - event.clientY, 2)
      )
      finishCircle = drawSVGCircle(r)
      isofixCircle(finishCircle, pointArray[0], r)
      pointArray = []
      return
    }
    const svg = drawSVGPoint()
    isofixPoint(svg, center)
    pointArray.push(center)
    dumiPoints.push(svg)
  }

  function onMousemove(event: MouseEvent) {
    // 如果没有开始画圆，就不执行
    if(!start) return
    // 如果一个点都没有，就不执行
    if(pointArray.length === 0) return
    // 清掉之前的圆
    dumiCircle && dumiCircle.remove()
    // 开始画圆
    const r = Math.sqrt(
      Math.pow(pointArray[0].left - event.clientX, 2) +
      Math.pow(pointArray[0].top - event.clientY, 2)
    )
    dumiCircle = drawSVGCircle(r)
    isofixCircle(dumiCircle, pointArray[0], r)
  }

  return {
    startCircle,
    endCircle
  }
}
