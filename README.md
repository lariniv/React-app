### Requirements
- Node.js (recommended version 16.x)
- PostgreSQL (latest version)
- Yarn or npm (latest version)

A step-by-step series of examples that tell you how to get a development environment running.

## Backend Setup

#### Naviagte to server directory
```bash
cd server
```
#### Install dependanciies
```bash
yarn install
```
or
```bash
npm install
```

#### Configure dotnev
```env
DATABASE_URL="postgresql://<USER>:<PASSWORD>@<HOST>:<PORT>/<DATABASE>"
```
##### `<USER>` - Name of your database user, e.g. `janedoe`
##### `<PASSWORD>` - Password for your database user
##### `<HOST>` - IP address/domain of your database server, e.g. `localhost`
##### `<PORT>` - 	Port on which your database server is running, e.g. `5432`
##### `<DATABASE>` - 	Name of the database you want to use, e.g. `mydb`


#### Initialize prisma
```bash
npx prisma migrate dev
```

#### Start the server
```bash
yarn start:dev
```

or
```bash
npm run start:dev
```

## Frontend Setup

### To run an application with Docker

```bash
docker-compose up --build
```

### To run an applcation localy

###$ Navigate to client directory
```bash
cd client
```

###$ Install dependacies
```bash
yarn install
```

or

```bash
npm install
```
###$ Configure dotenv
```env
VITE_API_URL=http://localhost:3000
```

###$ Start the server
```bash
yarn dev
```

or

```bash
npm run dev
```

## Deployed website - https://react-app-ochre-six.vercel.app/

Note: Backend is hosted on Render, so it might bot load first time you opne it. If so send fetch to this endpoint - https://react-app-y040.onrender.com/health
