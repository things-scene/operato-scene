const DEFAULT_FILTERS = [
  {
    vendorId: 0x0a5f /* zebra */
  },
  {
    vendorId: 0x04f9 /* brother */
  },
  {
    vendorId: 0x0828 /* sato */
  }
]

export class USBPrinter {
  filters: {
    vendorId: number
  }[] = DEFAULT_FILTERS

  device: any

  constructor(filters = DEFAULT_FILTERS) {
    this.filters = filters
  }

  async setup() {
    //@ts-ignore
    if (!navigator.usb) {
      throw new Error('Browser could not access USB device. You can print only https or localhost origin.')
    }

    //@ts-ignore
    var selectedDevice = await navigator.usb.requestDevice({
      filters: this.filters
    })

    this.device = selectedDevice
    console.log(this.device)

    await this.device.open()
    if (!this.device.configuration) {
      await this.device.selectConfiguration(1)
    }
    await this.device.claimInterface(0)
    if (!this.device.configuration.interfaces[0].alternate) {
      await this.device.selectAlternateInterface(0, 0)
    }
  }

  async read() {
    const { endpointNumber } = this.device.configuration.interfaces[0].alternate.endpoints[0]

    var result = await this.device.transferIn(endpointNumber, 64)
    var textDecoder = new TextDecoder()

    return textDecoder.decode(result.data)
  }

  async _print(content: string) {
    var encoder = new TextEncoder()
    var data = encoder.encode(content)

    const { endpointNumber } = this.device.configuration.interfaces[0].alternate.endpoints[1]
    await this.device.transferOut(endpointNumber, data)
  }

  async connectAndPrint(content: string) {
    this.print(content)
  }

  async print(content: string) {
    try {
      if (!this.device) {
        await this.setup()
        await this._print(content)
      } else {
        await this._print(content)
      }
    } catch (e) {
      console.log(e)
      delete this.device

      throw e
    }
  }
}
