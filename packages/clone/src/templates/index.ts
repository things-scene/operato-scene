const icon = new URL('../../icons/clone.png', import.meta.url).href

export default [
  {
    type: 'clone',
    description: 'component cloner',
    group: 'etc',
    icon,
    model: {
      type: 'clone',
      top: 350,
      left: 100,
      width: 30,
      height: 30,
      strokeStyle: '#999',
      lineWidth: 1,
      lineStyle: '#999'
    }
  }
]
