import {
  SVG_COLOR, SVG_POINT_SIZE, SVG_POINT_CENTER,
  SVG_STROKE, SVG_STROKE_WIDTH, SVG_STRING, POINT_SIZE
} from './constant'
import { Coord } from './types'

export function drawSVGPoint() {
  // 创建一个 SVG 元素
  var svg = document.createElementNS(SVG_STRING, 'svg');
  svg.setAttribute('width', SVG_POINT_SIZE);
  svg.setAttribute('height', SVG_POINT_SIZE);
  // 创建一个圆元素
  var circle = document.createElementNS(SVG_STRING, 'circle');
  circle.setAttribute('cx', SVG_POINT_CENTER);  // 圆心的 x 坐标
  circle.setAttribute('cy', SVG_POINT_CENTER);  // 圆心的 y 坐标
  circle.setAttribute('r', POINT_SIZE);
  circle.setAttribute('fill', SVG_COLOR);
  // 将圆添加到 SVG 元素中
  svg.appendChild(circle);
  // 将 SVG 元素添加到 body 中
  document.body.appendChild(svg);

  return svg
}

export function drawSVGRect(width: number, height: number) {
  var svg = document.createElementNS(SVG_STRING, 'svg');
  svg.setAttribute('width', `${width}`);
  svg.setAttribute('height', `${height}`);

  // 创建一个矩形元素
  var rect = document.createElementNS(SVG_STRING, 'rect');
  rect.setAttribute('width', `${width}`);
  rect.setAttribute('height', `${height}`);
  rect.setAttribute('fill', SVG_COLOR);
  // 矩形透明
  rect.setAttribute('opacity', '0.1');
  // 虚线边框 5px 间隔 边框宽度 5px
  rect.setAttribute('stroke', SVG_STROKE);
  rect.setAttribute('stroke-width', SVG_STROKE_WIDTH);
  rect.setAttribute('stroke-dasharray', '5,5');
  // 将矩形添加到 SVG 元素中
  svg.appendChild(rect);
  // 将 SVG 元素添加到 body 中
  document.body.appendChild(svg);

  return svg
}

export function drawSVGCircle(r: number) {
  // 画出一个svg圆
  var svg = document.createElementNS(SVG_STRING, 'svg');
  const side = r * 2 + +SVG_STROKE_WIDTH * 2  // 边长
  const c = side / 2                          // 圆心位置
  svg.setAttribute('width', `${side}`);
  svg.setAttribute('height', `${side}`);
  // 创建一个圆元素
  var circle = document.createElementNS(SVG_STRING, 'circle');
  circle.setAttribute('cx', `${c}`);  // 圆心的 x 坐标
  circle.setAttribute('cy', `${c}`);  // 圆心的 y 坐标
  circle.setAttribute('r', `${r}`);
  circle.setAttribute('fill', SVG_COLOR);
  circle.setAttribute('stroke', SVG_STROKE);
  circle.setAttribute('stroke-width', SVG_STROKE_WIDTH);
  // 透明
  circle.setAttribute('opacity', '0.1');
  // 虚线边框
  circle.setAttribute('stroke-dasharray', '5,5');
  // 将圆添加到 SVG 元素中
  svg.appendChild(circle);
  // 将 SVG 元素添加到 body 中
  document.body.appendChild(svg);

  return svg
}

export function isofixPoint(svg: SVGSVGElement, coord: { left: number, top: number }) {
  // 将这个 SVG 元素定位到我鼠标的位置
  const left = coord.left - +SVG_POINT_CENTER
  const top = coord.top - +SVG_POINT_CENTER
  svg.setAttribute(
    'style',
    ` position: fixed; 
      left: ${left}px; 
      top: ${top}px;`
  )
}

export function isofixRect(svg: SVGSVGElement, coord: Coord) {
  const {left, top} = coord
  svg.setAttribute(
    'style',
    ` position: fixed; 
      left: ${left}px; 
      top: ${top}px;`
  )
}

export function isofixCircle(svg: SVGSVGElement, center: Coord, r: number) {
  const {left, top} = center
  svg.setAttribute(
    'style',
    ` position: fixed; 
      left: ${left - r}px; 
      top: ${top - r}px;`
  )
}
