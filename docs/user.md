## 用户

## 更新用户信息

PUT `/user/profiles`

`!token`

|参数|类型|必需|描述|
|---|---|---|---|
|avatar|string||头像|
|gender|string||性别|
|birthday|Date||生日|
|website|string||个人网站|
|signature|string||签名|


返回字段: `{ user: userSchema }`
