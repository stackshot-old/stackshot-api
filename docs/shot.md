# 截图

## 添加截图

POST `/shot`

|参数|类型|必需|描述|
|---|---|---|---|
|type|string|✅|shot类型|
|images|array|✅|图片地址|
|tags|array||标签|

参数示例:

```js
{
  type: 'image',
  images: [
    {id: 'xafnowfubsbfdsuf', width: 1000, height: 600}
  ],
  tags: ['腐女']
}
```

## 添加评论

POST `/shot`

|参数|类型|必需|描述|
|---|---|---|---|
|type|string|✅|shot类型|
|parent|string|✅|它的上层|
|content|string||内容|
|replyTo|string||回复|

参数示例:

```js
{
	"type":"comment",
	"content":"道歉时露出胸部是常识ww",
	"parent":"5815cf157d98f97b1382f0c7", //回复image
	"replyTo": "580c03f04678d217cf6825ce" //回复 comment
}
```
