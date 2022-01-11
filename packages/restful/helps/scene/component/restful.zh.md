# restful
提供URL且仅通过URL检索数据时使用的组件。

## properties

- 访问地址 : 数据查询网址
- 周期 : 数据查询周期
- 数据格式 : Plain Text，JSON，JSONP数据格式
   - Plain Text : 服务器以纯文本格式返回数据时使用。
   - JSON : 当服务器以JSON形式提供数据时
   - JSONP : 当以函数形式接收数据时，将接收并处理该函数。

- 允许跨网 : 是否允许跨网