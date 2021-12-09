# gauge[ko]
![컴포넌트-게이지(원형)][gauge-circle-01]  
## properties

1. Value(Number) - 게이지의 값.  
<figure style="text-align: center;">

![게이지-Value적용결과][gauge-circle-02]  

<figurecaption>(value: 85)</figurecaption>
</figure>

2. startValue - 게이지의 시작 값.  
<figure style="text-align: center;">

![게이지-BackgroundColor적용결과][gauge-circle-03]  

<figurecaption>(startValue: 10)</figurecaption>
</figure>

3. endValue - 게이지의 끝 값.  
<figure style="text-align: center;">

![게이지-BackgroundColor적용결과][gauge-circle-04]  
<figurecaption>(endValue: 120)</figurecaption>
</figure>

4. step - 게이지 눈금 간격.  
<figure style="text-align: center;">

![게이지-BackgroundColor적용결과][gauge-circle-05]  
<figurecaption>(step: 30)</figurecaption>
</figure>

5. stepTextSize - 게이지 눈금 글씨 크기.  
<figure style="text-align: center;">

![게이지-BackgroundColor적용결과][gauge-circle-06]  
<figurecaption>(stepTextSize: 10)</figurecaption>
</figure>

6. subStep - 게이지 눈금 사이 간격.  
<figure style="text-align: center;">

![게이지-BackgroundColor적용결과][gauge-circle-07]  
<figurecaption>(subStep: 10)</figurecaption>
</figure>

7. stepNeedleSize - 게이지 눈금 크기.
<figure style="text-align: center;">

![게이지-BackgroundColor적용결과][gauge-circle-08]  
<figurecaption>(stepNeedleSize: 3)</figurecaption>
</figure>

8. startAngle - 게이지의 시작 각도. 12시 방향을 기준으로 시계방향으로 증가한다. 음수일 경우 역방향.  
<figure style="text-align: center;">

![게이지-BackgroundColor적용결과][gauge-circle-09]  
<figurecaption>(startAngle: -90)</figurecaption>
</figure>

9. endAngle - 게이지의 끝 각도. 12시 방향을 기준으로 시계방향으로 증가한다. 음수일 경우 역방향.  
<figure style="text-align: center;">

![게이지-BackgroundColor적용결과][gauge-circle-10]  
<figurecaption>(endAngle: 90)</figurecaption>
</figure>

10. textFillStyle - 게이지 눈금 글씨 색상.  
<figure style="text-align: center;">

![게이지-BackgroundColor적용결과][gauge-circle-11]  
<figurecaption>(textFillStyle: #ec5324)</figurecaption>
</figure>

11. needleFillStyle - 게이지 바늘 색상.  
<figure style="text-align: center;">

![게이지-BackgroundColor적용결과][gauge-circle-12]  
<figurecaption>(needleFillStyle: #ec5324)</figurecaption>
</figure>

12. innerCircleFillStyle - 게이지 바늘의 원의 색상.  
<figure style="text-align: center;">

![게이지-BackgroundColor적용결과][gauge-circle-13]  
<figurecaption>(innerCircleFillStyle: #ec5324)</figurecaption>
</figure>

13. stepFillStyle - 게이지 눈금 색상.  
<figure style="text-align: center;">

![게이지-BackgroundColor적용결과][gauge-circle-14]  
<figurecaption>(stepFillStyle: #ec5324)</figurecaption>
</figure>

14. colorStops - 게이지 구간별 색상. 더블클릭으로 구간을 추가할 수 있으며 마커를 드래그하여 아래로 내리면 구간을 삭제할 수 있다.  
<figure style="text-align: center;">

![게이지-BackgroundColor적용결과][gauge-circle-15]  
<figurecaption>(colorStops: <img src="{{site.baseurl}}/assets/components/color-stops-value.png" height="30" alt="color stops">)</figurecaption>
      </figure>

15. showStartValue - 게이지 시작값의 표시여부를 결정.  
<figure style="text-align: center;">

![게이지-BackgroundColor적용결과][gauge-circle-16]  
<figurecaption>(showStartValue: unchecked)</figurecaption>
</figure>

16. showEndValue - 게이지 끝값의 표시여부를 결정.  
<figure style="text-align: center;">

![게이지-BackgroundColor적용결과][gauge-circle-17]  
<figurecaption>(showEndValue: unchecked)</figurecaption>
</figure>

17. showStepLine - 게이지 눈금의 표시여부를 결정.  
<figure style="text-align: center;">

![게이지-BackgroundColor적용결과][gauge-circle-18]  
<figurecaption>(showStepLine: unchecked)</figurecaption>
</figure>

18. showStepText - 게이지 눈금 값의 표시여부를 결정.  
<figure style="text-align: center;">

![게이지-BackgroundColor적용결과][gauge-circle-19]  
<figurecaption>(showStepText: unchecked)</figurecaption>
</figure>

19. showSubStep - 게이지 보조 눈금의 표시여부를 결정.  
<figure style="text-align: center;">

![게이지-BackgroundColor적용결과][gauge-circle-20]  
<figurecaption>(showSubStep: unchecked)</figurecaption>
</figure>

20. inText - 게이지 눈금 값의 위치를 결정. (checked: 내부, unchecked: 외부)  
<figure style="text-align: center;">

![게이지-BackgroundColor적용결과][gauge-circle-21]  
<figurecaption>(inText: unchecked)</figurecaption>
</figure>


[gauge-circle-01]:../images/gauge-circle-01.png
[gauge-circle-02]:../images/gauge-circle-02.png
[gauge-circle-03]:../images/gauge-circle-03.png
[gauge-circle-04]:../images/gauge-circle-04.png
[gauge-circle-05]:../images/gauge-circle-05.png
[gauge-circle-06]:../images/gauge-circle-06.png
[gauge-circle-07]:../images/gauge-circle-07.png
[gauge-circle-08]:../images/gauge-circle-08.png
[gauge-circle-09]:../images/gauge-circle-09.png
[gauge-circle-10]:../images/gauge-circle-10.png
[gauge-circle-11]:../images/gauge-circle-11.png
[gauge-circle-12]:../images/gauge-circle-12.png
[gauge-circle-13]:../images/gauge-circle-13.png
[gauge-circle-14]:../images/gauge-circle-14.png
[gauge-circle-15]:../images/gauge-circle-15.png
[gauge-circle-16]:../images/gauge-circle-16.png
[gauge-circle-17]:../images/gauge-circle-17.png
[gauge-circle-18]:../images/gauge-circle-18.png
[gauge-circle-19]:../images/gauge-circle-19.png
[gauge-circle-20]:../images/gauge-circle-20.png
[gauge-circle-21]:../images/gauge-circle-21.png
