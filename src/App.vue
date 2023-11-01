<script setup lang='ts'>
import { useRect, useCircle, usePolygon } from '../lib'

const { startCircle, endCircle } = useCircle()
const { startRect, endRect } = useRect()
const { startPolygon, endPolygon } = usePolygon()

function draw(type: 'rect' | 'circle'| 'polygon', e: MouseEvent) {
  e.stopPropagation()
  endCircle()
  endRect()
  endPolygon()
  if (type === 'rect') startRect()
  if (type === 'circle') startCircle() 
  if (type === 'polygon') startPolygon()
}
startCircle()
</script>

<template>
  <div class="wrapper">
    <div class="btns">
      <button @click="e => draw('rect', e)">矩形</button>
      <button @click="e => draw('circle', e)">圆形</button>
      <button @click="e => draw('polygon', e)">点选</button>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  width: 100%;
  height: 100%;
}
.btns {
  position: absolute;
  z-index: 10000;
}
</style>
