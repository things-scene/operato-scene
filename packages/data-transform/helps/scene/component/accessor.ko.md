# accessor
데이터가 Object 또는 Array 인 경우 내부 속성에 액세스하려면 접근자가 필요합니다. 
해당 기능을 제공하기 위한 컴포넌트다.

## properties

- Accessor
  - 아무것도 입력하지 않으면 기본적으로 Field1의 첫 번째 줄 값이 사용됩니다.
  - access to Array: `[0]`
  ```javascript
    // e.g. 
    [1, 2, 3, 4, 5, ...] // Assign accessor to [1]

    2 // Access result
  ```

  - access to Object: `[value]` or `.value`  
  ```javascript
    // e.g.
    {
      "key1": "value1",
      "key2": "value2",
      "key3": "value3",
      "key4": "value4",
      ...
    } // Assign accessor to [key2]

    "value2" // Access result
  ```


