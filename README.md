# Dev Instructions

`Create .env file and add this on that file`

EMAIL_ADDRESS   = "gmail@gmail.com"
EMAIL_PASSWORD  = "password"
PORT            = 3000
JWT_SECRET      = "anythihngyouwant"
EXPIRE_IN_MINUTE = 60
MONGO_DB        = "ecommerceApp"
MONGO_HOST      = localhost
MONGO_PORT      = 27017
`npm install`

## To start server
`npm run start`

## To start server with hot reload 
`npm run debug`

***

### Note: 

* When using Postman for POST Apis, if `req.body` is empty, check that you are passing body with type **X-www-form-urlencoded**
