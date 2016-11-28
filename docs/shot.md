# 截图

## 添加截图

POST `/shot`

`!token`

|参数|类型|必需|描述|
|---|---|---|---|
|images|array|✅|图片地址|
|tags|array||标签|

参数示例:

```js
{
  images: [
    {id: 'xafnowfubsbfdsuf', width: 1000, height: 600}
  ],
  tags: ['腐女']
}
```

返回字段: { ...shotSchema }


## 获取截图列表

GET `/shots`

`?token`

|参数|类型|必需|描述|
|---|---|---|---|
|before|Date||before之前的shot|
|after|Date||after之后的shot|
|limit|number||个数|

带token判断的字段:
```js
  liked
```

返回字段:
```js
[
  {
    "liked": false,
    "_id": "582c67b1c2f72563e223c5cc",
    "createdAt": "2016-11-16T14:05:37.589Z",
    "updatedAt": "2016-11-16T14:05:37.589Z",
    "user": {
      "_id": "580c03f04678d217cf6825ce",
      "username": "vai",
      "avatar": "https://cdn.v2ex.co/gravatar/b7ff13628a62b907c243ba797d190fbe"
    },
    "__v": 0,
    "likedUser": [],
    "tags": [],
    "images": [
      {
        "url": "ofp6nl66s.qnssl.com/media/upload_images/vIeZNuuQCc.jpeg",
        "width": 101,
        "height": 57
      }
    ],
    "likesCount": 0,
    "commentsCount": 0,
    "content": "zcsc"
  },
]
```
