# indoor-map

## example

Control the indoor layer by triggering events on the rectangular component
>-**Apply a click event to a square component and deliver it to indoors**
>-**If you change the value property of Indoor, the Floor will be changed.**

![gif][gif-01]  


[gif-01]: ../images/indoor-button-finish-01.gif

1. It creates indoor with three layers.

![indoor][indoor-create]  

2. Text is put in each layer for distinction.

![indoor][indoor-text]  


3. The ID of the indoor map is designated as'indoor'.

![indoor][indoor-id]  

4. Add button event
- After drawing 3 squares, select indoor as the variable information in the'effect window'.
(In the variable information, a list of IDs of basic events and components is shown.)  
![buttonEvent][button-02]

- Map values for each square. (When clicking the square, data of '0' is passed to the component with the indoor ID.)
  - 1layer - 0
  - 2layer - 1
  - 3layer - 2  

![buttonEvent][button-03]  


[button-02]: ../images/button-evnet-mapping-02.png

[button-03]: ../images/button-evnet-mapping-03.png

5. indoor map setting

- Set the data binding setting of the indoor map component as shown in the figure below.
(Setting to change its value property when receiving data)

![buttonEvent][indoor-setting]

6.  check result
  - If all settings are complete, you can see that the indoor map layer changes every time you click the square as shown below.
  ![gif-01]

[gif-01]: ../images/indoor-button-finish-01.gif



[indoor-create]: ../images/indoor-create-01.png

[indoor-text]: ../images/indoor-create-02.png

[indoor-id]: ../images/indoor-create-03.png

[indoor-setting]: ../images/indoor-setting-01.png