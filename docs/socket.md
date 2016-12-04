## 消息推送

#### 加入房间

`on: join`

|参数|类型|描述|
|---|---|---|---|
|uid|string|用户Id|


#### 处理新回复

`on: new-reply`

|参数|类型|描述|
|---|---|---|---|
|from|string|用户Id|
|to|string|目标用户Id|
|cid|string|comment Id|

客户端响应： `on: message , { message: 'new-reply', from, cid }`
