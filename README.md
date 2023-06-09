# sprintug

## author @muhamad Rashid Mugaba.

### How To set up the server

1. cd into server director
2. create a .env file
3. add the following configs
4. PORT=5000
5. DB_URI="mongodb://localhost:27017/YOUR-WORKING-DATABASE" `This the database url `
6. DB_URI_TEST="mongodb://localhost:27017/YOUR-TEST-DATABASE" `This the test database url `
7. SECRET='YOUR-SECRET-KEY' `This is the secret`
8. run yarn or npm install
9. run yarn start or npm run start to start the development server
10. run yarn test or npm run test to run the test suits

### How To set up the client

1. cd into client directory
2. run yarn or npm install
3. run yarn start or npm run start to start the development server.

### Note

1. it's best to have node version 14.25 and above
2. if you find a problem install server or client packages using yarn, Try running yarn --ignore-engines
