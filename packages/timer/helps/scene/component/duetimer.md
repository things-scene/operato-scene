# duetimer

this component that counts down the set timeout value every second.

- To set statically, you can set during modeling, options in days, hours, minutes, and seconds.
- To set it dynamically, set the timeout(seconds) value in the value property during execution.
- The result value by format-run and format-stop of the countdown process is set in the data property.
- In addition, the timer component provides a simple horizontal progress bar expression function, you can set fill style on color setting.

  ![fill-color]

  [fill-color]: ../images/timer-fill-color.png

## properties

- due

  - timestamp (the number of milliseconds elapsed since January 1, 1970 00:00:00 UTC.) : due time
  - this is value property for duetimer, you need to set value (timeout due) to this property
  - getter: hold due time of the timer
  - setter: settable due time of the timer

- format-run
  - string
  - format : hh:mm:ss
  - count down running format
- format-stop
  - string
  - format : --:--:--
  - count down format on stop
- background color
  - string, rgb color
  - component background color

## hidden properties

- countdown
  - readonly
  - number (seconds)
  - when timer set, count down will start automatically
