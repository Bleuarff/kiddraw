'use strict'

suite('Color', () => {

    suite('Red', () => {
      const hsv = {h: 0, s: 100, v: 100}, rgb = new Color(255, 0, 0)
      test('fromHSV', () => {
        const col = Color.fromHSV(hsv)
        assert.equal(col.r, rgb.r, 'red')
        assert.equal(col.g, rgb.g, 'green')
        assert.equal(col.b, rgb.b, 'blue')
      })
      test('toHSV', () => {
        const res = rgb.toHSV()
        assert.equal(res.r, hsv.r)
        assert.equal(res.g, hsv.g)
        assert.equal(res.b, hsv.b)
      })
    })

    suite('Green', () => {
      const hsv = {h: 120, s: 100, v: 100}, rgb = new Color(0, 255, 0)
      test('fromHSV', () => {
        const col = Color.fromHSV(hsv)
        assert.equal(col.r, rgb.r, 'red')
        assert.equal(col.g, rgb.g, 'green')
        assert.equal(col.b, rgb.b, 'blue')
      })
      test('toHSV', () => {
        const res = rgb.toHSV()
        assert.equal(res.r, hsv.r)
        assert.equal(res.g, hsv.g)
        assert.equal(res.b, hsv.b)
      })
    })

    suite('Blue', () => {
      const hsv = {h: 240, s: 100, v: 100}, rgb = new Color(0, 0, 255)
      test('fromHSV', () => {
        const col = Color.fromHSV(hsv)
        assert.equal(col.r, rgb.r, 'red')
        assert.equal(col.g, rgb.g, 'green')
        assert.equal(col.b, rgb.b, 'blue')
      })
      test('toHSV', () => {
        const res = rgb.toHSV()
        assert.equal(res.r, hsv.r)
        assert.equal(res.g, hsv.g)
        assert.equal(res.b, hsv.b)
      })
    })

    suite('Black', () => {
      const hsv = {h: 0, s: 0, v: 0}, rgb = new Color(0, 0, 0)
      test('fromHSV', () => {
        const col = Color.fromHSV(hsv)
        assert.equal(col.r, rgb.r, 'red')
        assert.equal(col.g, rgb.g, 'green')
        assert.equal(col.b, rgb.b, 'blue')
      })
      test('toHSV', () => {
        const res = rgb.toHSV()
        assert.equal(res.r, hsv.r)
        assert.equal(res.g, hsv.g)
        assert.equal(res.b, hsv.b)
      })
    })

    suite('White', () => {
      const hsv = {h: 0, s: 0, v: 100}, rgb = new Color(255, 255, 255)
      test('fromHSV', () => {
        const col = Color.fromHSV(hsv)
        assert.equal(col.r, rgb.r, 'red')
        assert.equal(col.g, rgb.g, 'green')
        assert.equal(col.b, rgb.b, 'blue')
      })
      test('toHSV', () => {
        const res = rgb.toHSV()
        assert.equal(res.r, hsv.r)
        assert.equal(res.g, hsv.g)
        assert.equal(res.b, hsv.b)
      })
    })

    suite('Darkgray', () => {
      const hsv = {h: 0, s: 0, v: 18}, rgb = new Color(45, 45, 45)
      test('fromHSV', () => {
        const col = Color.fromHSV(hsv)
        assert.equal(col.r, rgb.r, 'red')
        assert.equal(col.g, rgb.g, 'green')
        assert.equal(col.b, rgb.b, 'blue')
      })
      test('toHSV', () => {
        const res = rgb.toHSV()
        assert.equal(res.r, hsv.r)
        assert.equal(res.g, hsv.g)
        assert.equal(res.b, hsv.b)
      })
    })
})
