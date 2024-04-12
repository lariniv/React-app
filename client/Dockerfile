FROM node:20-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

ENV DATABASE_URL="postgresql://postgres:10024110Afg@localhost:5432/tododb?schema=public"

RUN npm run build

EXPOSE 8080

CMD [ "npm", "run", "preview" ]