import { debug } from '@hatiolab/things-scene'

var count = 0

function noop() {}

/**
 * JSONP handler
 *
 * Options:
 *  - param {String} qs parameter (`callback`)
 *  - prefix {String} qs parameter (`__jp`)
 *  - name {String} qs parameter (`prefix` + incr)
 *  - timeout {Number} how long after a timeout error is emitted (`60000`)
 *
 * @param {String} url
 * @param {Object|Function} optional options / callback
 * @param {Function} optional callback
 */

export default function jsonp(
  url: string,
  opts: { prefix?: string; name?: string; param?: string; timeout?: number },
  fn: (self: any, data?: any) => void
) {
  if ('function' == typeof opts) {
    fn = opts
    opts = {}
  }
  if (!opts) opts = {}

  var prefix = opts.prefix || '__jp'

  // use the callback name that was passed if one was provided.
  // otherwise generate a unique name by incrementing our counter.
  var id = opts.name || prefix + count++

  var param = opts.param || 'callback'
  var timeout = null != opts.timeout ? opts.timeout : 60000
  var enc = encodeURIComponent
  var target = document.getElementsByTagName('script')[0] || document.head
  var script: any
  var timer: any

  if (timeout) {
    timer = setTimeout(function () {
      cleanup()
      if (fn) fn(new Error('Timeout'))
    }, timeout)
  }

  function cleanup() {
    if (script.parentNode) script.parentNode.removeChild(script)
    //@ts-ignore
    window[id] = noop
    if (timer) clearTimeout(timer)
  }

  function cancel() {
    // @ts-ignore
    if (window[id]) {
      cleanup()
    }
  }

  //@ts-ignore
  window[id] = function (data) {
    debug('jsonp got', data)
    cleanup()
    if (fn) fn(null, data)
  }

  // add qs component
  url += (~url.indexOf('?') ? '&' : '?') + param + '=' + enc(id)
  url = url.replace('?&', '?')

  debug('jsonp req "%s"', url)

  // create script
  script = document.createElement('script')
  script.src = url
  target.parentNode?.insertBefore(script, target)

  return cancel
}
