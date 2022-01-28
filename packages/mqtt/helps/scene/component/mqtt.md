# MQTT

It is a data source component that connects to the MQTT broker and publishes/subscribes to the topic data set.

- Use [MQTT Websockets Protocol](http://www.steves-internet-guide.com/mqtt-websockets/).
- Publish
    -When the value of this component is changed, the value will be published to the set topic.
- Subscribe
    -Subscribe to subscribed topic data and change the data.
    -When data is changed, data binding is valid.

## properties

### When using mosquitto as MQTT broker

- broker : hostname of the broker
- port : websocket service port number (default 1884)
- path : '/mqtt'
- user : username or blank
- password : password or blank
- topic : topic
- qos : QOS level [0, 1, 2]
- client-id : (unique) client id

```
The client ID refers to the name of the only connected node (from the broker's point of view), and it is uniquely written for monitoring in the broker.
If the client ID attribute is left blank, it is automatically created as'THINGS-BOARD-{role}-{timestamp}'.
When the client ID attribute is entered, it is automatically created as'{client-id}-{role}-{timestamp}'.
The reason for adding timestamp to the client ID attribute is to create a unique ID.
```

- data-format : [Plain Text, JSON]
- retain : true or false
- ssl : true or false (false)

### When using RabbitMQ's MQTT-Websocket plugin

- broker : hostname of the broker
- port : websocket service port number (default 15675)
- path : '/ws'
- user : username or blank
- password : password or blank
- topic : topic
- qos : QOS level [0, 1, 2]
- client-id : (unique) client id

```
The client ID refers to the name of the only connected node (from the broker's point of view), and it is uniquely written for monitoring in the broker.
If the client ID attribute is left blank, it is automatically created as'THINGS-BOARD-{role}-{timestamp}'.
When the client ID attribute is entered, it is automatically created as'{client-id}-{role}-{timestamp}'.
The reason for adding timestamp to the client ID attribute is to create a unique ID.
```

- data-format : [Plain Text, JSON]
- retain : true or false
- ssl : true or false (false)

### Message exchange when using Rabbit MQ's MQTT-Websocket plug-in

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
    // Set the exchange to amq.topic and set the durable option to true.
    var ex = 'amq.topic';

    ch.assertExchange(ex, 'topic', { durable: true });

    var location = {
      x: 100,
      y: 200
    };

    // When the topic property is set to location.
    ch.publish(ex, 'location', new Buffer(JSON.stringify(location)));
  });
});
```

## Creating an MQTT environment with mosquitto (based on macOS)

### Install mosquitto as MQTT broker

- Use homebrew to install mosquitto.

```
$ brew install mosquitto
```

- Things Scene is executed in the browser, so it needs to connect to the MQTT proxy via Web Socket. Therefore, you need to enable the Web service function in mosquitto.

```sh
$ echo -e "listener 1884\nprotocol websockets\nlistener 1883\nprotocol mqtt" >> /usr/local/opt/mosquitto/etc/mosquitto/mosquitto.conf
$ brew services restart mosquitto
```
