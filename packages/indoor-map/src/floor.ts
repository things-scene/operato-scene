/*
 * Copyright © HatioLab Inc. All rights reserved.
 */
import { Component, Container } from '@hatiolab/things-scene'

import IndoorMap from './indoor-map'

const NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties: [
    {
      type: 'action',
      label: 'remove',
      name: 'remove',
      property: {
        icon: 'remove-circle',
        action: function (floor: Floor) {
          let indoor = floor.parent as IndoorMap
          indoor.removeComponent(floor)
          indoor.set('activeIndex', 0)
        }
      }
    }
  ]
}

export default class Floor extends Container {
  private _clickPoint?: Component

  get hasTextProperty() {
    return false
  }

  get showMoveHandle() {
    return false
  }

  /*
   * PATH 리스트를 직접 수정할 수 있는 지를 결정한다.
   *
   * 일반적으로 PATH는 바운드 생성을 위해서 논리적으로 생성되므로, 직접 수정하지 않는다.(return false)
   * 그러나, 각 꼭지점들이 개별로 움직이는 다각형류는 path 라는 모델데이타를 가지므로, 직접수정이 가능할 수 있다.(return true)
   *
   * Immutable 컴포넌트의 형상을 바꾸는 방법은 바운드를 이용한 리사이즈나, 특별한 컨트롤을 통해서 가능하다.
   */
  get mutable() {
    return false
  }

  /*
   * BOUND를 통해서 리사이즈를 할 수 있는 지를 결정한다.
   *
   * 일반적으로 면적을 갖는 컴포넌트는 대체로 가능하다.(return true)
   * 그러나, LINE 등 면적을 가지지않는 컴포넌트는 가능하지 않도록 정의한다.(return false)
   */
  get resizable() {
    return false
  }

  /*
   * 회전을 할 수 있는 지를 결정한다.
   *
   * 일반적으로 모든 컴포넌트는 가능하다.(return true)
   */
  get rotatable() {
    return false
  }

  get nature() {
    return NATURE
  }

  // drawLocationMarkers(locations) {
  //   for (let uuid in locations) {
  //     let locInfo = locations[uuid]
  //     let props = locInfo.props || {}

  //     props.width = props.width || 10
  //     props.height = props.height || 10

  //     let currentTime = new Date().getTime()
  //     // let diffTime = 500
  //     let diffTime = currentTime - locInfo.lastUpdateTime

  //     if (diffTime < locInfo.updateInterval) {
  //       let movingObject = this.findById(uuid)
  //       if (movingObject) {
  //         // props.yaw = 0;
  //         // props.roll = 0;

  //         movingObject.set(props)
  //         for (let key in props) {
  //           movingObject[key] = props[key]
  //         }
  //       } else {
  //         // TODO: marker의 초기값 관련 로직 정리 필요.

  //         let config = Object.assign(
  //           {
  //             type: locInfo.type || 'rect',
  //             // type: locInfo.type || "camera",
  //             id: uuid,
  //             fillStyle: 'red',
  //             left: props.center.x - props.width * 0.5,
  //             top: props.center.y - props.height * 0.5,
  //             cx: props.center.x,
  //             cy: props.center.y
  //           },
  //           props
  //         )

  //         let marker = Model.compile(config)

  //         this.addComponent(marker)

  //         // movingObject = this.findById(uuid)
  //         // if(movingObject) {
  //         //   movingObject.set(props);
  //         // }
  //       }
  //     } else {
  //       let movingObject = this.findById(uuid)
  //       this.removeComponent(movingObject)
  //     }

  //     this.invalidate()
  //   }
  // }

  // simulate(point) {
  //   // for(let i in this.components) {
  //   //   if(this.components[i].model.type != 'beacon')
  //   //     continue;
  //   //
  //   //   let beacon = this.components[i]
  //   //   let distance = Math.sqrt(Math.pow(beacon.center.x - point.x, 2) + Math.pow(beacon.center.y - point.y, 2)) * 0.01
  //   //   let rssi = -10 * Math.log10(distance) + (beacon.txPower || -71)
  //   //
  //   //   let randRssi = gaussian(rssi, Math.pow(4.894686948810031, 2))
  //   //
  //   //   rssi = randRssi.ppf(Math.random())
  //   //
  //   //   console.log(rssi);
  //   // }

  //   let beacons: {
  //     distance: number;
  //     gaussian: number;
  //     txPower: number;
  //   }[] = []

  //   for (let i in this.components) {
  //     if (this.components[i].model.type != 'beacon') continue

  //     let beacon = this.components[i]

  //     beacon.distance = Math.sqrt(
  //       Math.pow(beacon.center.x - point.x, 2) +
  //         Math.pow(beacon.center.y - point.y, 2)
  //     )
  //     beacon.gaussian = gaussian(
  //       beacon.model.txPower || -71,
  //       Math.pow(3.209, 2)
  //     )
  //     beacon.txPower = beacon.gaussian.ppf(Math.random())

  //     beacons.push(beacon)
  //   }

  //   beacons = beacons.slice(0)

  //   this.calculatePosition(beacons, point)
  // }

  // calculatePosition(nodeArr, position) {
  //   let beacons = nodeArr

  //   beacons.sort(function(a, b) {
  //     let rssiA = -10 * Math.log10(a.distance) + a.txPower
  //     let rssiB = -10 * Math.log10(b.distance) + b.txPower

  //     return Math.abs(rssiA) - Math.abs(rssiB)
  //   })

  //   let beaconCombs = this.k_combinations(beacons.slice(0, 4), 3)
  //   let positions = []

  //   for (let i in beaconCombs) {
  //     let beaconComb = beaconCombs[i]
  //     let beaconA = beaconComb[0]
  //     let beaconB = beaconComb[1]
  //     let beaconC = beaconComb[2]

  //     let xa = beaconA.center.x
  //     let ya = beaconA.center.y
  //     let xb = beaconB.center.x
  //     let yb = beaconB.center.y
  //     let xc = beaconC.center.x
  //     let yc = beaconC.center.y
  //     let ra = beaconA.distance
  //     let rb = beaconB.distance
  //     let rc = beaconC.distance

  //     // let ra = Math.sqrt(Math.pow(beaconA.center.x - position.x, 2) + Math.pow(beaconA.center.y - position.y, 2)) * 0.01
  //     // let rb = Math.sqrt(Math.pow(beaconB.center.x - position.x, 2) + Math.pow(beaconB.center.y - position.y, 2)) * 0.01
  //     // let rc = Math.sqrt(Math.pow(beaconC.center.x - position.x, 2) + Math.pow(beaconC.center.y - position.y, 2)) * 0.01

  //     let rssiA = -10 * Math.log10(beaconA.distance * 0.01) + beaconA.txPower
  //     let rssiB = -10 * Math.log10(beaconB.distance * 0.01) + beaconB.txPower
  //     let rssiC = -10 * Math.log10(beaconC.distance * 0.01) + beaconC.txPower

  //     ra = this.calculateDistance(beaconA.txPower, rssiA) * 100
  //     rb = this.calculateDistance(beaconB.txPower, rssiB) * 100
  //     rc = this.calculateDistance(beaconC.txPower, rssiC) * 100

  //     let xaSq = xa * xa,
  //       xbSq = xb * xb,
  //       xcSq = xc * xc,
  //       yaSq = ya * ya,
  //       ybSq = yb * yb,
  //       ycSq = yc * yc,
  //       raSq = ra * ra,
  //       rbSq = rb * rb,
  //       rcSq = rc * rc
  //     let numerator1 =
  //       (xb - xa) * (xcSq + ycSq - rcSq) +
  //       (xa - xc) * (xbSq + ybSq - rbSq) +
  //       (xc - xb) * (xaSq + yaSq - raSq)
  //     let denominator1 = 2 * (yc * (xb - xa) + yb * (xa - xc) + ya * (xc - xb))
  //     let y = numerator1 / denominator1
  //     let numerator2 =
  //       rbSq - raSq + xaSq - xbSq + yaSq - ybSq - 2 * (ya - yb) * y
  //     let denominator2 = 2 * (xa - xb)
  //     let x = numerator2 / denominator2

  //     if (Number.isFinite(x) && Number.isFinite(y)) {
  //       positions.push({
  //         x: x,
  //         y: y
  //       })
  //     }
  //   }

  //   let avgPosition = this.averageOfPositions(positions)

  //   if (this._simPosition) this.removeComponent(this._simPosition)

  //   this._simPosition = Model.compile({
  //     type: 'ellipse',
  //     cx: avgPosition.x,
  //     cy: avgPosition.y,
  //     rx: 10,
  //     ry: 10,
  //     fillStyle: 'navy'
  //   })

  //   this.addComponent(this._simPosition)
  // }

  // calculateDistance(txPower, rssi) {
  //   if (rssi == 0) {
  //     return -1.0 // if we cannot determine distance, return -1.
  //   }

  //   let ratio = (rssi * 1.0) / txPower
  //   if (ratio < 1.0) {
  //     return Math.pow(ratio, 10)
  //   } else {
  //     let accuracy = 0.89976 * Math.pow(ratio, 7.7095) + 0.111
  //     return accuracy
  //   }
  // }

  // calculateAngle(p1, p2, p3) {
  //   let l1 = Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2),
  //     l2 = Math.pow(p2.x - p3.x, 2) + Math.pow(p2.y - p3.y, 2),
  //     l3 = Math.pow(p3.x - p1.x, 2) + Math.pow(p3.y - p1.y, 2)

  //   return Math.acos((l1 + l2 - l3) / Math.sqrt(4 * l1 * l2))
  // }

  // averageOfPositions(p) {
  //   let sumOfX = 0
  //   let sumOfY = 0

  //   for (let i in p) {
  //     let point = p[i]
  //     sumOfX += point.x
  //     sumOfY += point.y
  //   }

  //   return {
  //     x: sumOfX / p.length,
  //     y: sumOfY / p.length
  //   }
  // }

  // k_combinations(set, k) {
  //   var i, j, combs, head, tailcombs

  //   // There is no way to take e.g. sets of 5 elements from
  //   // a set of 4.
  //   if (k > set.length || k <= 0) {
  //     return []
  //   }

  //   // K-sized set has only one K-sized subset.
  //   if (k == set.length) {
  //     return [set]
  //   }

  //   // There is N 1-sized subsets in a N-sized set.
  //   if (k == 1) {
  //     combs = []
  //     for (i = 0; i < set.length; i++) {
  //       combs.push([set[i]])
  //     }
  //     return combs
  //   }

  //   // Assert {1 < k < set.length}

  //   // Algorithm description:
  //   // To get k-combinations of a set, we want to join each element
  //   // with all (k-1)-combinations of the other elements. The set of
  //   // these k-sized sets would be the desired result. However, as we
  //   // represent sets with lists, we need to take duplicates into
  //   // account. To avoid producing duplicates and also unnecessary
  //   // computing, we use the following approach: each element i
  //   // divides the list into three: the preceding elements, the
  //   // current element i, and the subsequent elements. For the first
  //   // element, the list of preceding elements is empty. For element i,
  //   // we compute the (k-1)-computations of the subsequent elements,
  //   // join each with the element i, and store the joined to the set of
  //   // computed k-combinations. We do not need to take the preceding
  //   // elements into account, because they have already been the i:th
  //   // element so they are already computed and stored. When the length
  //   // of the subsequent list drops below (k-1), we cannot find any
  //   // (k-1)-combs, hence the upper limit for the iteration:
  //   combs = []
  //   for (i = 0; i < set.length - k + 1; i++) {
  //     // head is a list that includes only our current element.
  //     head = set.slice(i, i + 1)
  //     // We take smaller combinations from the subsequent elements
  //     tailcombs = this.k_combinations(set.slice(i + 1), k - 1)
  //     // For each (k-1)-combination we join it with the current
  //     // and store it to the set of k-combinations.
  //     for (j = 0; j < tailcombs.length; j++) {
  //       combs.push(head.concat(tailcombs[j]))
  //     }
  //   }
  //   return combs
  // }

  // onclick(e) {
  //   return

  //   let point = this.transcoordC2S(e.offsetX, e.offsetY)

  //   if (this._clickPoint) {
  //     this.removeComponent(this._clickPoint)
  //   }

  //   this._clickPoint = Model.compile({
  //     type: 'ellipse',
  //     cx: point.x,
  //     cy: point.y,
  //     rx: 10,
  //     ry: 10,
  //     fillStyle: 'red'
  //   })

  //   this.addComponent(this._clickPoint)
  //   this.simulate(point)
  //   // let self = this
  //   // setTimeout(function() {
  //   //   self.simulate(point)
  //   // }, 500)
  //   this.invalidate()
  // }
}

Component.register('floor', Floor)
