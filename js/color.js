'use strict'

class Color{
    constructor(r, g, b){
      this.r = r
      this.g = g
      this.b = b
      this.hexValue = this.toHex()
    }

    toHex(){
      try{
        const r = this.r.toString(16).padStart(2, '0'),
              g = this.g.toString(16).padStart(2, '0'),
              b = this.b.toString(16).padStart(2, '0')
        return `${r}${g}${b}`
      }
      catch(err){
        console.log(err)
        debugger
      }
    }

    equals(col){
      if (col == null)
        return false

      return (this.r === col.r && this.g === col.g && this.b === col.b)
    }

    static fromHex(hexColor){
      const r = parseInt(hexColor.substr(0, 2), 16),
            g = parseInt(hexColor.substr(2, 2), 16),
            b = parseInt(hexColor.substr(4, 2), 16)
      return new Color(r, g, b)
    }


}