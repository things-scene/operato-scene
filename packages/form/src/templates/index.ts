const button = new URL('../icons/button.png', import.meta.url).href
const fieldset = new URL('../icons/fieldset.png', import.meta.url).href
const form = new URL('../icons/form.png', import.meta.url).href
const soapClient = new URL('../icons/form.png', import.meta.url).href
const embed = new URL('../icons/icon-embed.png', import.meta.url).href
const radioGroup = new URL('../icons/icon-radio-group.png', import.meta.url).href
const video = new URL('../icons/icon-video.png', import.meta.url).href
const iframe = new URL('../icons/iframe.png', import.meta.url).href
const img = new URL('../icons/img.png', import.meta.url).href
const checkbox = new URL('../icons/input-checkbox.png', import.meta.url).href
const color = new URL('../icons/input-color.png', import.meta.url).href
const date = new URL('../icons/input-date.png', import.meta.url).href
const email = new URL('../icons/input-email.png', import.meta.url).href
const file = new URL('../icons/input-file.png', import.meta.url).href
const number = new URL('../icons/input-number.png', import.meta.url).href
const password = new URL('../icons/input-password.png', import.meta.url).href
const radio = new URL('../icons/input-radio.png', import.meta.url).href
const range = new URL('../icons/input-range.png', import.meta.url).href
const reset = new URL('../icons/input-reset.png', import.meta.url).href
const search = new URL('../icons/input-search.png', import.meta.url).href
const submit = new URL('../icons/input-submit.png', import.meta.url).href
const text = new URL('../icons/input-text.png', import.meta.url).href
const link = new URL('../icons/link.png', import.meta.url).href
const select = new URL('../icons/select.png', import.meta.url).href
const textarea = new URL('../icons/textarea.png', import.meta.url).href

const ICONS: { [type: string]: string } = {
  text,
  password,
  email,
  search,
  number,
  color,
  range,
  file,
  date,
  radio,
  checkbox,
  submit,
  reset,
  button,
  fieldset,
  iframe,
  img,
  link,
  textarea,
  select,
  form,
  soapClient,
  radioGroup,
  video,
  embed
}

var inputs01 = ['text', 'password', 'email', 'search', 'number', 'color', 'range', 'file', 'date'].map(function (type) {
  return {
    type: 'input-' + type,
    description: 'html input-' + type,
    group: 'form',
    icon: ICONS[type],
    model: {
      type: 'input-' + type,
      top: 100,
      left: 100,
      width: 280,
      height: 30,
      paddingLeft: type == 'search' ? 0 : 7,
      paddingRight: type == 'search' ? 0 : 7,
      fontSize: 14,
      fillStyle: 'white',
      fontColor: '#585858',
      strokeStyle: 'rgba(0,0,0,.4)',
      lineWidth: type == 'file' ? 0 : 1,
      lineDash: 'solid',
      textAlign: 'left'
    }
  }
})

var inputs02 = ['submit', 'reset'].map(function (type) {
  return {
    type: 'input-' + type,
    description: 'html input-' + type,
    group: 'form',
    icon: ICONS[type],
    model: {
      type: 'input-' + type,
      top: 100,
      left: 100,
      width: 280,
      height: 30,
      fontSize: 14,
      fillStyle: 'white',
      fontColor: '#585858',
      strokeStyle: 'rgba(0,0,0,.4)'
    }
  }
})

var buttons = ['button'].map(function (type) {
  return {
    type: type,
    description: 'html ' + type,
    group: 'form',
    icon: ICONS[type],
    model: {
      type: type,
      top: 100,
      left: 100,
      width: 280,
      height: 30,
      fontSize: 14,
      fillStyle: 'white',
      fontColor: '#585858',
      textAlign: 'center'
    }
  }
})

var textibles = ['radio', 'checkbox'].map(function (type) {
  return {
    type: 'input-' + type,
    description: 'html input-' + type,
    group: 'form',
    icon: ICONS[type],
    model: {
      type: 'input-' + type,
      top: 100,
      left: 100,
      width: 280,
      height: 30,
      text: 'noname',
      fontSize: 14,
      fontColor: '#585858',
      textAlign: 'left'
    }
  }
})

var fieldsets = ['fieldset', 'iframe', 'img', 'link'].map(function (type) {
  return {
    type: type,
    description: 'html ' + type,
    group: 'form',
    icon: ICONS[type],
    model: {
      type: type,
      top: 100,
      left: 100,
      width: type !== 'link' ? 400 : 280,
      height: type !== 'link' ? 300 : 30,
      fontSize: 14,
      fillStyle: 'white',
      fontColor: '#585858',
      strokeStyle: 'rgba(0,0,0,.4)',
      lineWidth: 1,
      lineDash: 'solid',
      textAlign: 'left'
    }
  }
})

var multimedias = ['video'].map(type => {
  return {
    type,
    description: 'html ' + type,
    group: 'form',
    icon: ICONS[type],
    model: {
      type,
      top: 100,
      left: 100,
      width: 400,
      height: 224,
      controls: true,
      src: 'https://player.vimeo.com/external/242538643.sd.mp4?s=42dacbec1a58f449a3fa4845801df5d446a99134&profile_id=165'
    }
  }
})

var applications = ['embed'].map(type => {
  return {
    type,
    description: 'html ' + type,
    group: 'form',
    icon: ICONS[type],
    model: {
      type,
      top: 100,
      left: 100,
      width: 400,
      height: 224,
      mimetype: 'video/webm',
      src: 'https://player.vimeo.com/external/242538643.sd.mp4?s=42dacbec1a58f449a3fa4845801df5d446a99134&profile_id=165'
    }
  }
})

var others = ['textarea', 'select', 'radioGroup'].map(function (type) {
  return {
    type: type == 'radioGroup' ? 'radio-group' : type,
    description: 'html ' + type,
    group: 'form',
    icon: ICONS[type],
    model: {
      type: type == 'radioGroup' ? 'radio-group' : type,
      top: 100,
      left: 100,
      width: 280,
      height: type == 'textarea' ? 60 : 40,
      paddingLeft: type == 'select' ? 0 : 7,
      paddingRight: type == 'select' ? 0 : 7,
      fontSize: 14,
      fillStyle: 'white',
      fontColor: '#585858',
      strokeStyle: 'rgba(0,0,0,.4)',
      lineWidth: 1,
      lineDash: 'solid',
      textAlign: 'left'
    }
  }
})

var forms = [
  {
    type: 'form',
    description: 'html form',
    group: 'form',
    icon: ICONS['form'],
    model: {
      type: 'form',
      top: 100,
      left: 100,
      width: 400,
      height: 200,
      fontColor: '#585858',
      strokeStyle: '#ccc',
      lineWidth: 1,
      method: 'GET',
      action: '',
      contentType: 'application/json',
      name: 'search',
      authorization: '',
      format: 'TEXT'
    }
  },
  {
    type: 'soap-client',
    description: 'soap client',
    group: 'form',
    icon: ICONS['soapClient'],
    model: {
      type: 'soap-client',
      top: 100,
      left: 100,
      width: 400,
      height: 200,
      fontColor: '#585858',
      strokeStyle: '#ccc',
      lineWidth: 1,
      action: '',
      method: '',
      name: 'search',
      authorization: ''
    }
  }
]

export default [
  ...forms,
  ...inputs01,
  ...inputs02,
  ...buttons,
  ...textibles,
  ...fieldsets,
  ...multimedias,
  ...applications,
  ...others
]
