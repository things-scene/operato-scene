/**
 * 문자열 길이를 늘려주는 함수
 *
 * @param {String} i
 * @param {Number} len
 */
function ii(i: number, len?: number) {
  var s = i + ''
  len = len || 2
  while (s.length < len) s = '0' + s
  return s
}

/**
 * 시간 표시 포맷을 맞추는 함수
 *
 * @param {Number} seconds seconds
 * @param {string} format hh:mm:ss
 */
export default function format(seconds = 0, format = '') {
  var h = 0,
    m = 0,
    s = 0
  var formated = ''

  h = Math.floor(seconds / 3600)
  formated = format.replace(/(^|[^\\])hh+/g, '$1' + ii(h))
  formated = formated.replace(/(^|[^\\])h/g, '$1' + h)
  if (format != formated) {
    format = formated
    seconds %= 1440
  }

  m = Math.floor(seconds / 60)
  formated = format.replace(/(^|[^\\])mm+/g, '$1' + ii(m))
  formated = formated.replace(/(^|[^\\])m/g, '$1' + m)
  if (format != formated) {
    format = formated
    seconds %= 60
  }

  s = seconds
  formated = format.replace(/(^|[^\\])ss+/g, '$1' + ii(s))
  formated = formated.replace(/(^|[^\\])s/g, '$1' + s)

  return formated
}
