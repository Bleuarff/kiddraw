'use strict'

class Color{
    constructor(r, g, b){
      this.r = r
      this.g = g
      this.b = b
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

    // returns a new Color object from an hexadecimal-formatted color with leading hash, e.g. '#123456'
    static fromHex(hexColor){
      const r = parseInt(hexColor.substr(1, 2), 16),
            g = parseInt(hexColor.substr(3, 2), 16),
            b = parseInt(hexColor.substr(5, 2), 16)
      return new Color(r, g, b)
    }


}
