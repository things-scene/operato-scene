# **Chart**

## 1. Common

### 1.1. Common Properties

* Theme - Change the theme of the chart. Supports'light' and'dark'
* Legend - Display the legend of the chart.
* Position - Can be placed in four directions: top, bottom, left, and right.
* Multi Axis - Whether to express the Y axis as left and right Multi Axis, and when selecting Multi Axis, the Y 2nd axes and Y 2nd axes options are displayed.

### 1.2. X Axes

* Data key - Field name of the data to be represented on the chart. Enter the field name of the data to be expressed in X Axes. When the following data is displayed, it becomes'Date'.
  ![Chart-bar-theme][chart-bar-01]
* Title - Enter the desired label in X Axes
* Grid Line - Whether grid lines representing the vertical direction
  ![X Axes Grid][chart-bar-08]
* Display Tick - Whether X Axes Display Tick or not

### 1.3. Y Axes

* Title - Enter the desired title (Label) in Y Axes
* Min Auto - When Min Auto is selected, the minimum value and step are automatically applied to calculate the scale
* Min - Displayed when Min Auto is off, and scale Min can be set.
* Max Auto - When Max Auto is selected, the maximum value and step are automatically applied and the scale is calculated.
* Max - Displayed when Max Auto is off, and the scale Max can be set.
* Step - Set the scale interval
* Grid Line - Whether to express horizontal grid lines
  ![Y Axes Grid][chart-bar-12]
* Display Tick - Whether Y Axes Display Tick or not

---

## 2. Mix Chart(Vertical bar chart & line chart)
* Chart that expresses data by mixing bar shape and line shape. __(The properties of the mix chart are the same as the bar chart and line chart.)__
* Data can be expressed in the form of bars or lines, or by mixing bars and lines. When there are multiple series (fields), it can be expressed as a parallel bar or stacked bar.
  ![chart-mix-chart Type][chart-mix-02]

  [chart-mix-02]: ../images/chart-mix-02.png

### 2.1. Series
* Multiple series of data can be added by using the button "+".
* **common**
  * Data Key - Defines the field name of the data to be expressed in Y Axes from the original data referenced by series,
    When displaying the following data, the Data Key of the Series is 'Good' and'Bad'.
    ![Data Refer][chart-bar-01]
  * Type - Whether to express the series in a line chart or bar
  * Label - Legend name
  * Color - Specify the color of the series to be displayed on the chart
  * Stack Group - The values ​​of the series included in the same Stack Group are accumulated and expressed in a graph.
    ![Stack Group][chart-bar-02]
  * Target Axes - When multi axis is applied, the setting field for the target Axes appears, and the target Axes points to the Axes (Axes scale) referenced by the information of the series.
    ![Target Axes][chart-bar-03]
  * Value Prefix - The character to be applied as the Value Prefix of the value when the value is displayed (mouse hover, Display Value setted, etc.) (Ex: data: 100, Value Prefix: $ => Result: $100)
  * Value Suffix - The character to be applied as the Value Suffix of the value when the value is displayed (mouse hover, Display Value setted, etc.) (Ex: data: 100, Value Suffix: circle => Result: 100 won)
  * Display Value - Determines whether to display the data of the series on the screen.
    When Display Value is selected, the following items appear.
    * Font Color - Set the color of the displayed value in the series
    * Size - Set Font Size in Series
    * Position - Set Font Position in Series
* **When Type is line**
  * Line Tension - Graph using straight line (angled), graph using smooth line (smooth)
  * Border Width - Set the width of the line
  * Point Shape - Point shape of each vertex of the line
  * Point Size - Size of each vertex of the line
  * Fill - The space where the line is drawn is filled in the figure that displays the data by using the color of the common inner definition.

### 2.2. X Axes

* Same as the content defined in [Common Properties](#1.2.-X Axes)
* Bar Spacing - Gap between bars, and it affects the size of the bar.
* Tick Spacing - Gap between the tick marks and affects the size of the bar.

### 2.3. Y Axes

* Same as the content defined in [Common Properties](#1.3.-Y Axes)

### 2.4. Y 2nd Axes(Display on Multi axis is selected)

* Same as the content defined in [Common Properties](#1.3.-Y Axes)


[chart-bar-01]: ../images/chart-bar-01.png

[chart-bar-02]: ../images/chart-bar-02.png

[chart-bar-03]: ../images/chart-bar-03.png

[chart-bar-08]: ../images/chart-bar-08.png

[chart-bar-12]: ../images/chart-bar-12.png


---

## 3. Horizontal bar chart

A chart that expresses data in the form of a horizontal bar. When there are multiple fields, it can be expressed as a parallel bar or stacked bar.

### 3.1. 공통 속성
  
* Theme - Change the theme of the chart. Supports'light' and'dark'
* Legend - Display the legend of the chart.
* Position - Can be placed in four directions: top, bottom, left, and right.
* Multi Axis - Whether to express the Y axis as left and right Multi Axis, and when selecting Multi Axis, the Y 2nd axes and Y 2nd axes options are displayed.

### 3.2. Series

* Multiple series of data can be added by using the button "+".
* **common**
  * Data Key - Defines the field name of the data to be expressed in Y Axes from the original data referenced by series,
    When displaying the following data, the Data Key of the Series is 'Good' and'Bad'.
    ![Data Refer][chart-bar-01]
  * Label - Legend name
  * Color - Specify the color of the series to be displayed on the chart
  * Stack Group - The values ​​of the series included in the same Stack Group are accumulated and expressed in a graph.
    ![Stack Group][chart-bar-02]
  * Target Axes - When multi axis is applied, the setting field for the target Axes appears, and the target Axes points to the Axes (Axes scale) referenced by the information of the series.
    ![Target Axes][chart-bar-03]
  * Value Prefix - The character to be applied as the Value Prefix of the value when the value is displayed (mouse hover, Display Value setted, etc.) (Ex: data: 100, Value Prefix: $ => Result: $100)
  * Value Suffix - The character to be applied as the Value Suffix of the value when the value is displayed (mouse hover, Display Value setted, etc.) (Ex: data: 100, Value Suffix: circle => Result: 100 won)
  * Display Value - Determines whether to display the data of the series on the screen.When Display Value is selected, the following items appear.
    * Font Color - Set the color of the displayed value in the series
    * Size - Set Font Size in Series
    * Position - Set Font Position in Series

### 3.3. X Axes

* Data Key - The field name of the data to be expressed by the chart. Enter the field name of the data to be expressed in X Axes. When the following data is displayed, it becomes'Date'.
  ![Data Refer][chart-horizontal-bar-01]
* Title - Enter the desired title (Label) in X Axes
* Grid Line - Whether to display vertical grid lines
* Display Tick - Whether X Axes Display Tick or not

### 3.4. Y Axes

* Title - Enter the desired title (Label) in Y Axes
* Min Auto - When Min Auto is selected, the minimum value and step are automatically applied to calculate the scale
* Min - Displayed when Min Auto is off, and scale Min can be set.
* Max Auto - When Max Auto is selected, the maximum value and step are automatically applied and the scale is calculated.
* Max - Displayed when Max Auto is off, and the scale Max can be set.
* Step - Set the scale interval
* Grid Line - Whether to express horizontal grid lines
* Display Tick - Whether Y Axes Display Tick or not


[chart-horizontal-bar-01]: ../images/chart-horizontal-bar-01.png

---
## 4. Line Chart

Chart that expresses data in the form of a line. 

### 4.1. Properties

* Theme-Change the theme of the chart. Supports'light' and'dark'
* Legend-Display the legend of the chart.
* Position-It can be placed in four directions: top, bottom, left, and right.
* Multi axis-Whether to express Y Axes as left and right Multi axis, when selecting Multi axis, Y 2nd Axes and Y 2nd Axes options are displayed.

### 4.2. Series

* Multiple series of data can be added by using the button "+".
* **common**
  * Data Key - Defines the field name of the data to be expressed in Y Axes in the original data referenced by series, and when the following data is displayed, the Data-Key of the series becomes'Good' or 'Bad'.
  ![Data Refer][chart-line-01]
  * Line Tension - Graph using straight line (angled), graph using smooth line (smooth)
  * Border Width - Set the width of the line
  * Label - Legend name
  * Color - Specify the color of the series to be displayed on the chart
  * Point Shape - Point shape of each vertex of the line
  * Point Size - Size of each vertex of the line
  * Stack Group - The values ​​of the series included in the same Stack Group are accumulated and expressed in a graph.
  * Fill - The space where the line is drawn is filled in the figure that displays the data by using the color of the common inner definition.
  * Target Axes - When multi axis is applied, the setting field for the target Axes appears, and the target Axes points to the Axes (Axes scale) referenced by the information of the series.
  * Value Prefix - The character to be applied as the Value Prefix of the value when the value is displayed (mouse - over, Display Value, etc.) (Ex: data: 100, Value Prefix: $ => Result: $100)
  * Value Suffix - The character to be applied as the Value Suffix of the value when the value is displayed (mouse - over, Display Value, etc.) (Ex: data: 100, Value Prefix: circle => Result: 100 won)
  * Display Value - Determines whether to display the data of the series on the screen. When Display Value is selected, the following items appear.
    * Font Color - Set the color of the displayed value in the series
    * Size - Set Font Size in Series
    * Position - Set FontPosition in Series

### 4.3. X Axes

* Data Key-The field name of the data to be expressed by the chart. Enter the field name of the data to be expressed in X Axes. When the following data is displayed, it becomes'Date'.
* Title-Enter the desired title (Label) in X Axes
* Grid Line-Whether to display vertical grid lines
* Display Tick-Whether X Axes Display Tick or not

### 4.4. Y Axes
* Title - Enter the desired title (Label) in Y Axes
* Min Auto - When Min Auto is selected, the minimum value and step are automatically applied to calculate the scale
* Min - Displayed when Min Auto is off, and scale Min can be set.
* Max Auto - When Max Auto is selected, the maximum value and step are automatically applied and the scale is calculated.
* Max - Displayed when Max Auto is off, and the scale Max can be set.
* Step - Set the scale interval
* Grid Line - Whether to express horizontal grid lines
* Display Tick - Whether Y Axes Display Tick or not


[chart-line-01]: ../images/chart-line-01.png

---
## 5. Radar chart

A chart that expresses data in the form of a radar. Pie chart data is expressed in the form of multiple lines
### 5.1. Common attribute

* Theme - Change the theme of the chart. Supports'light' and'dark'
* Legend - Display the legend of the chart.
* Position - It can be placed in four directions: top, bottom, left, and right.

### 5.2. Series

* Multiple series of data can be added by using the button "+".
* **common**
  * Data Key - Defines the field name of the data to be expressed in Y Axes in the original data referenced by series, and when the following data is displayed, the Data-Key of the series becomes'Good' and'Bad'.
  ![Data Refer][chart-radar-01]
  * Label - Legend name
  * Color - Specify the color of the series to be displayed on the chart
  * Stack Group - The values ​​of the series included in the same Stack Group are accumulated and expressed in a graph.
  * Value Prefix - The character to be applied as the Value Prefix of the value when the value is displayed (mouse hover, Display Value, etc.) (Ex: data: 100, Value Prefix: $ => Result: $100)
  * Value Suffix - The character to be applied as the Value Suffix of the value when the value is displayed (mouse hover, Display Value, etc.) (Ex: data: 100, Value Prefix: circle => Result: 100 won)
  * Display Value - Determines whether to display the data of the series on the screen. When Display Value is selected, the following items appear.
    * Font Color - Set the color of the displayed value in the series
    * Size - Set Font Size in Series
    * Position - Set FontPosition in Series

### 5.3. Axes
  * Data Key - Defines the field name of the data to be expressed in Axes in the original data referenced by series. When displaying the following data, the referenced data becomes a line.
  ![Data Refer][chart-radar-01]

[chart-radar-01]: ../images/chart-radar-01.png

---

## 6. Polar chart

Charts that represent data in polar coordinates.

### 6.1. Common attribute

* Theme - Change the theme of the chart. Supports'light' and'dark'
* Legend - Display the legend of the chart.
* Position - It can be placed in four directions: top, bottom, left, and right.

### 6.2. Series

* Multiple series of data can be added by using the button "+".
* **common**
  * Data Key - Defines the field name of the data to be expressed in Y Axes in the original data referenced by series, and when the following data is displayed, the Data-Key of the series becomes 'Good'.
  ![Data Refer][chart-polar-01]
  * Label - Legend name
  * Color - Specify the color of the series to be displayed on the chart
  * Value Prefix - The character to be applied as the Value Prefix of the value when the value is displayed (mouse hover, Display Value, etc.) (Ex: data: 100, Value Prefix: $ => Result: $100)
  * Value Suffix - The character to be applied as the Value Suffix of the value when the value is displayed (mouse hover, Display Value, etc.) (Ex: data: 100, Value Prefix: circle => Result: 100 won)
  * Display Value - Determines whether to display the data of the series on the screen. When Display Value is selected, the following items appear.
    * Font Color - Set the color of the displayed value in the series
    * Size - Set Font Size in Series
    * Position - Set FontPosition in Series

### 6.3. Axes
  * Data Key - Defines the field name of the data to be expressed in Axes in the original data referenced by series. When displaying the following data, the referenced data becomes line.
  ![Data Refer][chart-polar-01]

[chart-polar-01]: ../images/chart-polar-01.png

---

## 7. Pie chart

Charts that represent data in a circular shape.

### 7.1. Common attribute

* Theme-Change the theme of the chart. Supports'light' and'dark'
* Legend-Display the legend of the chart.
* Position-It can be placed in four directions: top, bottom, left, and right.

### 7.2. Series

* Multiple series of data can be added by using the button "+".
* **common**
  * Data Key-Defines the field name of the data to be expressed in Y Axes in the original data referenced by series, and when the following data is displayed, the Data-Key of the series becomes 'Good'.
  ![Data Refer][chart-pie-01]
  * Label-Legend name
  * Color-Specify the color of the series to be displayed on the chart
  * Value Prefix-The character to be applied as the Value Prefix of the value when the value is displayed (mouse-over, Display Value, etc.) (Ex: data: 100, Value Prefix: $ => Result: $100)
  * Value Suffix-The character to be applied as the Value Suffix of the value when the value is displayed (mouse-over, Display Value, etc.) (Ex: data: 100, Value Prefix: circle => Result: 100 won)
  * Display Value-Determines whether to display the data of the series on the screen. When Display Value is selected, the following items appear.
    * Font Color-Set the color of the displayed value in the series
    * Size-Set Font Size in Series
    * Position-Set FontPosition in Series

### 7.3. Axes
  * Data Key-Defines the field name of the data to be expressed in Axes in the original data referenced by series. When displaying the following data, the referenced data becomes a line.
  ![Data Refer][chart-pie-01]

[chart-pie-01]: ../images/chart-pie-01.png

---

## 8. Donut chart

A chart that presents data in a donut shape.

### 8.1. Common attribute

* Theme-Change the theme of the chart. Supports'light' and'dark'
* Legend-Display the legend of the chart.
* Position-It can be placed in four directions: top, bottom, left, and right.

### 8.2. Series

* Multiple series of data can be added by using the button "+".
* **common**
  * Data Key-Defines the field name of the data to be expressed in Axes in the original data referenced by series, and when the following data is displayed, the Data-Key of the series becomes 'Good'.
  ![Data Refer][chart-doughnut-01]
  * Label-Legend name
  * Color-Specify the color of the series to be displayed on the chart
  * Value Prefix-The character to be applied as the Value Prefix of the value when the value is displayed (mouse-over, Display Value, etc.) (Ex: data: 100, Value Prefix: $ => Result: $100)
  * Value Suffix-The character to be applied as the Value Suffix of the value when the value is displayed (mouse-over, Display Value, etc.) (Ex: data: 100, Value Prefix: circle => Result: 100 won)
  * Display Value-Determines whether to display the data of the series on the screen. When Display Value is selected, the following items appear.
    * Font Color-Set the color of the displayed value in the series
    * Size-Set Font Size in Series
    * Position-Set FontPosition in Series

### 8.3. Axes
  * Data Key-Defines the field name of the data to be expressed in Axes in the original data referenced by series. When displaying the following data, the referenced data becomes a line.
  ![Data Refer][chart-doughnut-01]

[chart-doughnut-01]: ../images/chart-doughnut-01.png
