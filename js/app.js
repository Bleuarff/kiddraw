'use strict'

var vm = new Vue({
  data :{
    color: 'ff0000',
    canvas: null,
    ctx: null,
    width: 640,
    height: 400,

    // x: 0,
    // y: 0
  },
  mounted: async function(){
    this.canvas = document.getElementById('board')
    this.ctx = this.canvas.getContext("2d")

    let img = new Image(this.width, this.height)
    await new Promise(resolve => {
      img.src = '/models/star.png'
      img.onload = resolve
    })
    this.ctx.drawImage(img, 0, 0, this.width, this.height, 0, 0, this.width, this.height);
  },
  methods: {
    fill: function(e){
      const pos = this.getCursorPosition(e)
      // console.log(`x: ${pos.x}  y: ${pos.y}`)

      const data = this.ctx.getImageData(0, 0, this.width, this.height).data
      const filler = new Fill(data, this.width, this.height)
      const newData = filler.fill(pos.x, pos.y, this.color)

      var newImg = new ImageData(newData, this.width)
      this.ctx.putImageData(newImg, 0, 0)
    },

    getCursorPosition: function(event) {
      var rect = this.canvas.getBoundingClientRect();
      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      }
    }
  }
})
