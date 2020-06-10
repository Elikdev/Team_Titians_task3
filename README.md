## About

HNG task-3 : A dockerized microservice for sending sms notification and checking sms balance

## Authors

- Odutoye Elijah Kolade <koladeodutoye9913@gmail.com>
- Jimoh Rildwan Adekunle <jemohkunle2007@gmail.com>

## Common setup

Clone the repo and install the dependencies.

```bash
git clone https://github.com/Elikdev/Team_Titians_task3.git
cd trs
```

```bash
npm install
```

To run locally:

Step 1: Set your .env variables

```
ACCOUNT_SID=twillioaccountsid
AUTH_TOKEN=twilioaccountauthtoken
TWILIO_NUMBER=twilionumber
MONGOURI=databaseurl
```

Step 2: Run the script

```bash
npm run devStart
```

## Use Docker

To run this app as a docker container, you must have docker installed on your computer:

Step 1: Clone the repo

```bash
git clone https://github.com/Elikdev/Team_Titians_task3.git
```

Step 2: Set your enviroment variables

```
ACCOUNT_SID=twillioaccountsid
AUTH_TOKEN=twilioaccountauthtoken
TWILIO_NUMBER=twilionumber
MONGOURI=mongodb://mongo:27017/smsapp
```

Step 3: Run the Docker container locally:

```bash
docker-compose up
```
