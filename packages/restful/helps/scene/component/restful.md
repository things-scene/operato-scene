# restful
A component used when a URL is provided and data is retrieved only with a URL.

## properties
  - url : Data inquiry URL
  - period : Data inquiry cycle
  - data format : Plain Text, JSON, JSONP Data format
     - Plain Text : Used when the server returns data in Plain Text.
     - JSON : When the server provides data as JSON
     - JSONP : When data is received in the form of a function, the function is received and processed.
  - with credentials : Cross site request