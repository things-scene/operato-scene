/*
 * Copyright © HatioLab Inc. All rights reserved.
 */
// file : bwip-js/lib/canvas.js
//
// bwip-js bitmap interface for an HTML canvas.
//
// Copyright (c) 2011-2016 Mark Warren
//
// Licensed MIT.  See the LICENSE file in the bwip-js root directory
// for the extended copyright notice.

// bgcolor is optional, defaults to #fff.
export default class Bitmap {
  bgcolor?: string
  clr = [0, 0, 0]
  pts = [] as any[]
  minx = 0 // min-x
  miny = 0 // min-y
  maxx = 0 // max-x
  maxy = 0 // max-y
  padx = 0 // padding-x
  pady = 0 // padding-y

  constructor(bgcolor: string) {
    this.bgcolor = bgcolor
  }

  pad(x: number, y: number) {
    this.padx = x
    this.pady = y
  }

  color(r: number, g: number, b: number) {
    this.clr = [r, g, b]
  }

  // Sets the minimim size for the drawing surface (can grow larger).
  // BWIPP has logic for borders (padding) that without this custom call
  // gets lost.  See custom/ren*.ps.
  extent(llx: number, lly: number, urx: number, ury: number) {
    llx = Math.floor(llx)
    lly = Math.floor(lly)
    urx = Math.floor(urx)
    ury = Math.floor(ury)
    if (this.minx > llx) this.minx = llx
    if (this.miny > lly) this.miny = lly
    if (this.maxx < urx) this.maxx = urx
    if (this.maxy < ury) this.maxy = ury
  }

  // a is the alpha-level of the pixel [0 .. 255]
  set(x: number, y: number, a: number) {
    x = Math.floor(x)
    y = Math.floor(y)
    this.pts.push([x, y, this.clr, a])
    if (this.minx > x) this.minx = x
    if (this.miny > y) this.miny = y
    if (this.maxx < x) this.maxx = x
    if (this.maxy < y) this.maxy = y
  }

  error(cvs: HTMLCanvasElement) {
    cvs.width = 64
    cvs.height = 64

    var ctx = cvs.getContext('2d') as CanvasRenderingContext2D

    ctx.beginPath()

    ctx.rect(0, 0, cvs.width, cvs.height)
    ctx.moveTo(0, 0)
    ctx.lineTo(cvs.width, cvs.height)
    ctx.moveTo(cvs.width, 0)
    ctx.lineTo(0, cvs.height)

    ctx.lineWidth = 5
    ctx.strokeStyle = '#ff0000'
    ctx.stroke()

    return cvs.toDataURL()
  }

  show(cvsid: string | HTMLCanvasElement, rot: 'R' | 'L' | 'N' | 'I') {
    var cvs = cvsid instanceof HTMLCanvasElement ? cvsid : (document.getElementById(cvsid) as HTMLCanvasElement)

    if (this.pts.length == 0) {
      cvs.width = 32
      cvs.height = 32
      cvs.getContext('2d')?.clearRect(0, 0, cvs.width, cvs.height)
      cvs.style.visibility = 'visible'
      return
    }

    if (rot == 'R' || rot == 'L') {
      var h = this.maxx - this.minx + 1
      var w = this.maxy - this.miny + 1
    } else {
      var w = this.maxx - this.minx + 1
      var h = this.maxy - this.miny + 1
    }

    cvs.width = w + 2 * this.padx
    cvs.height = h + 2 * this.pady

    // Convert from cmyk?
    if (this.bgcolor && this.bgcolor.length == 8) {
      let c = parseInt(this.bgcolor.substr(0, 2), 16) / 255
      let m = parseInt(this.bgcolor.substr(2, 2), 16) / 255
      let y = parseInt(this.bgcolor.substr(4, 2), 16) / 255
      let k = parseInt(this.bgcolor.substr(6, 2), 16) / 255
      let r = Math.floor((1 - c) * (1 - k) * 255)
      let g = Math.floor((1 - m) * (1 - k) * 255)
      let b = Math.floor((1 - y) * (1 - k) * 255)
      this.bgcolor = 'rgb(' + r + ',' + g + ',' + b + ')'
    } else if (this.bgcolor) {
      this.bgcolor = '#' + this.bgcolor
    }

    var ctx = cvs.getContext('2d') as CanvasRenderingContext2D
    ctx.fillStyle = this.bgcolor || '#fff'
    ctx.fillRect(0, 0, cvs.width, cvs.height)
    ctx.fillStyle = '#000'

    var id = ctx.getImageData(0, 0, cvs.width, cvs.height)
    var dat = id.data

    for (let i = 0; i < this.pts.length; i++) {
      // PostScript builds bottom-up, we build top-down.
      let x = this.pts[i][0] - this.minx
      let y = this.pts[i][1] - this.miny
      let c = this.pts[i][2] as number[]
      let a = this.pts[i][3] / 255

      if (rot == 'N') {
        y = h - y - 1 // Invert y
      } else if (rot == 'I') {
        x = w - x - 1 // Invert x
      } else {
        y = w - y // Invert y
        if (rot == 'L') {
          var t = y
          y = h - x - 1
          x = t - 1
        } else {
          var t = x
          x = w - y
          y = t
        }
      }

      var idx = (y * id.width + x) * 4
      dat[idx + 0] = (dat[idx + 0] * (1 - a) + c[0] * a) | 0
      dat[idx + 1] = (dat[idx + 1] * (1 - a) + c[1] * a) | 0
      dat[idx + 2] = (dat[idx + 2] * (1 - a) + c[2] * a) | 0
      dat[idx + 3] = 255
    }

    ctx.putImageData(id, this.padx, this.pady)

    return cvs.toDataURL()
  }
}
