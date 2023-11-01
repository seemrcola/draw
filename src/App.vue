<script setup lang='ts'>
import { useRect, useCircle } from '../lib'

const { startCircle, endCircle } = useCircle()
const { startRect, endRect } = useRect()

function draw(type: 'rect' | 'circle', e: MouseEvent) {
  e.stopPropagation()
  endCircle()
  endRect()
  if (type === 'rect') startRect()
  if (type === 'circle') startCircle() 
}
startCircle()
</script>

<template>
  <div class="wrapper">
    <div class="btns">
      <button @click="e => draw('rect', e)">矩形</button>
      <button @click="e => draw('circle', e)">圆形</button>
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
