# Stackshot API

```bash
$ npm install

$ npm run dev
```

## Before getting started

### Generating RSA keys

```bash
$ openssl genrsa -out development.rsa 1024
$ openssl rsa -in development.rsa -pubout > development.rsa.pub
```

### Set environment variables

```bash
$ cp .env-example .env
# update content
```

### Start mongodb

```bash
$ sudo mongod
```
