import { Component, POINT, Properties, RectPath } from '@hatiolab/things-scene';

/*
 * Copyright © HatioLab Inc. All rights reserved.
 */
import Quaternion from './quaternion';

type VEC = { x: number, y: number, z: number}

const NATURE = {
  props: []
};

const points = [
  { x: 0, y: 0, z: 0 },
  { x: -50, y: +100, z: -100 },
  { x: +50, y: +100, z: -100 },
  { x: +50, y: -100, z: -100 },
  { x: -50, y: -100, z: -100 },
  { x: 0, y: 0, z: -100 }, // 렌즈의 중심을 표현하는 좌표.
  { x: 0, y: +50, z: -100 } // 카메라의 위쪽을 표시하기위한 좌표.
];

/* rotate_by_euler와 같이 동작하도록 순서를 맞춤. */
function rotate_by_quaternion_axis(points: VEC[], pitch: number, roll: number, yaw: number) {
  var qx = Quaternion.fromAxis({ x: 1, y: 0, z: 0 }, pitch);
  var qy = Quaternion.fromAxis({ x: 0, y: 1, z: 0 }, roll);
  var qz = Quaternion.fromAxis({ x: 0, y: 0, z: 1 }, yaw);

  var q = qz.multiply(qy).multiply(qx);

  return points.map(point => { return q.multiVec(point) });
}

function rotate_by_euler(points: VEC[], pitch: number, roll: number, yaw: number) {

  var cosa = Math.cos(yaw);
  var sina = Math.sin(yaw);

  var cosb = Math.cos(roll);
  var sinb = Math.sin(roll);

  var cosc = Math.cos(pitch);
  var sinc = Math.sin(pitch);

  var Axx = cosa * cosb;
  var Axy = cosa * sinb * sinc - sina * cosc;
  var Axz = cosa * sinb * cosc + sina * sinc;

  var Ayx = sina * cosb;
  var Ayy = sina * sinb * sinc + cosa * cosc;
  var Ayz = sina * sinb * cosc - cosa * sinc;

  var Azx = -sinb;
  var Azy = cosb * sinc;
  var Azz = cosb * cosc;

  return points.map(point => {
    let { x, y, z } = point;

    return {
      x: Axx * x + Axy * y + Axz * z,
      y: Ayx * x + Ayy * y + Ayz * z,
      z: Azx * x + Azy * y + Azz * z
    }
  });
}

export default class Camera extends RectPath(Component) {

  render(context: CanvasRenderingContext2D) {

    var transformed = this.transformed;

    if (this.transformed[5].z > 0) {
      this.__drawLines(context, transformed)
      this.__drawRect(context, transformed)
    } else {
      this.__drawRect(context, transformed)
      this.__drawLines(context, transformed)
    }

  }

  private _anim_alpha_yaw: number = 0
  private _anim_alpha_roll: number = 0
  private _anim_alpha_pitch: number = 0

  get transformed() {
    var {
      yaw = 0,
      pitch = 0,
      roll = 0
    } = this.model;

    return rotate_by_quaternion_axis(
      points,
      pitch - (this._anim_alpha_pitch || 0),
      roll - (this._anim_alpha_roll || 0),
      yaw - (this._anim_alpha_yaw || 0)
    );
  }

  static get nature() {
    return NATURE
  }

  __drawLines(context: CanvasRenderingContext2D, transformed: POINT[]) {
    var center = this.center;

    context.beginPath();

    // 2D좌표에서 Y축이 반대방향이므로 center에서 빼준다.
    context.moveTo(center.x + transformed[0].x, center.y - transformed[0].y);
    context.lineTo(center.x + transformed[1].x, center.y - transformed[1].y);
    context.moveTo(center.x + transformed[0].x, center.y - transformed[0].y);
    context.lineTo(center.x + transformed[2].x, center.y - transformed[2].y);
    context.moveTo(center.x + transformed[0].x, center.y - transformed[0].y);
    context.lineTo(center.x + transformed[3].x, center.y - transformed[3].y);
    context.moveTo(center.x + transformed[0].x, center.y - transformed[0].y);
    context.lineTo(center.x + transformed[4].x, center.y - transformed[4].y);

    context.strokeStyle = this.model.strokeStyle;
    context.stroke();
    context.closePath();
  }

  __drawRect(context: CanvasRenderingContext2D, transformed: POINT[]) {
    var center = this.center;

    context.beginPath();

    // 2D좌표에서 Y축이 반대방향이므로 center에서 빼준다.
    context.moveTo(center.x + transformed[1].x, center.y - transformed[1].y);
    context.lineTo(center.x + transformed[2].x, center.y - transformed[2].y);
    context.lineTo(center.x + transformed[3].x, center.y - transformed[3].y);
    context.lineTo(center.x + transformed[4].x, center.y - transformed[4].y);
    context.lineTo(center.x + transformed[1].x, center.y - transformed[1].y);

    context.fillStyle = this.model.fillStyle;
    context.strokeStyle = this.model.strokeStyle;
    context.fill();
    context.stroke();

    context.beginPath();
    context.ellipse(center.x + transformed[6].x, center.y - transformed[6].y, 5, 5, 0, 0, Math.PI * 2);
    context.stroke();
  }

  /*
   * Performance 문제로 애니메이션 적용 보류
   * 만약, 적용하려면,
   * - 먼저, 아래 메쏘드의 이름을 수정한다. (_onchange ==> onchange)
   * - 그리고, 아래의 Component.memoize(Camera.prototype, 'transformed', false); 부분을 코멘트 처리한다.
   */
  onchange(after: Properties, before: Properties) {
    if (after.hasOwnProperty('data')) {
      let data = after.data;
      if (!data.hasOwnProperty('yaw')
        && !data.hasOwnProperty('pitch')
        && !data.hasOwnProperty('roll'))
        return;

      this.set({
        yaw: data.yaw,
        pitch: data.pitch,
        roll: data.roll
      })
      return;
    }

    if (!after.hasOwnProperty('yaw')
      && !after.hasOwnProperty('pitch')
      && !after.hasOwnProperty('roll'))
      return;

    var self = this;
    var diff_yaw = after.yaw - before.yaw;
    var diff_pitch = after.pitch - before.pitch;
    var diff_roll = after.roll - before.roll;

    this._anim_alpha_yaw = diff_yaw;
    this._anim_alpha_pitch = diff_pitch;
    this._anim_alpha_roll = diff_roll;

    this.animate({
      step: function (delta: number) {
        self._anim_alpha_yaw = diff_yaw * (1 - delta);
        self._anim_alpha_pitch = diff_pitch * (1 - delta);
        self._anim_alpha_roll = diff_roll * (1 - delta);

        self.invalidate();
      },
      duration: 1000,
      delta: 'circ',
      options: {
        x: 1
      },
      ease: 'inout'
    }).start();
  }

}

// Component.memoize(Camera.prototype, 'transformed', false);

Component.register('camera', Camera);
