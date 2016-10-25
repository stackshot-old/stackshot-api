# 用户

## 单个用户信息
Post `/graphql?query={user( $args ){ $fields }}`

Example `/graphql?query={ user( username: "alice" ){ username,createdAt,updatedAt,avatar,shotsCount,commentsCount,followersCount,followingsCount } }`

|args|必需|描述|   
|---|---|---|
|username|✅|用户名|

|fields|type|
|---|---|
|id| ID|
|username|String|
|email|String|
|avatar|String|
|password|String|
|token|String|
|createdAt|String|
|updatedAt|String|
|shotsCount|Int|
|commentsCount|Int|
|followersCount|Int|
|followingsCount|Int|

成功返回:
```js
{
  "data": {
    "user": {
      "username": "alice",
      "createdAt": "Tue Oct 25 2016 15:29:35 GMT+0800 (CST)",
      "updatedAt": "Tue Oct 25 2016 15:29:35 GMT+0800 (CST)",
      "avatar": "https://cdn.v2ex.co/gravatar/36efb4cce7003729e9fce3745dc53b6b",
      "shotsCount": 0,
      "commentsCount": 0,
      "followersCount": 0,
      "followingsCount": 0
    }
  }
}
```

失败返回:
```js
{
  "errors": [
    {
      "message": "Unknown argument \"userame\" on field \"user\" of type \"Query\". Did you mean \"username\"?",
      "locations": [
        {
          "line": 1,
          "column": 7
        }
      ]
    },
    {
      "message": "Field \"user\" argument \"username\" of type \"String!\" is required but not provided.",
      "locations": [
        {
          "line": 1,
          "column": 2
        }
      ]
    }
  ]
}
```
