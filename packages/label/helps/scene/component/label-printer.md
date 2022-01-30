# label printer

It is a component that prints a given label board to a printer connected via USB.
Currently, Zebra's ZPL only supports printing through the image (GRF Format) command.
Therefore, if the target printer must be a Zebra compatible model, it must support ZPL's image (GRF Format) command.

When the value or data of this component is changed, the printout function is activated.
When printing, the current data (or value) object of this component is transferred as data of the target board.

Since the output is made using the browser's [WebUSB API](https://developer.mozilla.org/en-US/docs/Web/API/USB) function, the output function works only when connected via HTTPS.
(if the host is localhost, the output function operates exceptionally.)

## Browser Compatibility

It is a function that utilizes [WebUSB API] (https://developer.mozilla.org/en-US/docs/Web/API/USB), an experimental function of the current browser, so it works only in the next browser version.

- Chrome +61
- Edge +79
- Opera 48
- Chrome Android +61
- Opera Android +45
- Samsung Internet +8.0

## properties

- vendor id
   - Set the ID of the printer vendor connected to the USB port.
     -For example, Zebra's Vendor ID is '0x0A5F'.
   - This is not a required field, and if it is not entered, the Zebra Vendor ID is used by default.
   - You can select the target printer from the print connection list that pops up in the browser at the time of printing.

- board id
   - Select the board you want to print.

- value
   - The property connected to the value of this component is 'data'.
   - If the value is not an object or is empty, it is not printed.