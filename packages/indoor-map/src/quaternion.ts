/*
 * Copyright © HatioLab Inc. All rights reserved.
 */
export default class Quaternion {
  x: number
  y: number
  z: number
  w: number

  constructor(x:  number, y: number, z: number, w?: number) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
    this.w = w === undefined ? 1 : w;
  }

  multiply(q: Quaternion) {
    var { x, y, z, w } = this;
    var qx = q.x,
      qy = q.y,
      qz = q.z,
      qw = q.w;

    return new Quaternion(
      x * qw + y * qz - z * qy + w * qx,
      - x * qz + y * qw + z * qx + w * qy,
      x * qy - y * qx + z * qw + w * qz,
      - x * qx - y * qy - z * qz + w * qw
    );
  }

  add(x_: number | Quaternion, y_: number, z_: number, w_: number): Quaternion {
    var { x, y, z, w } = this;

    // of the form: `q1.add(q2)`
    if (isNaN(Number(x_)))
      return (x_ as Quaternion).add(x, y, z, w);

    // addition of the just scaler component. of the form: `q1.add(n)`
    if (y_ === undefined)
      return new Quaternion(x, y, z, w + (x_ as number));

    // of the form: `q1.add(x, y, z, w)`
    return new Quaternion(x + (x_ as number), y + y_, z + z_, w + w_);
  }

  get coords() {
    return {
      x: this.x,
      y: this.y,
      z: this.z,
      w: this.w
    }
  }

  get array() {
    return [this.x, this.y, this.z, this.w];
  }

  get inverse() {
    return new Quaternion(-this.x, -this.y, -this.z);
  }

  get size() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
  }

  get norm() {
    var l = this.size;
    if (l === 0)
      return new Quaternion(0, 0, 0, 0);
    else
      return new Quaternion(this.x / l, this.y / l, this.z / l, this.w / l);
  }

  static fromAxis(axis: {x: number, y: number, z: number}, angle: number) {
    // see: http://www.genesis3d.com/~kdtop/Quaternions-UsingToRepresentRotation.htm
    // q = (s, v_vec)
    // s = cos(theta / 2)
    // v = u_vec * sin (theta / 2)
    var halfAngle = angle / 2, s = Math.sin(halfAngle);
    return new Quaternion(axis.x * s, axis.y * s, axis.z * s, Math.cos(halfAngle));
  }

  static fromEuler(vec: {x: number, y: number, z: number}) {
    var c = 1,
      x = vec.x * c,
      y = vec.y * c,
      z = vec.z * c,
      c1 = Math.cos(y),
      s1 = Math.sin(y),
      c2 = Math.cos(-z),
      s2 = Math.sin(-z),
      c3 = Math.cos(x),
      s3 = Math.sin(x),
      c1c2 = c1 * c2,
      s1s2 = s1 * s2;

    return new Quaternion(
      c1c2 * s3 + s1s2 * c3,
      s1 * c2 * c3 + c1 * s2 * s3,
      c1 * s2 * c3 - s1 * c2 * s3,
      c1c2 * c3 - s1s2 * s3
    );
  }

  multiVec(vec: {x: number, y: number, z: number}) {
    var { x, y, z, w } = this;

    // quaternion * vec
    var x_ = w * vec.x + y * vec.z - z * vec.y,
      y_ = w * vec.y + z * vec.x - x * vec.z,
      z_ = w * vec.z + x * vec.y - y * vec.x,
      w_ = -x * vec.x - y * vec.y - z * vec.z;

    // vec * quaternion^-1
    return {
      // note: possible future per. opt. in signs
      x: x_ * w + w_ * -x + y_ * -z - z_ * -y,
      y: y_ * w + w_ * -y + z_ * -x - x_ * -z,
      z: z_ * w + w_ * -z + x_ * -y - y_ * -x
    }
  }

  toString() {
    return '[x=' + this.x + ', y=' + this.y + ', z=' + this.z + ', w=' + this.w + ']'
  }

}
