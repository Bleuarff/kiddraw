'use strict'

var vm = new Vue({
  data :{
    defaultDrawing: '/models/poule.png',
    color: '#ff0000',
    canvas: null,
    ctx: null,
    width: 640,
    height: 400,
    tool: 'pen',
    lineWidth: 10,
  },
  mounted: async function(){
    this.canvas = document.getElementById('board')
    this.ctx = this.canvas.getContext("2d")

    let img = new Image(this.width, this.height)
    await new Promise(resolve => {
      img.src = this.defaultDrawing
      img.onload = resolve
    })
    this.ctx.drawImage(img, 0, 0, this.width, this.height, 0, 0, this.width, this.height);
  },
  methods: {
    // fills zone around click position with current color
    fill: function(e){
      if (this.tool != 'fill')
        return

      const pos = this.getCursorPosition(e)
      // console.log(`x: ${pos.x}  y: ${pos.y}`)

      const data = this.ctx.getImageData(0, 0, this.width, this.height).data
      const filler = new Fill(data, this.width, this.height)
      const newData = filler.fill(pos.x, pos.y, this.color)

      if (newData == null)
        return

      var newImg = new ImageData(newData, this.width)
      this.ctx.putImageData(newImg, 0, 0)
    },

    // gets click position in canvas
    getCursorPosition: function(event) {
      var rect = this.canvas.getBoundingClientRect();
      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      }
    },

    // Sets the current color
    setColor: function(color){
      this.color = color
    },

    // Sets the current tool
    setTool: function(tool){
      this.tool = tool
    },

    // starts drawing a line. Adds listener to move event, draw circle/point for each occurence
    startDraw: function(e){
      if (this.tool !== 'pen')
        return

      this.drawPoint(e)
      this.canvas.addEventListener('mousemove', this.drawPoint)
      this.canvas.addEventListener('mouseup', this.mouseup)
    },

    drawPoint: function(e){
      const pos = this.getCursorPosition(e)
      this.ctx.beginPath()
      this.ctx.fillStyle = this.color
      this.ctx.arc(pos.x, pos.y, this.lineWidth, 0, Math.PI * 2)
      this.ctx.fill()
    },

    // unbind event listeners after a pencil draw
    mouseup: function(e){
      this.canvas.removeEventListener('mousemove', this.drawPoint)
      this.canvas.removeEventListener('mouseup', this.mouseup)

    }
  }
})
