'use strict'

var vm = new Vue({
  data :{
    color: '#f00'
  },
  mounted: async function(){
    var canvas = document.getElementById('board'),
        ctx = canvas.getContext("2d")

    // var img = document.querySelector('img')
    // ctx.drawImage(img, 0, 0)
    // const resp = await fetch('/models/star.png')
    // const model = await resp.text()
    let img = new Image(640,400)
    img.src = '/models/star.png'
    img.onload = (e) => {
      ctx.drawImage(img, 0, 0, 640,400, 0, 0, 640, 400)
    }


  },
  methods: {

  }
})
