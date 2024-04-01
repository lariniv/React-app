### Requirements
- Node.js (recommended version 16.x)
- PostgreSQL (latest version)
- Yarn or npm (latest version)

A step-by-step series of examples that tell you how to get a development environment running.

## Backend Setup

### Naviagte to server directory
```bash
cd server
```
### Install dependanciies
```bash
yarn install
```
or
```bash
npm install
```
### Initialize prisma
```bash
npx prisma migrate dev
```

### Configure dotnev
```env
DATABASE_URL="postgresql://postgres:10024110Afg@localhost:5432/tododb?schema=public"
```


### Start the server
```bash
yarn start:dev
```

or
```bash
npm run start:dev
```

## Frontend Setup
### Navigate to client directory
```bash
cd client
```

### Install dependacies
```bash
yarn install
```

or

```bash
npm install
```
### Configure dotenv
```env
VITE_API_URL=http://localhost:3000
```

### Start the server
```bash
yarn dev
```

or

```bash
npm run dev
```
