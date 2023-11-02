import { Coord } from './types'
import { isofixPoint, drawSVGPoint, drawSVGPolygon, rafDebounce } from './share'

export function usePolygon() {
  let start = false

  let pointArray: Coord[] = []
  let dumiPolygon: null | SVGSVGElement = null
  let dumiPoints: SVGSVGElement[] = []
  let finishPolygon: null | SVGSVGElement = null

  function startPolygon() {
    start = true
    document.addEventListener('click', onClick)
    document.addEventListener('mousemove', onMousemove)
    document.addEventListener('contextmenu', onContextMenu)
  }

  function endPolygon() {
    start = false
    document.removeEventListener('click', onClick)
    document.removeEventListener('mousemove', onMousemove)
    document.removeEventListener('contextmenu', onContextMenu)
  }

  function onClick(event: MouseEvent) {
    if (!start) return
    const center = { left: event.clientX, top: event.clientY }
    // 如果已经存在一个多边形，就删除
    dumiPolygon && dumiPolygon.remove()
    finishPolygon && finishPolygon.remove()
    // 绘制多边形
    const svg = drawSVGPoint()
    addEventListeners(svg)
    isofixPoint(svg, center)
    dumiPoints.push(svg)
    pointArray.push(center)
    dumiPolygon = drawSVGPolygon(pointArray)
  }

  function onMousemove(event: MouseEvent) {
    const current = { left: event.clientX, top: event.clientY }
    if (!start) return

    const taskQueue:any[] = []
    const task = () => {
      dumiPolygon && dumiPolygon.remove()
      dumiPolygon = drawSVGPolygon([...pointArray, current])
    }
    rafDebounce(task, taskQueue)
  }

  function onContextMenu(event: MouseEvent) {
    if(!start) return
    event.preventDefault()

    /* 右键表示绘制结束，全部变量清零处理 */
    dumiPoints.forEach(point => point.remove())
    dumiPoints = []
    dumiPolygon && dumiPolygon.remove()
    dumiPolygon = null
    pointArray= []

    endPolygon()
  }

  function addEventListeners(svg: SVGSVGElement) {
    svg.addEventListener('dblclick', () => {
      /* 赋值给最终结果 */ 
      finishPolygon = drawSVGPolygon(pointArray)
      /* 其余的全部清空 */
      dumiPoints.forEach(point => point.remove())
      dumiPoints = []
      dumiPolygon && dumiPolygon.remove()
      dumiPolygon = null
      pointArray = []
    })
  }
  return {
    startPolygon,
    endPolygon
  }
}
