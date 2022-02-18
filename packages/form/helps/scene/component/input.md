# Input

It is a component that receives and processes input from the user using a keyboard or mouse.
When placed in a form container, it operates in the same way as various types of HTML input elements used in general HTML forms.

[The Input (Form Input) element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input)

## 종류

- input
- input-text
- input-password
- input-email
- input-search
- input-time
- input-datetime-local
- input-month
- input-week

## Properties

- name
  - type: string
  - the name of the element in the form
- value
  - type: string
  - input element value
- placeholder
  - type: string
  - placeholder for input element
- readonly
  - type: checkbox
  - Whether read-only
- disabled
  - type: checkbox
  - Operation in the form is disabled
- max-length
  - type: number
  - Maximum number of characters to be entered
- submit-on-change
  - type: checkbox
  - When the value change is confirmed by Enter key or focus out, etc., the form is automatically sent.
- spread-on-init
  - type: checkbox
  - Set whether to spread the data from the initial value
  - If set to true, the initial value is set as the data of the input component, and the set data spread operates.
  - If set to false, the initial value is not set to data.
- next-input
  - type: string
  - Set the focus to automatically move to a specific component when the enter key is pressed
- autofocus
  - type: checkbox
  - Set whether to have input focus automatically when the board is loaded
- alltime-focus
  - type: checkbox
  - When this component loses focus, it is set to automatically regain focus after the time set in alltime-focus-pending.
- alltime-focus-pending
  - type: number
  - When this component loses focus, if alltime-focus is set, it automatically acquires focus again after the time (milli-seconds) set in alltime-focus-pending.