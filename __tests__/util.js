export const genUniqueString = (salt) => `${salt}${Math.random().toString(36).substr(2, 10)}`

export const genRandomOfDatas = (datas) => datas[Math.floor(Math.random() * datas.length)]
