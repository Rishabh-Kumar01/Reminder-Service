# Welcome to Reminder Service

## GitHub repository links for the other services in this microservice architecture and API Gateway:

- Airline API Gateway -
  [Github Repository Link](https://github.com/Rishabh-Kumar01/Airline-API-Gateway)
- Auth Service -
  [GitHub Repository Link](https://github.com/Rishabh-Kumar01/Auth-Service)
- Flight and Search Service -
  [GitHub Repository Link](https://github.com/Rishabh-Kumar01/FlightsAndSerachService)
- Booking Service -
  [GitHub Repository Link](https://github.com/Rishabh-Kumar01/BookingService)

## Project Setup

- Clone the project on your local
- Execute `npm install` on the same path as of your root directory of the
  downlaoded project
- Create a `.env` file in the root directory and add the following environment
  variable
  - `PORT=3000`
- Inside the `src/config` folder create a new file `config.json` and then add
  the following piece of json

```
{
  "development": {
    "username": "YOUR_DB_LOGIN_NAME",
    "password": "YOUR_DB_PASSWORD",
    "database": "REMINDER_DB_DEV",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```

- Once you've added your db config as listed above, go to the src folder from
  you terminal and execute `npx sequelize db:create`

- Then execute `npx sequelize db:migrate`.
