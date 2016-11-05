# 评论

## 添加评论

POST `/comment`

|参数|类型|必需|描述|
|---|---|---|---|
|parent|string|✅|评论目标(shot_id)|
|replyTo|string||回复目标(user_id)|
|content|string||内容|

参数示例:

```js
//评论shot
{
	"content":"此处必有本子ww",
	"parent":"5815cf157d98f97b1382f0c7",
}

//评论shot＋ 回复其他用户
{
	"content":"道歉时露出胸部是常识ww",
	"parent":"5815cf157d98f97b1382f0c7",
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
