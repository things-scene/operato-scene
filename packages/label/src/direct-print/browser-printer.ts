import ZebraBrowserPrintWrapper from 'zebra-browser-print-wrapper'

export class BrowserPrinter {
  printer = new ZebraBrowserPrintWrapper()

  async print(content: string) {
    try {
      const availablePrinters = await this.printer.getAvailablePrinters()
      if (availablePrinters && availablePrinters.length && availablePrinters[0]) {
        var printer = availablePrinters[0]
      } else {
        throw new Error('There is no printer in your configuration')
      }

      this.printer.setPrinter(printer)

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
