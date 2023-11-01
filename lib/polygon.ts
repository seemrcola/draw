import { Coord } from './types'
import { isofixPoint, drawSVGPoint, drawSVGPolygon } from './share'

export function usePolygon() {
  let start = false

  let pointArray: Coord[] = []
  let dumiPolygon: null | SVGSVGElement = null
  let dumiPoints: SVGSVGElement[] = []

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
    // 绘制多边形
    const svg = drawSVGPoint()
    isofixPoint(svg, center)
    dumiPoints.push(svg)
    pointArray.push(center)
    dumiPolygon = drawSVGPolygon(pointArray)
  }

  function onMousemove(event: MouseEvent) {
    const current = { left: event.clientX, top: event.clientY }
    if (!start) return
    if (pointArray.length === 0) return
    // 如果已经存在一个多边形，就删除
    dumiPolygon && dumiPolygon.remove()
    // 绘制多边形
    dumiPolygon = drawSVGPolygon([...pointArray, current])
  }

  function onContextMenu(event: MouseEvent) {
    start = false
    event.preventDefault()
    dumiPoints.forEach(point => point.remove())
    endPolygon()
  }

  return {
    startPolygon,
    endPolygon
  }
}
