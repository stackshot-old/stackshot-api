# 截图

## 添加截图

POST `/shot`

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
