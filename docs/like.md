# 点赞

## shot点赞

PUT `/shot/:id/like`

`!token`

|参数|类型|必需|描述|
|---|---|---|---|
|liked|boolean|✅|点赞／取消点赞|

参数示例:

```js
{
  "liked": true
}
```

返回字段:

```js
{
  "shot": shotSchema
}
```
