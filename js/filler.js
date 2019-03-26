'use strict'


class Fill{
  constructor(data, width, height){
    this.data = data
    this.width = width
    this.height = height

    this.bitWidth = width * 4
  }

  fill(x, y, hexTargetColor){
    const pos = (y * this.width + x) * 4
    this.srcColor = this.getPixelColor(pos)

    // do not process black pixels (borders)
    if (this.srcColor.equals(new Color(0, 0, 0)))
      return null

    this.targetColor = Color.fromHex(hexTargetColor)
    this.targetHSV = this.targetColor.toHSV()

    // initialize queue of pixels to process
    this.pxQueue = new Queue(this.width * this.height)
    this.pxQueue.push(pos)

    const start = Date.now()
    let iters = 0, processed

    do{
      processed = this._processQueue()
      iters += processed
    }
    while (processed === 1)

    const duration = Date.now() - start
    console.log(`fill: ${duration}ms / ${iters} iterations`)
    console.log(this.pxQueue.stats)
    return this.data
  }

  // gets first pixel in queue, checks its color.
  // If is source color, paint it and look for its neighbors
  _processQueue(){
    if (this.pxQueue.length === 0)
      return 0

    const pxCoord = this.pxQueue.shift()

    if (typeof pxCoord === 'undefined')
      return 0

    const pxColor = this.getPixelColor(pxCoord)

    if (pxColor.equals(this.srcColor)){
      let added = this.addNeighbors(pxCoord)
      this.setPixelColor(pxCoord, this.targetColor)
    }
    else if (!pxColor.isBlackish()){
      // color is a darker target color.
      // Decrement value by difference between full value and pixel value
      let pxHSV = pxColor.toHSV(),
          darkenedTarget = {
            h: this.targetHSV.h,
            s: this.targetHSV.s,
            v: this.targetHSV.v - (100 - pxHSV.v)
          }
      this.setPixelColor(pxCoord, Color.fromHSV(darkenedTarget))
      this.addNeighbors(pxCoord)
    }
    return 1
  }

  // adds neighbor pixels to the queue
  addNeighbors(coord){
    var neighborCount = 0

    if (coord >= this.bitWidth){
      const top = coord - this.bitWidth
      neighborCount += this.pxQueue.push(top)
    }

    if (coord % (this.bitWidth) < 639 * 4){
      const right = coord + 4
      neighborCount += this.pxQueue.push(right)
    }

    if (coord < 399*640*4){
      const bottom = coord + this.bitWidth
      neighborCount += this.pxQueue.push(bottom)
    }

    if (coord % (this.bitWidth) > 0){
      const left = coord - 4
      neighborCount += this.pxQueue.push(left)
    }

    return neighborCount
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

  // gets x,y coord for given position
  getIndexCoord(idx){
    const pos = idx / 4,
          y = Math.floor(pos / this.width),
          x = pos - y * this.width
    return { y: y, x: x }
  }
}
