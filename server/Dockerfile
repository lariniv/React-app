FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV DATABASE_URL=postgresql://postgres:admin@postgres:5432/tododb?schema=public

RUN npm run docker:build

CMD [ "npm", "run", "start:dev" ]