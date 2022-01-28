# MQTT

是连接到MQTT代理并发布/订阅设置的主题数据的数据源组件。

- 使用 [MQTT Websockets协议](http://www.steves-internet-guide.com/mqtt-websockets/)。
- 发布
   - 更改此组件的值时，该值将发布到设置的主题。
- 订阅
   - 订阅预订的主题数据并更改数据。
   - 更改数据时，数据绑定有效。

## properties

### 使用mosquitto作为MQTT代理时

- 代理 : hostname of the broker
- 端口 : websocket service port number (default 1884)
- 路径 : '/mqtt'
- 用户 : username or blank
- 密码 : password or blank
- 主题 : topic
- qos : QOS level [0, 1, 2]
- 客户端ID : (unique) client id

```
从代理的角度来看，客户端ID是指唯一连接的节点的名称。
如果客户端ID属性留空，则会自动将其创建为“ THINGS-BOARD- {role}-{timestamp}”。
输入客户ID属性后，系统会自动将其创建为“ {client-id}-{role}-{timestamp}”。
```

- 数据格式 : [Plain Text, JSON]
- 保持 : true or false
- ssl : true or false (false)

### 使用RabbitMQ的MQTT-Websocket插件时

- 代理 : hostname of the broker
- 端口 : websocket service port number (default 15675)
- 路径 : '/ws'
- 用户 : username or blank
- 密码 : password or blank
- 主题 : topic
- qos : QOS level [0, 1, 2]
- 客户端ID : (unique) client id

```
从代理的角度来看，客户端ID是指唯一连接的节点的名称。
如果客户端ID属性留空，则会自动将其创建为“ THINGS-BOARD- {role}-{timestamp}”。
输入客户ID属性后，系统会自动将其创建为“ {client-id}-{role}-{timestamp}”。
```

- 数据格式 : [Plain Text, JSON]
- 保持 : true or false
- ssl : true or false (false)

### 使用Rabbit MQ的MQTT-Websocket插件时的消息交换

```
使用Rabbit MQ的MQTT-Websocket插件时，
由durable 'topic'类型的“ amq.topic”的exchange来路由。
因此，上述MQTT数据源的主题属性用作路由键。

为了从Rabbit MQ的AMQP获取MQTT Data Source，
请参见下面的javascript示例代码。
```

```js
var amqp = require('amqplib/callback_api');

amqp.connect('amqp://hatiolab:hatiolab@mq.hatiolab.com', function(err, conn) {
  if(err) {
    console.error(err);
    return;
  }

  conn.createChannel(function (err, ch) {
    // exchange配置为amq.topic, durable option为true.
    var ex = 'amq.topic';

    ch.assertExchange(ex, 'topic', { durable: true });

    var location = {
      x: 100,
      y: 200
    };

    // topic属性为location时
    ch.publish(ex, 'location', new Buffer(JSON.stringify(location)));
  });
});
```

## 使用mosquitto创建MQTT环境（基于macOS）

### 将mosquitto安装为MQTT代理

- 使用homebrew安装mosquitto。

```sh
$ brew install mosquitto
```

- Things Scene执行于浏览器，因此需要能够通过Web Socket连接到MQTT代理。 因此，需要在mosquitto中启用Web服务功能。

```sh
$ echo -e "listener 1884\nprotocol websockets\nlistener 1883\nprotocol mqtt" >> /usr/local/opt/mosquitto/etc/mosquitto/mosquitto.conf
$ brew services restart mosquitto
```
