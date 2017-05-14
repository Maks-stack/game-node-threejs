/* eslint-disable no-use-before-define*/
/* eslint-disable no-param-reassign*/

import colors from "./colors"

export default function Sketch(c) {
  const width = 512
  const height = 512
  c.setup = () => {
    c.createCanvas(width, height)
    c.background(colors.background)
  }

  const numCols = 11
  const numLin = 11

  const rectSize = 30

  const objects = createGrid(numCols, numLin, rectSize, rectSize, c.random)

  c.draw = () => {
    c.background(colors.background)
    let index = 0
    c.noFill()
    c.strokeWeight(1)
    c.rectMode(c.CENTER)
    for (let i = 0; i < numCols; i++) {
      for (let j = 0; j < numLin; j++) {
        c.push()
        c.stroke(objects[index].color)
        const offX = objects[index].w * i
        const offY = objects[index].h * j
        c.translate(offX, offY)
        c.rotate(c.PI / 3.0 * c.frameCount / 80)
        c.rect(
          0,
          0,
          objects[index].w,
          objects[index].h)
        index ++
        c.pop()
      }
    }
  }
}

function createGrid(numCol, numLines, width, height, random) {
  const objects = []

  const center = 512 / 2
  const colWidth = width + 15
  const colHeight = height + 15

  let index = 0

  for (let i = 0; i < numCol; i++) {
    for (let j = 0; j < numCol; j++) {
      index ++
      objects.push({
        x: center - colWidth * 10 / 2 + colWidth * i,
        y: center - colHeight * 10 / 2 + colHeight * j,
        w: width,
        h: height,
        color: colors.palette[Math.round(random(0, 4))],
        rotation: 360 / index })
    }
  }
  return objects
}
