import { 
  drawSVGPoint, drawSVGRect, 
  isofixPoint, isofixRect, rafDebounce 
} from './share'
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
      finishRect = drawRect(pointArray, false)
      pointArray = []
    }
  }

  function onMouseMove(event: MouseEvent) {
    if(!start) return 
    if(pointArray.length === 0) return
    const taskQueue:any[] = []
    const task = () => {
      dumiRect && dumiRect.remove()
      const coord = {left: event.clientX, top: event.clientY}
      dumiRect = drawRect([pointArray[0], coord])
    }
    rafDebounce(task, taskQueue)
  }

  function onContextMenu(event: MouseEvent) {
    if(!start) return
    event.preventDefault()

    /* 右键表示绘制结束，全部变量清零处理 */
    dumiRect && dumiRect.remove()
    dumiRect = null
    pointArray = []
    dumiPoints.forEach(point => point.remove())
    dumiPoints = []

    endRect()
  }
  
  function drawRect(pointArray: Array<Coord>, isofixPoints = true) {
    // 根据两个点算出矩形的左上角和右下角的坐标
    const [point1, point2] = pointArray
    const width = Math.abs(point2.left - point1.left)
    const height = Math.abs(point2.top - point1.top)
    const startX = Math.min(point1.left, point2.left)
    const startY = Math.min(point1.top, point2.top)

    // 创建一个 SVG 元素 把这个矩形画上去
    const svg = drawSVGRect(width, height)
    isofixRect(svg, {left: startX, top: startY})

    // 清空点（当绘制结束的时候）
    if(!isofixPoints) 
      dumiPoints.forEach(point => point.remove())

    return svg
  }

  return {
    startRect,
    endRect
  }
}
