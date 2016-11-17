# 评论

## 添加评论

POST `/comment`

`!token`

|参数|类型|必需|描述|
|---|---|---|---|
|shot|string|✅|评论目标(shot_id)|
|replyTo|string||回复目标(user_id)|
|content|string||内容|

参数示例:

```js
//评论shot
{
	"content":"此处必有本子ww",
	"shot":"5815cf157d98f97b1382f0c7",
}

//评论shot＋ 回复其他用户
{
	"content":"道歉时露出胸部是常识ww",
	"shot":"5815cf157d98f97b1382f0c7",
	"replyTo": "580c03f04678d217cf6825ce"
}
```

返回字段:
```js
{
  "shot": shotSchema,
  "comment": commentSchema
}
```


## 获取评论列表

GET `/comments`

|参数|类型|必需|描述|
|---|---|---|---|
|shot|string|✅|shot_id|
|before|Date||before之前的评论|
|after|Date||after之后的评论|
|limit|number||个数|


返回字段:
```js
[
	{
    "_id": "581e824bee6b2e7d65463bf4",
    "createdAt": "2016-11-06T01:07:23.608Z",
    "updatedAt": "2016-11-06T01:07:23.608Z",
    "shot": {
      "_id": "581d3c0f4fd2a777aaf3d9fa"
    },
    "user": {
      "_id": "580c03f04678d217cf6825ce",
      "username": "vai",
      "avatar": "https://cdn.v2ex.co/gravatar/b7ff13628a62b907c243ba797d190fbe"
    },
    "__v": 0,
    "content": "我选择死亡"
  },
]
```

## 获取回复列表

GET `/replys`

`!token`

|参数|类型|必需|描述|
|---|---|---|---|
|before|Date||before之前的回复|
|after|Date||after之后的回复|
|limit|number||个数|


返回字段:
```js
[
	{
    "_id": "581ac7f65680da1da61d1838",
    "createdAt": "2016-11-03T05:15:34.479Z",
    "updatedAt": "2016-11-03T05:15:34.479Z",
    "replyTo": {
      "_id": "580c03f04678d217cf6825ce",
      "username": "vai",
      "avatar": "https://cdn.v2ex.co/gravatar/b7ff13628a62b907c243ba797d190fbe"
    },
    "parent": "581abd4500bbad1bdb766714",
    "user": {
      "_id": "580c03f04678d217cf6825ce",
      "username": "vai",
      "avatar": "https://cdn.v2ex.co/gravatar/b7ff13628a62b907c243ba797d190fbe"
    },
    "__v": 0,
    "content": "gg"
  },
]
```
