'use strict'

class Color {
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
      // debugger
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

  isGray(){
    return this.r === this.g && this.g === this.b && this.r > 10
  }

  toHSV() {
    var max = Math.max(this.r, this.g, this.b),
        min = Math.min(this.r, this.g, this.b),
        d = max - min,
        h,
        s = (max === 0 ? 0 : d / max),
        v = max / 255

    switch (max) {
      case min: h = 0; break;
      case this.r: h = (this.g - this.b) + d * (this.g < this.b ? 6: 0); h /= 6 * d; break;
      case this.g: h = (this.b - this.r) + d * 2; h /= 6 * d; break;
      case this.b: h = (this.r - this.g) + d * 4; h /= 6 * d; break;
    }

    return {
      h: h,
      s: s,
      v: v
    }
  }

  static fromHSV(hsv){
    let {h, s, v} = hsv
    var r, g, b, i, f, p, q, t;

    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - s * (1 - f))
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return new Color(
      Math.round(r * 255),
      Math.round(g * 255),
      Math.round(b * 255)
    )
  }


}
