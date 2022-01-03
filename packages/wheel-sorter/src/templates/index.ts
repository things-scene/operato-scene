const conveyor = new URL('../../icons/conveyor.png', import.meta.url).href
const conveyorBelt = new URL('../../icons/conveyor-belt.png', import.meta.url).href
const conveyorJoin = new URL('../../icons/conveyor-join.png', import.meta.url).href
const conveyorJoinTrapezoid = new URL('../../icons/conveyor-join-trapezoid.png', import.meta.url).href
const scanner = new URL('../../icons/scanner.png', import.meta.url).href
const wheelSorter = new URL('../../icons/wheel-sorter.png', import.meta.url).href

export default [
  {
    type: 'conveyor',
    description: 'roller type conveyor',
    group: 'warehouse',
    icon: conveyor,
    model: {
      type: 'conveyor',
      top: 350,
      left: 100,
      width: 500,
      height: 100,
      strokeStyle: '#999',
      lineWidth: 1,
      lineStyle: '#999',
      value: 1,
      rollWidth: 13
    }
  },
  {
    type: 'conveyor-belt',
    description: 'belt type conveyor',
    group: 'warehouse',
    icon: conveyorBelt,
    model: {
      type: 'conveyor-belt',
      top: 500,
      left: 100,
      width: 500,
      height: 100,
      strokeStyle: '#999',
      lineWidth: 1,
      lineStyle: '#999',
      value: 1,
      conveyorType: 1,
      rollWidth: 13
    }
  },
  {
    type: 'conveyor-join',
    description: 'join shaped conveyor',
    group: 'warehouse',
    icon: conveyorJoin,
    model: {
      type: 'conveyor-join',
      cx: 100,
      cy: 150,
      rx: 100,
      ry: 100,
      startAngle: -Math.PI / 4,
      endAngle: Math.PI / 4,
      ratio: 34,
      lineWidth: 1,
      strokeStyle: 'black',
      value: 2,
      rollWidth: 12
    }
  },
  {
    type: 'scanner',
    description: 'box scanner',
    group: 'warehouse',
    icon: scanner,
    model: {
      type: 'scanner',
      top: 100,
      left: 450,
      width: 150,
      height: 100,
      lineWidth: 1,
      strokeStyle: '#999',
      fillStyle: 'transparent',
      value: 2,
      rollWidth: 3
    }
  },
  {
    type: 'conveyor-join-trapezoid',
    description: 'conveyor join trapezoid',
    group: 'warehouse',
    icon: conveyorJoinTrapezoid,
    model: {
      type: 'conveyor-join-trapezoid',
      lineWidth: 1,
      path: [
        { x: 50, y: 150 },
        { x: 150, y: 150 },
        { x: 150, y: 250 },
        { x: 100, y: 300 },
        { x: 50, y: 250 }
      ],
      strokeStyle: '#999',
      fillStyle: 'transparent',
      value: 3,
      rollWidth: 10
    }
  },
  {
    type: 'wheel-sorter',
    description: 'wheel sorter',
    group: 'warehouse',
    icon: wheelSorter,
    model: {
      type: 'wheel-sorter',
      top: 50,
      left: 200,
      width: 200,
      height: 200,
      strokeStyle: '#999',
      fillStyle: 'transparent',
      lineWidth: 2,
      value: 1,
      tilt: 1
    }
  }
]
