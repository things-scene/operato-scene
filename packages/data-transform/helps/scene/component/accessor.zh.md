# accessor[zh]

## properties


＃存取器
如果数据是对象或数组，则需要访问器访问内部属性。 如果未输入任何内容，则默认使用Field1第一行的值。

＃＃ 特性
-存取器
   -访问数组：`[0]`
   ```javascript
     //例如
     [1,2,3,4,5，...] //将访问者分配给[1]

     2 //访问结果
   ```

   -访问对象：`[value]`或`.value`
   ```javascript
     //例如
     {
       "key1"："value1"，
       "key2"："value2"，
       "key3"："value3"，
       "key4"："value4"，
      ...
     } //将访问器分配给[key2]

     "value2" //访问结果
   ```