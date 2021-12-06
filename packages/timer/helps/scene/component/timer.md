# timer

this component that counts down the set timeout value every second.

- To set statically, you can set during modeling, options in days, hours, minutes, and seconds.
- To set it dynamically, set the timeout(seconds) value in the value property during execution.
- The result value by format-run and format-stop of the countdown process is set in the data property.
- In addition, the timer component provides a simple horizontal progress bar expression function, you can set fill style on color setting.

  ![fill-color]

  [fill-color]: ../images/timer-fill-color.png

## properties

- days
  - number
  - timeout days(0- )
- hours
  - number
  - timeout hours(0-23)
- minutes
  - number
  - timeout minutes(0-59)
- seconds
  - number
  - timeout seconds(0-59)
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

- timeout

  - number (seconds)
  - This is the value of the timer (in seconds).
  - This is value property, you need to set timeout value to this property

    > ex) on tap event use "set value to target component" option. blowing sample set target with class

    ![button]

    > ex) on data spread share data to timer's value, blowing sample set target value with key

    ![databind]

  [button]: ../images/rect-button.png
  [databind]: ../images/timer-data-bind.png

- countdown
  - readonly
  - number (seconds)
  - when timer set, count down will start automatically
