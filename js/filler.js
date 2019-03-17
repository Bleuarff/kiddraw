'use strict'



class Fill{
  constructor(data, width, height){
    this.data = data
    this.width = width
    this.height = height
  }

  fill(x, y, hexTargetColor){
    this.x = x
    this.y = y

    const pos = (y * this.width + x) * 4
    // console.log("pos: " + pos)

    this.srcColor = this.getPixelColor(pos)
    this.targetColor = Color.fromHex(hexTargetColor)

    // initialize queue of pixels to process
    this.pxQueue = new Queue(this.width * this.height)
    this.pxQueue.push(pos)

    const start = Date.now()
    let iters = 0

    do{
      iters += this._processQueue()
      const duration = Date.now() - this.pxQueue.lastInsert
      // if (duration > 100)
      //   console.log(`SLOW ${duration}ms`)
    }
    // while (iters < this.width * this.height)
    while(Date.now() - this.pxQueue.lastInsert < 500)

    const duration = Date.now() - start
    console.log(`fill: ${duration}ms / ${iters} iterations`)
    console.log(this.pxQueue.stats)
    return this.data
  }

  _processQueue(){
    if (this.pxQueue.length === 0)
      return 0

    const pxCoord = this.pxQueue.shift()

    if (typeof pxCoord === 'undefined')
      return 0

    const pxColor = this.getPixelColor(pxCoord)

    if (pxColor.equals(this.srcColor)){
      this.setPixelColor(pxCoord, this.targetColor)
      this.addNeighbors(pxCoord)
    }
    return 1
  }

  // adds neighbor pixels to the queue
  addNeighbors(coord){
    const top = coord - this.width * 4
    const bottom = coord + this.width * 4
    const left = coord - 4
    const right = coord + 4
    const topLeft = top - 4
    const topRight = top + 4
    const bottomLeft = bottom - 4
    const bottomRight = bottom + 4

    const topLim = 0,
          bottomLim = this.data.length,
          leftLim = this.y * this.width * 4,
          rightLim = (this.y + 1) * this.width * 4

    if (top > topLim)
      this.pxQueue.push(top)

    if (bottom < bottomLim)
      this.pxQueue.push(bottom)

    if (left >=  leftLim)
      this.pxQueue.push(left)

    if (right < rightLim)
      this.pxQueue.push(right)

    if (topLeft > topLim && topLeft >= leftLim)
      this.pxQueue.push(topLeft)

    if (topRight > topLim && topRight < rightLim)
      this.pxQueue.push(topRight)

    if (bottomLeft < bottomLim && bottomLeft >= leftLim)
      this.pxQueue.push(bottomLeft)

    if (bottomRight < bottomLim && bottomRight < rightLim)
      this.pxQueue.push(bottomRight)

  }

  // returns color of pixel at given position
  getPixelColor(coord){
    try{
      const r = this.data[coord],
            g = this.data[coord + 1],
            b = this.data[coord + 2]
      return new Color(r, g, b)
    }
    catch(err){
      console.log(err)
    }
  }

  // sets pixel at position to given color
  setPixelColor(coord, color){
    this.data[coord] = color.r
    this.data[coord+1] = color.g
    this.data[coord + 2] = color.b
    this.data[coord + 3] = 255 // should be removable if image file has no transparency
  }

  // gets x,y corrd for given position
  getIndexCoord(idx){
    const pos = idx / 4
    return {
      y: Math.floor(pos / this.width),
      x: pos - y * this.width
    }
  }
}
