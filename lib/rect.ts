import { drawSVGPoint, drawSVGRect, isofixPoint, isofixRect } from './share'
import { Coord } from './types'

export function useRect() {
  let start = false

  let pointArray: Coord[] = []
  let dumiRect:null | SVGSVGElement = null
  let dumiPoints: SVGSVGElement[] = []
  let finishRect:null | SVGSVGElement = null

  function startRect() {
    start = true
    document.addEventListener('click', onClick)
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('contextmenu', onContextMenu)
  }

  function endRect() {
    start = false
    document.removeEventListener('click', onClick)
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('contextmenu', onContextMenu)
  }

  function onClick(event: MouseEvent) {
    if(!start) return
    // 如果存在已经画好的矩形，就删除
    finishRect && finishRect.remove()
    // 如果存在已经画好的点，就删除
    dumiPoints.forEach(point => point.remove())

    const coord = {left: event.clientX, top: event.clientY}
    const svg = drawSVGPoint()
    isofixPoint(svg, coord)
    
    pointArray.push(coord)
    dumiPoints.push(svg)

    // 画出矩形只需要两个点
    if(pointArray.length === 2) {
      finishRect = drawRect(pointArray, true)
      pointArray = []
    }
  }

  function onMouseMove(event: MouseEvent) {
    if(!start) return 
    if(pointArray.length === 0) return
    dumiRect && dumiRect.remove()
    const coord = {left: event.clientX, top: event.clientY}
    dumiRect = drawRect([pointArray[0], coord])
  }

  function onContextMenu(event: MouseEvent) {
    if(!start) return
    event.preventDefault()
    dumiRect && dumiRect.remove()
    endRect()
  }
  
  function drawRect(pointArray: Array<Coord>, isofixPoints = false) {
    // 根据两个点算出矩形的左上角和右下角的坐标
    const [point1, point2] = pointArray
    const width = Math.abs(point2.left - point1.left)
    const height = Math.abs(point2.top - point1.top)
    const startX = Math.min(point1.left, point2.left)
    const startY = Math.min(point1.top, point2.top)

    // 创建一个 SVG 元素 把这个矩形画上去
    const svg = drawSVGRect(width, height)
    isofixRect(svg, {left: startX, top: startY})

    // 画出四个角的点
    if(isofixPoints) {
      const leftTop = drawSVGPoint()
      const rightTop = drawSVGPoint()
      const leftBottom = drawSVGPoint()
      const rightBottom = drawSVGPoint()
      isofixPoint(rightTop, {left: startX + width, top: startY})
      isofixPoint(leftBottom, {left: startX, top: startY + height})
      isofixPoint(leftTop, {left: startX, top: startY})
      isofixPoint(rightBottom, {left: startX + width, top: startY + height})

      // 将 SVG 元素添加到数组中
      dumiPoints.push(rightTop, leftBottom, leftTop, rightBottom)
    }

    return svg
  }

  return {
    startRect,
    endRect
  }
}
