import ZebraBrowserPrintWrapper from 'zebra-browser-print-wrapper'

export class BrowserPrinter {
  printer = new ZebraBrowserPrintWrapper()

  async print(content: string) {
    try {
      const defaultPrinter = await this.printer.getDefaultPrinter()
      this.printer.setPrinter(defaultPrinter)

      const status = await this.printer.checkPrinterStatus()
      if (status.isReadyToPrint) {
        this.printer.print(content)
      } else {
        throw new Error(`Browser Printer is not ready to print (${status.errors})`)
      }
    } catch (error) {
      throw new Error(error as string)
    }
  }
}
