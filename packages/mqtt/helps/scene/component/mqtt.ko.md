# MQTT

MQTT broker에 연결되어, 설정된 topic 데이터를 publish/subscribe하는 데이타소스 컴포넌트이다.

- [MQTT 웹소켓 프로토콜](http://www.steves-internet-guide.com/mqtt-websockets/)를 사용한다.
- publish
  - 이 컴포넌트의 value를 변경하면, 설정된 topic으로 value를 publish한다.
- subscribe
  - 설정된 topic으로 subscribe되는 데이타를 서브스크라이브해서 data를 변경한다.
  - data가 변경되면 데이타바인딩이 작동한다.

## properties

### MQTT 브로커로 mosquitto를 사용한 경우

- broker : hostname of the broker
- port : websocket service port number (default 1884)
- path : '/mqtt'
- user : username or blank
- password : password or blank
- topic : topic
- qos : QOS level [0, 1, 2]
- client-id : (unique) client id

```
클라이언트 아이디는 (브로커 입장에서) 유일한 연결 노드의 이름을 의미하며, 브로커에서 모니터링하기 위한 용도로 유일하게 적어준다.
클라이언트 아이디 속성을 비워두면, 자동으로 'THINGS-BOARD-{role}-{timestamp}‘로 자동 생성된다.
클라이언트 아이디 속성을 입력하면, 자동으로 '{client-id}-{role}-{timestamp}'로 자동 생성된다.
클라이언트 아이디 속성에 timestamp를 추가하는 이유는, 유일한 아이디를 만들기 위해서이다.
```

- data-format : [Plain Text, JSON]
- retain : true or false
- ssl : true or false (false)

### RabbitMQ의 MQTT-Websocket 플러그인을 사용한 경우

- broker : hostname of the broker
- port : websocket service port number (default 15675)
- path : '/ws'
- user : username or blank
- password : password or blank
- topic : topic
- qos : QOS level [0, 1, 2]
- client-id : (unique) client id

```
클라이언트 아이디는 (브로커 입장에서) 유일한 연결 노드의 이름을 의미하며, 브로커에서 모니터링하기 위한 용도로 유일하게 적어준다.
클라이언트 아이디 속성을 비워두면, 자동으로 'THINGS-BOARD-{role}-{timestamp}‘로 자동 생성된다.
클라이언트 아이디 속성을 입력하면, 자동으로 '{client-id}-{role}-{timestamp}'로 자동 생성된다.
클라이언트 아이디 속성에 timestamp를 추가하는 이유는, 유일한 아이디를 만들기 위해서이다.
```

- data-format : [Plain Text, JSON]
- retain : true or false
- ssl : true or false (false)

## Rabbit MQ의 MQTT-Websocket 플러그인을 사용하는 경우 메시지 Exchange

```
When using the MQTT-Websocket plugin of Rabbit MQ,
It is routed by a durable'topic' type of'amq.topic' exchange.
Therefore, the topic attribute of the MQTT Data Source above serves as a routing key.

To be able to receive from MQTT Data Source using AMQP of Rabbit MQ,
See the javascript sample code below.
```

```
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

### MQTT 브로커로 mosquitto 설치하기

- homebrew를 이용해서 mosquitto를 설치한다.

```
$ brew install mosquitto
```

- Things Scene은 브라우저용이므로, MQTT 브로커에 웹소켓으로 접속할 수 있어야 한다. 그래서, mosquitto에 웹서비스 기능을 활성화한다.

```
$ echo -e "listener 1884\nprotocol websockets\nlistener 1883\nprotocol mqtt" >> /usr/local/opt/mosquitto/etc/mosquitto/mosquitto.conf
$ brew services restart mosquitto
```
