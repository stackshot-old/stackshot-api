# 用户

每一个需要用户权限的操作需要在头部带上:

```js
Authorization: Bearer <token>
```

`token` 是登录时返回的。

## 注册
POST `/graphql?query=mutation{ signup( $args ){ $fields } }`

Example `/graphql?query=mutation{ signup(username: "alice", email:"alice@gensokyo.com", password: "123456") {user{username},token} }`

|args|必需|描述|   
|---|---|---|
|username|✅|用户名|
|email|✅|邮箱|
|password|✅|密码|

|fields|type|
|---|---|
|user|Object|
|token|String|

成功返回:

```js
// 200
{
  "data": {
    "signup": {
      "user": {
        "username": "alice"
      },
      "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI1ODBmMDlkZmYwZTk2ODBlZGUzNmU0MDIiLCJpYXQiOjE0NzczODA1NzUsImV4cCI6MTQ5MjkzMjU3NX0.LVOWKCG5yBJE4EMXtHRJDutjPJW-krBwUhFSmpvhh6u7NbtaCSNW11Xh1U6qwk2N6yDXZ6ybRWm390PBy-IEYJ7b5RpK3mutkom3_LWLVKIV5EsSh59AoKat0GXjRi2R84qDt87p4_oLcC-MV01tdt5UoE6FaKxujFwIWQTkr_Y"
    }
  }
}
```

失败返回:

```js
{
  "data": {
    "signup": null
  },
  "errors": [
    {
      "message": "child \"username\" fails because [\"username\" length must be at least 2 characters long]",
      "locations": [
        {
          "line": 1,
          "column": 10
        }
      ],
      "path": [
        "signup"
      ]
    }
  ]
}
```

## 登录

POST `/graphql?query=mutation{ signin( $args ){ $fields } }`

Example  `/graphql?query=mutation{ signin(account: "vai", password: "123456") {user{username},token} }`

|args|必需|描述|   
|---|---|---|
|account|✅|用户名|
|password|✅|密码|

|fields|type|
|---|---|
|user|Object|
|token|String|


成功返回:

```js
// 200
{
  "data": {
    "signin": {
      "user": {
        "username": "vai"
      },
      "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI1ODBjMDNmMDQ2NzhkMjE3Y2Y2ODI1Y2UiLCJpYXQiOjE0NzczNzk5NDB9.RlSgk5G1kQqKB_p-4axHg8bDBnsjRPyw-B6J22UYczpCDfcxFo6BPYlbh9FQ3GqWuLs9RXTwY8xc2x_JFDYIGq5Dq-4Jznx0TXRVyyk6nfAWVFf0dHKmejwMPNOX7tHr6IsH_mORVxU-j0jPH9VgiY0BMBuBTJFesZVGzxvm07A"
    }
  }
}
```

失败返回:

```js
{
  "data": {
    "signin": null
  },
  "errors": [
    {
      "message": "child \"account\" fails because [\"account\" length must be at least 2 characters long]",
      "locations": [
        {
          "line": 1,
          "column": 10
        }
      ],
      "path": [
        "signin"
      ]
    }
  ]
}
```
