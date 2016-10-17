# 用户

每一个需要用户权限的操作需要在头部带上:

```js
Authorization: Bearer <token>
```

`token` 是登录时返回的。

## 注册

POST `/auth/signup`

|参数|必需|描述|
|---|---|---|
|username|✅|用户名|
|email|✅|邮箱|
|password|✅|密码|

成功返回:

```js
// 200
{
  "token": "...token",
  "user": {
    "username": "egoist",
    "createdAt": "2016-10-17T06:48:43.234Z",
    "updatedAt": "2016-10-17T06:48:43.234Z"
  }
}
```

失败返回:

```js
// 403
{
  "message": "User validation failed",
  "name": "ValidationError",
  "errors": {
    "email": {
      "message": "Error, expected `email` to be unique. Value: `0x142857@gmail.com`",
      "name": "ValidatorError",
      "properties": {
        "type": "user defined",
        "message": "Error, expected `{PATH}` to be unique. Value: `{VALUE}`",
        "path": "email",
        "value": "0x142857@gmail.com"
      },
      "kind": "user defined",
      "path": "email",
      "value": "0x142857@gmail.com"
    },
    "username": {
      "message": "Error, expected `username` to be unique. Value: `egoist`",
      "name": "ValidatorError",
      "properties": {
        "type": "user defined",
        "message": "Error, expected `{PATH}` to be unique. Value: `{VALUE}`",
        "path": "username",
        "value": "egoist"
      },
      "kind": "user defined",
      "path": "username",
      "value": "egoist"
    }
  }
}
```

## 登录

POST `/auth/signin`

|参数|必需|描述|
|---|---|---|
|account|✅|用户名或邮箱|
|password|✅|密码|

成功返回:

```js
{
  "token": "...token",
  "user": {
    "username": "egoist",
    "createdAt": "2016-10-17T06:48:43.234Z",
    "updatedAt": "2016-10-17T06:48:43.234Z"
  }
}
```
